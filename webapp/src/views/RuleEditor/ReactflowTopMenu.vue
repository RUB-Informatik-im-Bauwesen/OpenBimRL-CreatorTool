<template>
    <div class="wrapper">
        <b-button-toolbar id="ReactflowTopMenu" aria-label="Toolbar with button groups and dropdown menu">
            <b-button-group class="mx-1">
                <b-button @click="showModal">New</b-button>
                <b-modal ref="createNew-modal" title="Creating new Project" @ok="createNewAction">
                    <div class="d-block text-center">
                        Are you sure to create a new project?
                        <br>
                        Unsaved changes will be lost.
                    </div>
                </b-modal>
            </b-button-group>
            <b-button-group class="mx-1">
                <b-dropdown text="Upload">
                    <b-dropdown-item-button @click="handleJSONUpload">
                        JSON
                    </b-dropdown-item-button>
                    <b-dropdown-item-button @click="handleXMLUpload">
                        XML
                    </b-dropdown-item-button>
                </b-dropdown>
                <b-dropdown text="Download">
                    <b-dropdown-item-button @click="showFilenameModal('json')">
                        JSON
                    </b-dropdown-item-button>
                    <b-dropdown-item-button @click="showFilenameModal('xml')">
                        XML
                    </b-dropdown-item-button>
                </b-dropdown>
            </b-button-group>
            <b-button-group class="mx-1">
                <b-button v-b-toggle.sidebar-nodemenu variant="primary">Create Nodes</b-button>
            </b-button-group>
            <b-button-group class="mx-1">
                <b-button @click="handleCreateGroup" variant="danger">Create Group</b-button>
            </b-button-group>

            <b-button v-b-toggle.sidebar-right>Help?</b-button>
            <b-sidebar id="sidebar-right" title="Information" right shadow>
                <div class="px-3 py-2">
                    <h4>Über OpenBimRL Creator</h4>
                    <p class="sidebar-block" style="text-align: justify;">
                        Angelehnt an der graphen-basierten Programmierung beschreibt das OpenBimRL Format eine Regelsprache zur formellen und fachlichen Prüfung 
                        von Bauwerksmodellen. Das Format definiert eine dynamisch erweiterbare Schnittstelle auf derer Basis Bausteine für einen graphen-basierten 
                        Prüfvorgang konstruiert und verknüpft werden können. Bei der Entwicklung wurde Wert auf Offenheit und Transparenz der Prüfungdokumente gelegt. 
                    </p>

                    <h4>Entwickelt von</h4>
                    <b-link href="https://www.inf.bi.ruhr-uni-bochum.de/">
                        <b-img src="https://www.inf.bi.ruhr-uni-bochum.de/iib/mam/images/logos/logo_menue_de.png" fluid thumbnail></b-img>
                    </b-link>

                    <br>

                    <table class="sidebar-block">
                        <tr>
                            <td><b>Institution:</b></td>
                            <td>Lehrstuhl für Informatik im Bauwesen <br> an der Ruhr-Universität Bochum</td>
                        </tr>
                        <tr>
                            <td><b>Entwickler:</b></td>
                            <td>Marcel Stepien</td>
                        </tr>
                        <tr>
                            <td><b>E-Mail:</b></td>
                            <td>marcel.stepien@ruhr-uni-bochum.de</td>
                        </tr>
                        <tr>
                            <td><b>Datum:</b></td>
                            <td>{{ $store.state.lastModified }}</td>
                        </tr>
                    </table>

                    <div class="sidebar-block">
                        <b-link href="https://www.linkedin.com/company/lehrstuhl-f%C3%BCr-informatik-im-bauwesen">
                            <b-icon icon="linkedin" font-scale="3"></b-icon>
                        </b-link>
                        <b-link href="https://twitter.com/iib_rub">
                            <b-icon icon="twitter" font-scale="3"></b-icon>
                        </b-link>
                        <b-link href="https://github.com/RUB-Informatik-im-Bauwesen">
                            <b-icon icon="github" font-scale="3"></b-icon>
                        </b-link>
                    </div>
                </div>
            </b-sidebar>

        </b-button-toolbar>

        <graphNodeMenu />

        <input id="uploadJSONAnchorElem" type="file" style="display:none" @change="uploaderOnChange($event, 'json')" />
        <input id="uploadXMLAnchorElem" type="file" style="display:none" @change="uploaderOnChange($event, 'xml')" />
        <a id="downloadAnchorElem" style="display:none"></a>

        <!-- The modal -->
        <b-modal id="filename-input-modal" title="Enter Ruleset Name" hide-footer>
            <b-input-group>
                <template #prepend>
                    <b-input-group-text>Name</b-input-group-text>
                </template>
                <b-form-input v-model="downloadContext.data.filename"></b-form-input>
                <b-button class="mt-3" variant="primary" block @click="startDownload">Download</b-button>
            </b-input-group>
        </b-modal>
        <!-- if condition for group-modal rendering -->
        <div id="create-group-modal-Container">
            <b-modal id="create-group-modal" title="create Group" @ok="onCreateGroupModalConfirm">
                <b-input-group>
                    <template #prepend>
                        <b-input-group-text>Label</b-input-group-text>
                    </template>
                    <b-form-input v-model="initialLabel"></b-form-input>
                </b-input-group>

                <b-input-group class="colorPickerWrapper">
                    <template #prepend id="colorPicker">
                        <chrome-picker v-model="initialColor" />
                    </template>
                </b-input-group>
            </b-modal>
        </div>

