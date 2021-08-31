<template>
  <div id="app">
    <Navbar :user="user" />
    <Chat v-bind:user="user" v-if="user" />
    <Login v-else />
    <Footer />
  </div>
</template>

<script>
import Chat from "@/views/Chat.vue";
import Login from "@/views/Login.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import firebase from "firebase";

export default {
  name: "App",
  data() {
    return {
      user: firebase.auth().currentUser,
    };
  },
  components: {
    Chat,
    Login,
    Navbar,
    Footer,
  },
  mounted() {
    document.title = "FireVue";
  },
};
</script>


<style>
body {
  background-color: #151515 !important;
  /* background-color: #ffffff !important; */
  /* background-color: #42b883; */
  /* background-color:rgb(9, 218, 124); */
}
</style>
