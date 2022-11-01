<template>
    <div class="modelCheckViewWrapper">
        <b-button class="rotateBtn" :pressed.sync="isContentOpen" variant="light">
            <div v-show="isContentOpen">Close</div>
            <div v-show="!isContentOpen">Open</div>
        </b-button>
        
        <div :style="{'width' : isContentOpen ? '50vw' : '0vw', 'min-width' : isContentOpen ? '500px' : '0px'}" id="modelCheckView">
            <div id="modelCheckViewContent" class="overflow-auto">
                
                <div class="resultSetArea" :style="{'max-height' : isMinimizedResultSets ? '60px' : 'none' }" @drop="dropResultSet" @dragover="allowDrop">
                    <div class="menuLineLayout">

                        <div style="width: 100%;">
                            Result Subsets
                        </div>
                    
                        <b-button size="sm" :pressed.sync="isMinimizedResultSets">
                            <b-icon v-if="isMinimizedResultSets" icon="arrow-down" font-scale="1"></b-icon>
                            <b-icon v-if="!isMinimizedResultSets" icon="arrow-up" font-scale="1"></b-icon>
                        </b-button>
                    </div>
                    
                    <hr>

                    <div v-if="$store.state.modelCheck.resultSets.length === 0" class="dragArea"> Drop Here </div>
                
                    <div v-for='(rOrS, innerIndex) in $store.state.modelCheck.resultSets' :key='innerIndex'>
                        <div v-if="rOrS.type === 'resultSet'">
                            <resultSetContainer :parent="$store.state.modelCheck.resultSets" :index="innerIndex"/>
                        </div>
                    </div>
                </div>

                <subCheckContainer v-for='(item, index) in $store.state.modelCheck.subChecks' :key='index' :parent="$store.state.modelCheck.subChecks" :index="index" />

            </div>
            <hr>
            <div id="modelCheckViewMenu">
                
                <b-button id="rule" size="sm" variant="success" draggable="true"  @dragstart="drag">
                    <b-icon icon="file-earmark-plus" font-scale="1"></b-icon>
                </b-button>

                <b-button id="ruleSet" size="sm" variant="success" draggable="true" @dragstart="drag">
                    <b-icon icon="folder-plus" font-scale="1"></b-icon>
                </b-button>

                <b-button id="resultSet" size="sm" variant="success" draggable="true" @dragstart="drag">
                    <b-icon icon="check-circle" font-scale="1"></b-icon>
                </b-button>

                <div class="vl"></div>

                <b-button size="sm" variant="primary" @click="handleCreateSubCheckAction"> Add SubCheck </b-button>
            </div>
        </div>

        <b-modal title="Create SubCheck" ref="createSubCheck-modal" id="createSubCheck-modal" @ok="createSubCheck">
            <b-input-group prepend="Name">
                <b-form-input
                    id="subCheckName-input"
                    v-model="subCheckName"
                    required
                ></b-form-input>
            </b-input-group>
        </b-modal>
        
    </div>
    
</template>

<script>
/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

import { v4 as uuidv4 } from 'uuid';
import SubCheckContainer from './SubCheckContainer.vue';
import ResultSetContainer from './ResultSetContainer.vue';

export default {
    name: "ModelCheckView",
    
    data() {
        return {
            isMinimizedResultSets : true,
            isContentOpen : false,
            subCheckName: "SubCheck Example A"
        }
    },

    methods: {
        addSubCheck(item){
            this.$store.state.modelCheck.subChecks.push(item);
        },
        handleCreateSubCheckAction(){
            this.$refs['createSubCheck-modal'].show();
        },
        createSubCheck(){
            let subCheck = {
                label: uuidv4(),
                name: this.subCheckName,
                applicability: [],
                rulesOrRuleSets: []
            }
            this.addSubCheck(subCheck);
        },
        drag(event) {
            if(event.target.id === "rule"){
                event.dataTransfer.setData("rulesOrRuleSetsData", JSON.stringify({
                    label: uuidv4(),
                    type: "rule",
                    quantifier: "all",
                    operator: "equals",
                    operand1: "label containing values",
                    operand2: "value"
                }));
            }

            if(event.target.id === "ruleSet"){
                event.dataTransfer.setData("rulesOrRuleSetsData", JSON.stringify({
                    label: uuidv4(),
                    type: "ruleSet",
                    operator: "and",
                    rulesOrRuleSets: []
                }));
            }

            if(event.target.id === "resultSet"){
                event.dataTransfer.setData("resultSetData", JSON.stringify({
                    label: uuidv4(),
                    type: "resultSet",
                    name: "Name or the ResultSet here",
                    elements: "label containing IFC elements",
                    filter: "insert label for iteration here"
                }));
            }
        },
        dropResultSet(event) {
            event.preventDefault();
            event.stopPropagation();

            let data = event.dataTransfer.getData("resultSetData");
            if(data !== ""){
                this.$store.state.modelCheck.resultSets.push(JSON.parse(data));
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
        SubCheckContainer,
        ResultSetContainer
    }
    
}
</script>

<style scoped>
.modelCheckViewWrapper {
    z-index: 4;

    right: 0px;

    margin-top: 55px;
    margin-right: 10px;
    margin-left: 50px;
    margin-bottom: 55px;
    
    height: -moz-calc(100% - 65px);
    height: -webkit-calc(100% - 65px);
    height: calc(100% - 65px);

    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    float: right;
    position: fixed;
    
}

.modelCheckViewWrapper * {
    align-self: center;
    position: relative;
}

#modelCheckView {
    border: 5px Solid rgb(245,245,245);
    background: rgba(245,245,245, 0.7);
    border-radius: 5px;

    height: 100%;
    max-height: 100%;

    color: black;

    overflow: hidden;
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

#modelCheckViewContent {
    
    opacity: 1.0;
    height: -moz-calc(100% - 80px);
    height: -webkit-calc(100% - 80px);
    height: calc(100% - 80px);

    max-height: -moz-calc(100% - 80px);
    max-height: -webkit-calc(100% - 80px);
    max-height: calc(100% - 80px);

    min-width: calc(30vw - 10px);
}

#modelCheckViewMenu {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 5px;

    min-width: calc(30vw - 10px);
}

.rotateBtn {
    height: 100%;
    width: 40px;
    box-shadow: 0px 0px 10px 2px rgb(0 0 0 / 0.2);
}

.rotateBtn * {
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    transform: rotate(-90deg);
}

.vl {
  border-left: 2px solid lightgray;
  height: 30px;
}

.resultSetArea{
    margin: 10px;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    background: lightsteelblue;
    border: 5px solid rgb(115, 128, 146);

    overflow: hidden;
    transition: max-height 250ms ease-out;
}
</style>
