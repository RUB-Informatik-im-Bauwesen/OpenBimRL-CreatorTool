<template>
    <div class="ruleSetContainer" :style="{'max-height' : isMinimized ? '95px' : 'none' }" @drop="drop" @dragover="allowDrop">
        
        <div class="menuLineLayout">
            <b-input-group size="sm" prepend="Label">
                <b-form-input 
                    v-model="parent[index].label"
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

        <div class="menuLineLayout">
            <b-input-group size="sm" prepend="Operator">
                <b-form-select v-model="parent[index].operator" :options="operatorOptions"></b-form-select>
            </b-input-group>
        </div>

        <hr>

        <div class="overflow-auto">
            <div style="margin: 5px">
                <div v-if="parent[index].rulesOrRuleSets.length === 0" class="dragArea"> Drop Here </div>

                <div v-for='(rOrS, innerIndex) in parent[index].rulesOrRuleSets' :key='innerIndex'>
                    <div v-if="rOrS.type === 'ruleSet'">
                        <ruleSetContainer :parent="parent[index].rulesOrRuleSets" :index="innerIndex"/>
                    </div> 
                    <div v-if="rOrS.type === 'rule'">
                        <ruleContainer :parent="parent[index].rulesOrRuleSets" :index="innerIndex"/>
                    </div>
                </div>
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
import RuleContainer from './RuleContainer.vue';

export default {
    name: "RuleSetContainer",
    
    props: ['parent', 'index'],

    data() {
        return {
            isMinimized : true,
            operatorOptions : [
                { value: "and", text: "and" },
                { value: "or", text: "or" },
                { value: "xor", text: "xor" }
            ]
        }
    },

    methods: {
        deleteContainer(index){
            this.parent.splice(index, 1);
        },
        drop(event) {
            event.preventDefault();
            event.stopPropagation();
            
            var data = JSON.parse(
                event.dataTransfer.getData("rulesOrRuleSetsData")
            );

            this.parent[this.index].rulesOrRuleSets.push(data);

            /*
            event.target.appendChild(
                document.getElementById(data)
            );
            */
        },
        allowDrop(event) {
            event.preventDefault();
            event.stopPropagation();
        }
    },

    mounted() {

    },
    
    components: {
        RuleContainer
    }
    
}
</script>

<style scoped>
.ruleSetContainer {
    background: lightblue;
    border: 5px solid darkcyan;
    border-radius: 5px;
    margin: 10px;
    padding: 5px;
    
    overflow: hidden;
    transition: max-height 250ms ease-out;
}
</style>
