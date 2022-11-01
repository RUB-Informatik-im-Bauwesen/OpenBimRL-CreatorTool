<template>
    <div class="subCheckContainer" :style="{'max-height' : isMinimized ? '60px' : 'none' }">
        
        <div class="menuLineLayout">
            <b-input-group size="sm" prepend="Name">
                <b-form-input 
                    id="subCheckName-input"
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
            <div class="applicabilityArea" @drop="dropApplicability" @dragover="allowDrop">
                Applicability
                <hr>
                <div v-if="parent[index].applicability.length === 0" class="dragArea"> Drop Here </div>
            
                <div v-for='(rOrS, innerIndex) in parent[index].applicability' :key='innerIndex'>
                    <div v-if="rOrS.type === 'ruleSet'">
                        <ruleSetContainer :parent="parent[index].applicability" :index="innerIndex"/>
                    </div> 
                    <div v-if="rOrS.type === 'rule'">
                        <ruleContainer :parent="parent[index].applicability" :index="innerIndex"/>
                    </div>
                </div>
            
            </div>

            <br>

            <div class="rulesAndRuleSetsArea" @drop="dropRulesOrRuleSets" @dragover="allowDrop">
                Rules and RuleSets
                <hr>
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
import RuleSetContainer from './RuleSetContainer.vue';
import RuleContainer from './RuleContainer.vue';

export default {
    name: "SubCheckContainer",
    
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
        dropRulesOrRuleSets(event) {
            event.preventDefault();
            event.stopPropagation();

            let data = event.dataTransfer.getData("rulesOrRuleSetsData");
            if(data !== ""){
                this.parent[this.index].rulesOrRuleSets.push(JSON.parse(data));
            }

            /*
            event.target.appendChild(
                document.getElementById(data)
            );
            */
        },
        dropApplicability(event) {
            event.preventDefault();
            event.stopPropagation();

            let data = event.dataTransfer.getData("rulesOrRuleSetsData");
            if(data !== ""){
                this.parent[this.index].applicability.push(JSON.parse(data));
            }
        },
        allowDrop(event) {
            event.preventDefault();
            event.stopPropagation();
        }
    },

    mounted() {

    },
    
    components: {
        RuleSetContainer,
        RuleContainer
    }
    
}
</script>

<style scoped>
.subCheckContainer {
    background: rgb(245,245,245);
    border: 5px solid lightgray;
    border-radius: 5px;
    margin: 10px;
    padding: 5px;

    overflow: hidden;
    transition: max-height 250ms ease-out;
}

.applicabilityArea {
    padding: 5px;
    text-align: center;
    background: lightyellow;
    border: 5px solid rgb(225, 225, 169);
}

.rulesAndRuleSetsArea{
    padding: 5px;
    text-align: center;
    background: lightsteelblue;
    border: 5px solid rgb(115, 128, 146);
}
</style>
