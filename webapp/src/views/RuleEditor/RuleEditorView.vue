<template>
    <div>
        <div id="ruleEditor">
            <reactflowTopMenu class="ptree" 
                @callNotify="callNotify">
            </reactflowTopMenu>
            <reactflowviewer class="viewer" 
                ref="graphViewer"
                :currentfile="$store.state.currentfile"
            ></reactflowviewer>
            <modelCheckView></modelCheckView>
        </div>
    </div>
</template>

<script>

/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

import Reactflowviewer from './viewer/Reactflowviewer.vue';
import ReactflowTopMenu from './ReactflowTopMenu.vue';
import ModelCheckView from './RuleSetMenu/ModelCheckView.vue';

export default {
    name: "RuleEditorView",

    props : [ ],

    data() {
        return {
            //filenames: []
        }
    },

    methods: {

        callNotify(){
            this.$refs.graphViewer.notify();
        },

        /*
        addItem: function(filename){
            this.filenames.push({
                "Filename" : filename
            });
        }
        */
    },

    mounted() {
        /*
        fetch("http://localhost:3000/entries", {
            method: "GET",
            mode: 'cors',
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json()) //response.json()
        .then(data => {
            data.forEach(element => {
                this.addItem(element);      
            });
        });
        */
    },
    
    components: {
       Reactflowviewer,
       ReactflowTopMenu,
       ModelCheckView
    }
}
</script>

<style scoped>
#ruleEditor {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 50px auto;
    grid-template-areas: 
    "ptree ptree"
    "viewer viewer";
    overflow: hidden;

    height: 100vh;
    border: 1px solid lightgrey;
}

.ptree{
    grid-area: ptree;
    background-color: gainsboro;
}

.viewer{
    grid-area: viewer;
    background-color: white;
}
</style>
