<template>
  <div class="login-container">
    <Hero v-bind:loginSubmit="loginSubmit" />
  </div>
</template>

<script>
import firebase from "firebase";
import Hero from "@/components/Hero.vue";

export default {
  data() {
    return {
      db: firebase.firestore(),
    };
  },
  components: {
    Hero,
  },
  methods: {
    loginSubmit() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        //.signInWithRedirect(provider)
        .then((result) => {
          var user = result.user;
          this.updateUserStatus(user, this.db);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateUserStatus(user, db) {
      if (firebase.auth().currentUser) {
        db.collection("user_status")
          .where("userID", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              const userStatus = {
                userID: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                latestDate: Date.now(),
              };
              this.db.collection("user_status").add(userStatus);
            } else {
              querySnapshot.forEach((doc) => {
                doc.ref.update({
                  latestDate: Date.now(),
                });
              });
            }
          })
          .catch((error) => {
            console.log("Error obteniendo el documento: ", error);
          });
      }
    },
  },
  mounted() {
    if (firebase.auth().currentUser) {
      this.$router.push("/");
    }
  },
};
</script>