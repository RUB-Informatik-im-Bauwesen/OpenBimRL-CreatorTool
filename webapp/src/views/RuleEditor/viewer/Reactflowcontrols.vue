<template>
    <div class="react-flow__controls">
        <div class="react-flow__controls-button" @click="handleRenderBGGrid">
            <b-icon id="tooltip-button-renderBG1" icon="grid3x3"></b-icon>
            <b-tooltip target="tooltip-button-renderBG1" triggers="hover">
                Toggles the rendering of the background grid.
            </b-tooltip>
        </div>
        <div class="react-flow__controls-button" @click="handleMakeScreenshot">
            <b-icon icon="camera"></b-icon>
        </div>
        <div class="react-flow__controls-button" @click="handleInformation">
            <b-icon icon="info-circle"></b-icon>
        </div>
    </div>
</template>

<script>
/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

export default {
    name: "Reactflowcontrols",
    
    props : [ "handleRenderBGGrid", "versionInformation" ],

    methods: {
        handleMakeScreenshot(){
            this.$bvToast.toast(`Screenshot function currently not implemented.`, {
                title: 'Notification',
                autoHideDelay: 5000,
                appendToast: true
            })
        },
        handleInformation(){
            this.$bvToast.toast(`OpenBimRL Creator version: ` + this.versionInformation, {
                title: 'Information',
                autoHideDelay: 5000,
                appendToast: true
            })
        }
    },

    mounted: function () {
        //const { zoomIn, zoomOut, setCenter } = useZoomPanHelper();
        //console.log(useZoomPanHelper());
    }
}
</script>

<style scoped>

</style>
