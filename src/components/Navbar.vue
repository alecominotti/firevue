<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark mb-4">
    <!-- About Modal -->
    <b-modal
      v-model="modalShow"
      content-class="text-center bg-dark text-light my-modal"
      id="modal-xl"
      size="xl"
      title="About"
    >
      FireVue es una aplicacion web de chat en tiempo real desarrollada con
      Vue.js y Firebase. <br />
      Visita el
      <a target="_blank" href="https://github.com/alecominotti/firevue"
        >repositorio de Github.</a
      >
      <br />
      <div class="row mt-5">
        <div class="col-3"></div>
        <div class="col-3">
          <a href="https://vuejs.org/" target="_blank"
            ><img width="130" src="@/assets/vue-logo.svg" alt="Vue.js"
          /></a>
        </div>
        <div class="col-3">
          <a href="https://firebase.google.com/" target="_blank"
            ><img width="130" src="@/assets/firebase-logo.svg" alt="Firebase"
          /></a>
        </div>
        <div class="col-3"></div>
      </div>
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
    <!-- End Modal -->
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
      displayName: this.returnDisplayName(),
    };
  },
  props: ["user", "modalShow"],
  methods: {
    logout() {
      if (window.confirm("Cerrar sesion?")) {
        firebase.auth().signOut();
      }
    },
    returnDisplayName() {
      if (this.user) {
        return this.user.displayName;
      } else {
        return "";
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
