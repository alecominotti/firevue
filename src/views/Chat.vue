<template>
  <div class="container mt-3 bg-dark">
    <script
      src="https://kit.fontawesome.com/1f3d379ce9.js"
      crossorigin="anonymous"
      type="application/javascript"
    ></script>
    <script
      src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"
      type="application/javascript"
    ></script>
    <script src="linkify.min.js" type="application/javascript"></script>
    <script src="linkify-jquery.min.js" type="application/javascript"></script>

    <div class="panel messages-panel bg-dark text-light">
      <div class="contacts-list bg-dark text-light">
        <div class="tab-content">
          <div
            id="inbox"
            class="contacts-outter-wrapper tab-pane active bg-dark text-light"
          >
            <div class="m-3">
              <input
                v-model="searchText"
                type="text"
                class="form-control bg-dark text-light mb-3"
                name="search"
                id="search"
                placeholder="Buscar usuarios..."
              />
            </div>
            <div class="contacts-outter">
              <div :hidden="usersLoaded" class="fa-3x text-center loading-icon">
                <i class="fas fa-circle-notch fa-spin"></i>
              </div>
              <ul class="list-unstyled contacts">
                <li
                  :class="[
                    timeDifference(user.latestDate) == 'Online'
                      ? 'small-status-online-bg'
                      : '',
                  ]"
                  v-for="(user, index) in filteredUsers"
                  v-bind:key="index"
                  data-toggle="tab"
                  data-target="#inbox-message-2"
                >
                  <img
                    class="img-circle medium-image"
                    :src="user.photoURL"
                    :alt="user.displayName"
                  />

                  <div class="vcentered info-combo">
                    <h3 class="no-margin-bottom name">
                      {{ user.displayName }}
                    </h3>
                    <h6
                      class="small-status"
                      :class="[
                        timeDifference(user.latestDate) == 'Online'
                          ? 'small-status-online'
                          : 'small-status-offline',
                        'errorClass',
                      ]"
                    >
                      {{ timeDifference(user.latestDate) }}
                    </h6>
                  </div>
                  <template v-if="timeDifference(user.latestDate) == 'Online'">
                    <div class="contacts-add">
                      <i class="fas fa-circle small-status-online"></i>
                    </div>
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane message-body active" id="inbox-message-1">
          <div class="message-chat bg-dark text-light">
            <div class="chat-body bg-dark text-light">
              <div
                :hidden="messagesLoaded"
                class="fa-3x text-center loading-icon"
              >
                <i class="fas fa-circle-notch fa-spin"></i>
              </div>
              <div
                v-for="(msg, index) in messages"
                v-bind:key="index"
                :class="[
                  sentOrReceived(msg.userUID) ? 'my-message' : 'info',
                  'message',
                ]"
              >
                <img
                  class="img-circle medium-image"
                  :src="msg.photoURL"
                  :alt="msg.displayName"
                />
                <div
                  :class="[
                    sentOrReceived(msg.userUID) ? 'bg-dark' : 'bg-received',
                    'message-body text-light',
                  ]"
                >
                  <div class="message-info">
                    <h4>{{ msg.displayName }}</h4>
                    <h5>
                      <i class="far fa-clock"></i>{{ msg.createdAt | moment }}
                    </h5>
                  </div>
                  <hr />
                  <div
                    v-html="linkify(msg.text, { target: { url: '_blank' } })"
                    class="message-text"
                  ></div>
                </div>
                <br />
              </div>
              <div ref="scrollable"></div>
            </div>

            <div class="chat-footer">
              <form v-on:submit.prevent="sendMessage">
                <input
                  v-model="message"
                  placeholder="Escribe algo..."
                  class="send-message-text bg-dark text-light"
                />
                <button
                  @click.prevent="sendMessage"
                  type="submit"
                  class="send-message-button btn-info"
                >
                  <i class="fa fa-send text-light"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="container border bg-dark h-100">
    <h1 class="text-light">CHAT VIEW</h1>

    <section>
      <main>
        <div
          v-for="(msg, index) in messages"
          v-bind:key="index"
          :class="['message', sentOrReceived(msg.userUID)]"
        >
          <img class="profile-pic" :src="msg.photoURL" :alt="msg.displayName" />
          <p>{{ msg.text }}</p>
        </div>
        <div ref="scrollable"></div>
      </main>

      <form v-on:submit.prevent="sendMessage">
        <input
          v-model="message"
          type="text"
          placeholder="Escribe un mensaje..."
        />
        <button :disabled="!message" type="submit">Enviar</button>
      </form>
    </section>
  </div> -->
