<template>
    <div>
        <router-view/>
    </div>
</template>

<script>

/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

import RuleEditorView from './RuleEditor/RuleEditorView.vue';

export default {
    name: "Mainframe",

    props : [ ],

    methods: {
        pageLoad(event){
            console.log(event);
        }
    },
    
    components: {
        RuleEditorView
    }
}
</script>

<style scoped>

</style>
