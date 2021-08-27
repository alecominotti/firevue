<template>
  <div class="container mt-3 bg-dark">
    <link
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <div class="panel messages-panel bg-dark text-light">
      <div class="contacts-list bg-dark text-light">
        <div class="tab-content">
          <div
            id="inbox"
            class="contacts-outter-wrapper tab-pane active bg-dark text-light"
          >
            <form
              class="
                panel-search-form
                info
                form-group
                has-feedback
                no-margin-bottom
              "
            >
              <input
                type="text"
                class="form-control bg-dark text-light mb-3"
                name="search"
                placeholder="Search"
              />
            </form>
            <div class="contacts-outter">
              <ul class="list-unstyled contacts">
                <li
                  v-for="(user, index) in latestUsers"
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
                    <h6 class="p-0 m-0 small-date">
                      {{ timeDifference(user.latestDate) }}
                    </h6>
                  </div>
                  <div class="contacts-add">
                    <i class="text-success fa fa-check-circle"></i>
                  </div>
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
                    sentOrReceived(msg.userUID) ? 'bg-dark' : 'bg-primary',
                    'message-body text-light',
                  ]"
                >
                  <div class="message-info">
                    <h4>{{ msg.displayName }}</h4>
                    <h5>
                      <i class="fa fa-clock-o"></i>{{ msg.createdAt | moment }}
                    </h5>
                  </div>
                  <hr />
                  <div class="message-text">{{ msg.text }}</div>
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

export default {
  data() {
    return {
      message: "",
      messages: [],
      db: firebase.firestore(),
      latestUsers: [],
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
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - time;

      if (elapsed < msPerMinute) {
        return "Online";
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " minutes ago";
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " hours ago";
      } else if (elapsed < msPerMonth) {
        return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
      } else if (elapsed < msPerYear) {
        return (
          "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
        );
      } else {
        return (
          "approximately " + Math.round(elapsed / msPerYear) + " years ago"
        );
      }
    },
  },
  mounted() {
    this.db
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((querySnap) => {
        this.messages = querySnap.docs.map((doc) => doc.data());
        setTimeout(() => {
          this.scrollDown();
        }, 10);
      });

    this.db
      .collection("user_status")
      .orderBy("latestDate", "desc")
      .onSnapshot((querySnap) => {
        this.latestUsers = querySnap.docs.map((doc) => doc.data());
      });

    var intervalId;

    window.onfocus = function () {
      intervalId = window.setInterval(function () {
        //En linea
      }, 1000);
    };

    window.onblur = function () {
      clearInterval(intervalId);
      // Ya no en linea
    };
  },
  filters: {
    moment: function (date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
  },
};
</script>
