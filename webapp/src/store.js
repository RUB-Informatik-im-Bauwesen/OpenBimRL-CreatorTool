import Vue from 'vue';
import Vuex from 'vuex';

/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

Vue.use(Vuex);

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
            elements: new Map(), //Containes Nodes and Edeges from the precalculations
            subChecks: [], //Containes ModelSubChecks and Rules and RuleSets
            resultSets: [] //Containes ResultSets
        },
        selectedElements: [],
        currentfile : "",
        version: 0.1,
        lastModified: "2022-06-02"
    }
});

export default store;