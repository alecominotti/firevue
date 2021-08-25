import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAURYNootuClP2BvR-TcGnmBzU5M2QyGd4",
  authDomain: "firevue-group-chat.firebaseapp.com",
  projectId: "firevue-group-chat",
  storageBucket: "firevue-group-chat.appspot.com",
  messagingSenderId: "1059243269702",
  appId: "1:1059243269702:web:7fc008d00dfadc09a6b447",
  measurementId: "G-2HCJQSK4PQ"
};

firebase.initializeApp(firebaseConfig)

Vue.use(BootstrapVue)

firebase.auth().onAuthStateChanged(()=> new Vue({
  router,
  render: h => h(App)
}).$mount('#app'))
