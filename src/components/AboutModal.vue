<template>
  <!-- About Modal -->
  <b-modal
    v-model="modalShow"
    title-class="about-title"
    body-class=""
    content-class="text-center bg-dark text-light my-modal"
    id="modal-xl"
    size="xl"
    title="About"
  >
    FireVue es una aplicacion web de chat en tiempo real desarrollada con Vue.js
    y Firebase.
    <br />
    Luego de iniciar sesion con tu cuenta de Google podes comenzar a chatear.
    <br />
    El sitio no recolecta informacion personal de tu cuenta de Google, <br />
    solo muestra tu nombre, tu imagen de perfil de Google y la ultima vez que te
    conectaste a FireVue.
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
        @click="modalShow = false"
      >
        Cerrar
      </b-button>
    </template>
  </b-modal>
  <!-- End Modal -->
</template>

<script>
export default {
  data() {
    return {
      modalShow: this.modalShow,
    };
  },
  props: ["modalShow"],
};
</script>

<style>
.about-title {
  font-size: 23px;
}
</style>
