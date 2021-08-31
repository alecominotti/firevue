<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark mb-4">
    <!-- <b-modal
      title="About"
      v-model="modalShow"
      content-class="bg-dark text-light"
    >
      Hello From Modal!
    </b-modal> -->

    <b-modal
      v-model="modalShow"
      content-class="text-center bg-dark text-light my-modal"
      id="modal-xl"
      size="xl"
      title="About"
    >
      Firevue es una aplicacion web de chat en tiempo real desarrollada con Vue.js y Firebase. <br> Visita el repositorio de Github.
      <template #modal-footer>
        <b-button
          variant="primary"
          size="md"
          class="float-right"
          @click="modalShow = false"
        >
          Cerrar
        </b-button>
      </template>
    </b-modal>

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
            <a @click="modalShow = !modalShow" class="nav-link about">About</a>
            <div></div>
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
      modalShow: false,
      displayName: this.user.displayName,
    };
  },
  props: ["user", "modalShow"],
  methods: {
    logout() {
      if (window.confirm("Cerrar sesion?")) {
        firebase.auth().signOut();
      }
    },
  },
};
</script>

<style>
.my-modal {
font-size: 20px !important;


}
</style>
