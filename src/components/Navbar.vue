<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark mb-4">
    <AboutModal :modalShow="modalShow" />

    <!-- Logout Modal -->
    <b-modal v-model="logoutModalShow" content-class="bg-dark text-light">
      <template #modal-title>Cerrar sesion?</template>
      <template #modal-footer>
        <b-button
          variant="outline-secondary"
          size="md"
          @click="logoutModalShow = false"
        >
          Cancelar
        </b-button>
        <b-button variant="outline-danger" size="md" @click="logout">
          Cerrar sesion
        </b-button>
      </template>
    </b-modal>
    <!-- End Logout Modal -->

    <div class="container-fluid">
      <a class="navbar-brand" href="/">
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
        <ul class="navbar-nav me-auto">
          <li class="nav-item active">
            <a @click="modalShow = !modalShow" class="nav-link about">About</a>
            <div></div>
          </li>
        </ul>

        <a class="nav-link disabled text-light">{{ this.displayName }}</a>

        <button
          v-if="user"
          class="btn btn-outline-secondary"
          @click="(logoutModalShow = !logoutModalShow) && (modalShow = false)"
        >
          Cerrar sesion
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
import AboutModal from "@/components/AboutModal.vue";

export default {
  data() {
    return {
      modalShow: false,
      logoutModalShow: false,
      displayName: this.returnDisplayName(),
    };
  },
  props: ["user"],
  methods: {
    logout() {
      this.logoutModalShow = false;
      firebase.auth().signOut();
    },
    returnDisplayName() {
      if (this.user) {
        return this.user.displayName;
      } else {
        return "";
      }
    },
  },
  components: {
    AboutModal,
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