</div>
</template>

<script>

/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */
import GraphNodeMenu from './GraphNodeMenu/GraphNodeMenu.vue';
import Parser from '/webapp/src/core/ParserOpenBIMRL.ts';
import { createGroup, updateGroup } from '/webapp/src/core/CustomNodeSetup.ts';
import xmljs from 'xml-js';
import { Chrome } from "vue-color"
export default {
    name: "ReactflowTopMenu",
    
    data() {
        return {
            modalconfirmed: false,
            initialColor: { hex: "#00340034" },
            initialLabel:'',
            dblClickSelectedNode: { data: { label: "" }, style: { backgroundColor: this.initialColor } },
            downloadContext: {
                data: {
                    filename: "",
                    filetype: ""
                }
            } //Initially: empty placeholder node for modal rendering
        }
    },
    methods: {
        onCreateGroupModalConfirm() {
            this.modalconfirmed = true
            let group = createGroup(this.initialColor, this.initialLabel);
            var size = group.data.groupedElementIds.length
            console.log("groupSize: " + size)
            updateGroup(group.id);
            this.$emit("callNotify");
        },
        handleCreateGroup() {
            this.$bvModal.show("create-group-modal");
        },
        showFilenameModal(filetype) {
            this.downloadContext.data.filetype = filetype;
            this.$bvModal.show("filename-input-modal");
        },
        startDownload(){
            this.$bvModal.hide("filename-input-modal");
            
            if(this.downloadContext.data.filetype === 'json'){
                let localModelCheck = {
                    elements: Array.from(this.$store.state.modelCheck.elements.values()),
                    subChecks: this.$store.state.modelCheck.subChecks,
                    resultSets: this.$store.state.modelCheck.resultSets
                };

                let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(
                    localModelCheck
                ));
                let dlAnchorElem = document.getElementById('downloadAnchorElem');
                dlAnchorElem.setAttribute("href", dataStr );
                dlAnchorElem.setAttribute("download", this.downloadContext.data.filename + ".json");
                dlAnchorElem.click();
            }
            
            if(this.downloadContext.data.filetype === 'xml'){
                let parser = new Parser();
            
                let dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(
                    parser.build(
                        Array.from(this.$store.state.modelCheck.elements.values()),
                        this.$store.state.modelCheck.subChecks,
                        this.$store.state.modelCheck.resultSets,
                        this.downloadContext.data.filename
                    )
                );

                let dlAnchorElem = document.getElementById('downloadAnchorElem');
                dlAnchorElem.setAttribute("href", dataStr );
                dlAnchorElem.setAttribute("download", this.downloadContext.data.filename + ".xml");
                dlAnchorElem.click();
            }

        },
        handleJSONUpload(event){
            document.getElementById('uploadJSONAnchorElem').click();
        },
        handleXMLUpload(event){
            document.getElementById('uploadXMLAnchorElem').click();
        },
        uploaderOnChange(event, filetype){
            let _self = this;
            let reader = new FileReader();
            reader.onload = (event) => {
                if(filetype === 'json'){
                    let obj = JSON.parse(event.target.result);

                    _self.$store.state.modelCheck.elements = new Map();
                    for(let ele of obj.elements){
                        _self.$store.state.modelCheck.elements.set(ele.id, ele);
                    }
                    _self.$store.state.modelCheck.subChecks = obj.subChecks;
                    _self.$store.state.modelCheck.resultSets = obj.resultSets;
                }

                if(filetype === 'xml'){
                    let obj = event.target.result;
                    let jsonStrData = xmljs.xml2json(obj, {compact: true, spaces: 4});
                    let jsonData = JSON.parse(jsonStrData);
                    
                    let opts = this.$store.state.settings;
                    let parser = new Parser();
                    let result = parser.parse(jsonData, opts);

                    //Load into storage
                    let elements = result.elements;
                    _self.$store.state.modelCheck.elements = new Map();
                    for(let ele of elements){
                        _self.$store.state.modelCheck.elements.set(ele.id, ele);
                    }

                    _self.$store.state.modelCheck.subChecks = result.subChecks;
                    _self.$store.state.modelCheck.resultSets = result.resultSets;
                }

                _self.$emit("callNotify");
            };
            reader.readAsText(event.target.files[0]);
        },
        createNewAction(event){
            this.$store.state.modelCheck.elements = new Map();
            this.$store.state.modelCheck.subChecks = [];
            this.$store.state.modelCheck.resultSets = [];
            this.hideModal();
            this.$emit("callNotify");
        },
        showModal() {
            this.$refs['createNew-modal'].show();
        },
        hideModal() {
            this.$refs['createNew-modal'].hide();
        },
    },

    mounted() {

    },
    
    components: {
        GraphNodeMenu,
        'chrome-picker': Chrome,
    }
    
}
</script>

<style scoped>
.wrapper {
    z-index: 5;
}

#ReactflowTopMenu {
    padding: 5px;
}

.vl {
    border-left: 2px solid gray;
    height: 100%;
    margin-left: 5px;
    margin-right: 5px;
}

.sidebar-block {
    font-size: 12px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
}
.colorPickerWrapper {
    width: auto;
    text-align: center;
    margin-top: 3.5%;
}
.input-group-prepend {
  margin: auto;
}
</style>