</template>

<script>
import style from "@/assets/css/style.scss";
import firebase from "firebase";
import moment from "moment";
import Login from "@/views/Login.vue";
import linkify from "linkifyjs/lib/linkify-string";

export default {
  data() {
    return {
      message: "",
      messages: [],
      db: firebase.firestore(),
      latestUsers: [],
      filteredUsers: [],
      searchText: "",
      messagesLoaded: false,
      usersLoaded: false,
    };
  },

  props: ["user"],
  methods: {
    async sendMessage() {
      if (this.message != "") {
        const messageData = {
          userUID: this.user.uid,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
          text: this.message,
          createdAt: Date.now(),
        };
        this.message = "";
        await this.db.collection("messages").add(messageData);
      }
    },
    sentOrReceived(userUID) {
      return userUID === this.user.uid;
    },
    scrollDown() {
      this.$refs["scrollable"].scrollIntoView({ behavior: "smooth" });
    },
    timeDifference(time) {
      var current = Date.now();
      var msOnline = 30 * 1000;
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;
      var elapsed = current - time;

      var timeElapsed;
      var word;

      if (elapsed < msOnline) {
        return "Online";
      } else if (elapsed < msPerMinute) {
        return "Hace 30 segundos";
      } else if (elapsed < msPerHour) {
        timeElapsed = Math.round(elapsed / msPerMinute);
        word = timeElapsed < 2 ? " minuto" : " minutos";
        return "Hace " + timeElapsed + word;
      } else if (elapsed < msPerDay) {
        timeElapsed = Math.round(elapsed / msPerHour);
        word = timeElapsed < 2 ? " hora" : " horas";
        return "Hace " + timeElapsed + word;
      } else if (elapsed < msPerMonth) {
        timeElapsed = Math.round(elapsed / msPerDay);
        word = timeElapsed < 2 ? " dia" : " dias";
        return "Hace " + timeElapsed + word;
      } else if (elapsed < msPerYear) {
        timeElapsed = Math.round(elapsed / msPerMonth);
        word = timeElapsed < 2 ? " mes" : " meses";
        return "Hace " + timeElapsed + word;
      } else {
        timeElapsed = Math.round(elapsed / msPerYear);
        word = timeElapsed < 2 ? " año" : " años";
        return "Hace " + timeElapsed + word;
      }
    },
    aYearAgo() {
      var epochYear = 31536000000; // year in ms
      var ago = Date.now()- epochYear;
      //console.log(31536000 * 1000)
      return ago;
    },
    async updateUserStatus(user, db) {
      return Login.methods.updateUserStatus(user, db);
    },
    filterUsers() {
      if (this.searchText === "") {
        this.filteredUsers = this.latestUsers;
      } else {
        this.filteredUsers = this.latestUsers.filter((data) =>
          data.displayName.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
    },
    linkify,
  },

  mounted() {
    this.db
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((querySnap) => {
        this.messages = querySnap.docs.map((doc) => doc.data());
        setTimeout(() => {
          this.scrollDown();
          this.messagesLoaded = true;
        }, 10);
      });

    this.db
      .collection("user_status")
      .where("latestDate", ">=", this.aYearAgo())
      .orderBy("latestDate", "desc")
      .limit(300)
      .onSnapshot((querySnap) => {
        this.latestUsers = querySnap.docs.map((doc) => doc.data());
        //this.filteredUsers = this.latestUsers;
        this.filterUsers()
        this.usersLoaded = true;
      });

    this.updateUserStatus(this.user, this.db);

    var intervalId;

    window.onfocus = () => {
      intervalId = window.setInterval(() => {
        this.updateUserStatus(this.user, this.db);
      }, 2500);
    };

    window.onblur = () => {
      clearInterval(intervalId);
    };

    document.getElementById("search").addEventListener("keyup", () => {
      // Live user search
      this.filterUsers();
    });
  },
  filters: {
    moment: function (date) {
      return moment(date).format("DD/MM/YYYY - H:mm");
    },
  },
};
</script>
