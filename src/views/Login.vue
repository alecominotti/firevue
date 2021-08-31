<template>
  <div class="login-container">
    <Hero v-bind:loginSubmit="loginSubmit" />
    <!-- <button @click="loginSubmit">Login with Google</button> -->
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

<style lang="scss">
// .login-container {
//   width: 100%;
//   text-align: center;
//   padding-top: 50px;
//   button {
//     width: 50%;
//     background-color: #4e37fc;
//     color: white;
//     font-weight: bold;
//     font-size: 18pt;
//     padding: 20px;
//     border-radius: 15px;
//     border: none;
//     box-shadow: #00000040 0px 5px 10px;
//     cursor: pointer;
//     &:hover {
//       background-color: #7562ff;
//     }
//   }
// }
</style>