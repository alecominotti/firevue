<template>
  <div class="login-container">
    <button @click="loginSubmit">Login with Google</button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      db: firebase.firestore(),
    };
  },
  methods: {
    loginSubmit() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        //firebase.auth().signInWithRedirect(provider)
        .then((result) => {
          var user = result.user;
          this.updateUserStatus(user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateUserStatus(user) {
      this.db
        .collection("user_status")
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
              doc.ref
                .update({
                  latestDate: Date.now(),
                })
                .then(() => {
                  console.log(
                    "Bienvenidx de vuelta " + user.displayName + " :)"
                  );
                });
            });
          }
        })
        .catch((error) => {
          console.log("Error obteniendo el documento: ", error);
        });
    },
  },
};
</script>

<style lang="scss">
.login-container {
  width: 100%;
  text-align: center;
  padding-top: 50px;
  button {
    width: 50%;
    background-color: #4e37fc;
    color: white;
    font-weight: bold;
    font-size: 18pt;
    padding: 20px;
    border-radius: 15px;
    border: none;
    box-shadow: #00000040 0px 5px 10px;
    cursor: pointer;
    &:hover {
      background-color: #7562ff;
    }
  }
}
</style>