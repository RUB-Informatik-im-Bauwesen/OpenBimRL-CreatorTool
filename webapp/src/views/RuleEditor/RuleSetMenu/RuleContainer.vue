<template>
    <div class="ruleContainer">
        
        <div class="menuLineLayout">
            <b-input-group size="sm" prepend="Label">
                <b-form-input 
                    v-model="parent[index].label"
                    required
                ></b-form-input>
            </b-input-group>
            <b-button size="sm" variant="danger" @click="deleteContainer(index)">
                <b-icon icon="x-circle" font-scale="1"></b-icon>
            </b-button>
        </div>
        
        <div class="menuLineLayout">
            <b-input-group size="sm" prepend="Quantifier">
                <b-form-select v-model="parent[index].quantifier" :options="quatifierOptions"></b-form-select>
            </b-input-group>
            <b-input-group size="sm" prepend="Operator">
                <b-form-select v-model="parent[index].operator" :options="operatorOptions"></b-form-select>
            </b-input-group>
        </div>

        <hr>

        <div class="menuLineLayout">
            <b-input-group size="sm" prepend="Operand1">
                <b-form-input 
                    v-model="parent[index].operand1"
                    required
                ></b-form-input>
            </b-input-group>
        </div>

        <div class="menuLineLayout">
            <b-input-group size="sm" prepend="Operand2">
                <b-form-input 
                    v-model="parent[index].operand2"
                    required
                ></b-form-input>
            </b-input-group>
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
    name: "RuleContainer",
    
    props: ['parent', 'index'],

    data() {
        return {
            quatifierOptions : [
                { value: "undefined", text: "undefined" },
                { value: "all", text: "all" },
                { value: "exists", text: "exists" },
                { value: "notexists", text: "notexists" }
            ],
            operatorOptions : [
                { value: "equals", text: "equals" },
                { value: "includes", text: "includes" },
                { value: "greaterthan", text: "greaterthan" },
                { value: "lessorequals", text: "lessorequals" }
            ]
        }
    },

    methods: {
        deleteContainer(index){
            this.parent.splice(index, 1);
        }
    },

    mounted() {

    },
    
    components: {
    
    }
    
}
</script>

<style scoped>
.ruleContainer {
    background: lightsalmon;
    border-radius: 5px;
    margin: 10px;
    padding: 5px;
}
</style>
