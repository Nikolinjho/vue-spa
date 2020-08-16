import "@/style/style.css";

// Import Vue
import Vue from 'vue';
// import router from 'vue-router';
import { store } from "@/store/store"
// Import Vue App, routes, store
import App from './App';
import { router } from "./router";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage'
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);
window.eventBus = new Vue();

Vue.config.productionTip = false;
// Vue.config.devtools = false;





new Vue({
    el: '#app',
    store: store,
    router: router,
    render: h => h(App),
    created() {
        const firebaseConfig = {
            apiKey: "AIzaSyCn-Y6VqCD8z3kehXPrD8RcupL-7jAXhxs",
            authDomain: "vue-spa-bf6fb.firebaseapp.com",
            databaseURL: "https://vue-spa-bf6fb.firebaseio.com",
            projectId: "vue-spa-bf6fb",
            storageBucket: "vue-spa-bf6fb.appspot.com",
            messagingSenderId: "296052528130",
            appId: "1:296052528130:web:dfe94c33292fe25c43c31b"
        };

        firebase.initializeApp(firebaseConfig)
        firebase.auth().onAuthStateChanged( user => {
            if (user){
                this.$store.dispatch('loggedUser', user)
            }
        })
    }
});
