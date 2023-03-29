import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { VuePlugin, config } from 'vuera';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

//Components
import Mainframe from './views/Mainframe.vue';
import router from './views/router.js';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VuePlugin);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

//Application store object, enable memorizing and accessing of all relevant values across the application.
//Replaces a lot of data and prop component iterations. (Vuex-Store/Data-Repository)
const store = new Vuex.Store({
    state: {
        settings: {
            renderBackground: true,
            enablePrecalculations : true,
            enableRuleIdentifier : true,
            enableRules : false,
            multiSelectionMode: false
        },
        viewer: {
            currentZoom : 1.0,
            minZoom : 0.2,
            maxZoom : 4.0
        },
        modelCheck: {
            elements: [], //Containes Nodes and Edeges from the precalculations
            subChecks: [], //Containes ModelSubChecks and Rules and RuleSets
            resultSets: [] //Containes ResultSets
        },
        selectedElements: [],
        currentfile : "",
        version: 0.1,
        lastModified: "2022-06-02"
    }
});

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
