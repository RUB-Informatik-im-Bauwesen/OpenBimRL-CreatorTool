import Vue from 'vue';
import VueRouter from 'vue-router';
import { VuePlugin, config } from 'vuera';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from "./store.js";

/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

//Components
import Mainframe from './views/Mainframe.vue';
import router from './views/router.js';

Vue.use(VueRouter);
Vue.use(VuePlugin);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

//Vue main instance, usind Vuex-Store/Data-Repository
var vm = new Vue({
    el: '#app',
    router: router,
    store: store,

    data: {
        title: "OpenBIMRL Creator"
    },

    components: {
        Mainframe
    }
});
