<template>
  <div class="container my-5">
    <div
      class="
        row
        p-4
        pb-0
        pe-lg-0
        pt-lg-5
        align-items-center
        rounded-3
        shadow-lg
        text-light
      "
    >
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 class="display-4 fw-bold lh-1">
          <span class="text-firebase">Fire</span
          ><span class="text-vue">Vue</span> Group Chat
        </h1>
        <p class="lead mt-3">
          Inicia sesion con tu cuenta de Google y empeza a chatear!<br /><span
            style="font-size: 18px"
            >No recolectamos informacion de tu cuenta :)</span
          >
        </p>
        <div
          class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3"
        >
          <button
            @click="loginSubmit"
            type="button"
            class="
              loginbutton
              btn btn-outline-info btn-lg
              mt-2
              px-4
              me-md-2
              fw-bold
            "
          >
            Login con Google
          </button>
        </div>
      </div>
      <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg rounded-3">
        <img
          class="rounded-lg-3"
          src="https://images.macrumors.com/t/d2ykMDvdmJIBKTETOi8MbK0RbS0=/1600x900/smart/article-new/2020/02/whatsapp-dark-mode-beta.jpg"
          alt=""
          width="720"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["loginSubmit"],
};
</script>