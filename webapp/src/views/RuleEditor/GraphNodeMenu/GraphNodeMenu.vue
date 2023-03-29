<template>
    <div>
        <b-sidebar width="370px" id="sidebar-nodemenu" title="Create Node Menu" no-header right shadow>
            
            <div class="menuLineLayout">
                <b-input-group size="sm" class="mb-3" prepend="Search">
                    <b-form-input v-model="search"></b-form-input>
                </b-input-group>
            </div>
            
            <b-tabs id="NodeTabs" small>
                <b-tab v-for="(libname, index) in loadedLibraries" :key="index" class="tabStyle overflow-auto" :title="libname" active>
                    <!--
                    <template #title>
                        {{ libname }}
                        <b-button class="closeBtn" variant="success" @click="addLibrary">
                            <b-icon icon="plus" font-scale="1"></b-icon>
                        </b-button>
                    </template>
                    -->
                    <graphItemGroup v-for="group in availableLibraries[libname]" :search="search" :key="group.id" :group="group"/>
                </b-tab>
            </b-tabs>

            <hr>

            <div class="menuLineLayout">
                <b-input-group size="sm" prepend="Library">
                    <b-form-select v-model="currentSelection" :options="Object.keys(availableLibraries)"></b-form-select>
                </b-input-group>
                <b-button size="sm" variant="success" @click="createLibrary">
                    <b-icon icon="plus" font-scale="1"></b-icon>
                </b-button>
            </div>

            <div class="menuLineLayout">
                <b-button size="sm" style="width: 100%" @click="handleUpload">
                    Upload Library
                </b-button>
            </div>

            <input id="uploadLibraryJSONAnchorElem" type="file" style="display:none" @change="uploaderOnChange($event, 'json')" />

        </b-sidebar>
    </div>
</template>

<script>
/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

import GraphItemGroup from "./GraphItemGroup.vue";
import mbo2bimNodeGroup from "../../../../resources/MBO2BIM_Ruleset.json";

export default {
    name: "GraphNodeMenu",
    
    props : [],

    data() {
        return {
            search : '',
            loadedLibraries : [ "MBO2BIM" ],
            availableLibraries : {
                "MBO2BIM" : mbo2bimNodeGroup
            },
            currentSelection : "MBO2BIM"
        }
    },

    methods: {
        createLibrary(){
            this.loadedLibraries.push(this.currentSelection);
        },
        handleUpload(event){
            document.getElementById('uploadLibraryJSONAnchorElem').click();
        },
        uploaderOnChange(event, filetype){
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onload = (event) => {
                if(filetype === 'json'){
                    let obj = JSON.parse(event.target.result);
                    this.availableLibraries[file.name] = obj;
                    this.currentSelection = file.name;
                }
            };
            reader.readAsText(file);
        },
    },

    components: {
        GraphItemGroup
    }
    
}
</script>

<style scoped>
#NodeTabs {
    margin: 10px;
    border-radius: 0px;
}

.nodeMenubar {
    margin: 10px;
}

.tabStyle {
    border: 1px solid lightgray;
    background-color: white;
    height: calc(100vh - 205px);
    overflow: hidden;
}

.closeBtn {
    padding: 0px;
    width: 26px;
    height: 26px;
}
</style>
