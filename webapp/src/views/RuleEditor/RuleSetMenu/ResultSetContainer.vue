<template>
    <div class="resultSetContainer" :style="{'max-height' : isMinimized ? '60px' : 'none' }">
        
        <div class="menuLineLayout">
            <b-input-group size="sm" prepend="Name">
                <b-form-input 
                    v-model="parent[index].name"
                    required
                ></b-form-input>
            </b-input-group>
            <b-button size="sm" :pressed.sync="isMinimized">
                <b-icon v-if="isMinimized" icon="arrow-down" font-scale="1"></b-icon>
                <b-icon v-if="!isMinimized" icon="arrow-up" font-scale="1"></b-icon>
            </b-button>
            <b-button size="sm" variant="danger" @click="deleteContainer(index)">
                <b-icon icon="x-circle" font-scale="1"></b-icon>
            </b-button>
        </div>
    
        <hr>

        <div class="overflow-auto">

            <div class="menuLineLayout">
                <b-input-group size="sm" prepend="Elements">
                    <b-form-input v-model="parent[index].elements" required></b-form-input>
                </b-input-group>
                <b-input-group size="sm" prepend="Filter">
                    <b-form-input v-model="parent[index].filter" required></b-form-input>
                </b-input-group>
            </div>

        </div>
    </div>
</template>

<script>
/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

import { v4 as uuidv4 } from 'uuid';

export default {
    name: "ResultSetContainer",
    
    props: ['parent', 'index'],

    data() {
        return {
            isMinimized : true
        }
    },

    methods: {
        deleteContainer(index){
            this.parent.splice(index, 1);
        },
        getAllRuleIdentifiers(){
            let identifierList = [];
            
            //TODO find and retrieve all RuleIdentifiers
        }
    },

    mounted() {

    },
    
    components: {
    
    }
    
}
</script>

<style scoped>
.resultSetContainer {
    background: lightcoral;
    border-radius: 5px;
    margin: 10px;
    padding: 5px;
    border: 5px solid darkred;
    
    overflow: hidden;
    transition: max-height 250ms ease-out;
}
</style>
