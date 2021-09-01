<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img
          src="@/assets/firevue-logo.png"
          alt="Logo"
          width="40"
          height="35"
          class="d-inline-block align-text-middle"
        />
        FireVue
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
          <li class="nav-item active">
            <a @click="modalShow = !modalShow" class="nav-link about">About</a>
            <div></div>
          </li>
        </ul>
        <template v-if="user">
          <img
            v-b-tooltip.hover
            :title="loggedTooltip"
            v-b-tooltip.noninteractive
            class="img-circle medium-image m-0"
            :src="user.photoURL"
            :alt="user.displayName"
          />
          <p
            v-b-tooltip.hover
            :title="loggedTooltip"
            v-b-tooltip.noninteractive
            class="m-0 user-select-none nav-link text-light"
          >
            {{ user.displayName }}
          </p>

          <button
            class="btn btn-outline-secondary"
            @click="(logoutModalShow = !logoutModalShow) && (modalShow = false)"
          >
            Cerrar sesión
          </button>
        </template>
      </div>
    </div>
    <!-- About modal -->
    <b-modal
      v-model="modalShow"
      title-class="about-title"
      content-class="text-center bg-dark text-light my-modal"
      id="modal-xl"
      size="xl"
      title="About"
    >
      FireVue es una aplicación web de chat en tiempo real desarrollada con
      Vue.js y Firebase.
      <br />
      Luego de iniciar sesión con tu cuenta de Google podés comenzar a chatear.
      <br />
      El sitio no recolecta información personal de tu cuenta de Google, <br />
      solo muestra tu nombre, tu imagen de perfil de Google y la última vez que
      te conectaste a FireVue.
      <br />
      <br />
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
            ><img width="85" src="@/assets/firebase-logo.svg" alt="Firebase"
          /></a>
        </div>
        <div class="col-3"></div>
      </div>
      <template #modal-footer>
        <b-button
          variant="primary"
          size="md"
          class="float-right"
          @click="modalShow = !modalShow"
        >
          Cerrar
        </b-button>
      </template>
    </b-modal>
    <!-- End about modal -->

    <!-- Logout Modal -->
    <b-modal v-model="logoutModalShow" content-class="bg-dark text-light">
      <template #modal-title>Cerrar sesión?</template>
      <template #modal-footer>
        <b-button
          variant="outline-secondary"
          size="md"
          @click="logoutModalShow = false"
        >
          Cancelar
        </b-button>
        <b-button variant="outline-danger" size="md" @click="logout">
          Cerrar sesión
        </b-button>
      </template>
    </b-modal>
    <!-- End Logout Modal -->
  </nav>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      modalShow: false,
      logoutModalShow: false,
      user: this.user,
      loggedTooltip: "Estas logueadx como " + this.user.displayName,
    };
  },
  props: ["user", "modalShow"],
  methods: {
    logout() {
      this.logoutModalShow = false;
      firebase.auth().signOut();
    },
  },
};
</script>

<style>
.my-modal {
  font-size: 18px !important;
}

.modal-footer {
  border-top: 0 none !important;
}

.close {
  display: none;
}
</style>
