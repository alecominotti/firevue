<template>
  <div id="app">
    <div id="mx-auto text-center">
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </div>

    <Navbar v-bind:user="user"/>
    
    <Chat v-bind:user="user" v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
  import Chat from "@/components/Chat.vue";
  import Login from "@/components/Login.vue";
  import Navbar from "@/components/Navbar.vue";
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
      Navbar
    },
    methods: {
      
    },
  };
</script>


<style>
body {
  background-color: #151515 !important;
  /* background-color: #42b883; */
  /* background-color:rgb(9, 218, 124); */
}
</style>

</style>
