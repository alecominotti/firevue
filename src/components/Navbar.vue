<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png"
          alt="Logo"
          width="40"
          height="40"
          class="d-inline-block align-text-middle"
        />
        FireVue
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active">
            <a class="nav-link about">About</a>
          </li>
        </ul>

        <a class="nav-link disabled text-light">{{ this.displayName }}</a>

        <button v-if="user" class="btn btn-outline-secondary" @click="logout">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      displayName: this.user.displayName,
    };
  },
  props: ["user"],
  methods: {
    logout() {
      if (window.confirm("Cerrar sesion?")) {
        firebase.auth().signOut();
      }
      
    },
  },
};
</script>
