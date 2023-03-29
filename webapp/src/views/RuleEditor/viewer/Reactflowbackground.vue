<template>
    <div 
        id="backgroundContainer" 
        class="react-flow__background" 
    />
</template>

<script>
/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

export default {
    name: "Reactflowbackground",

    props : [ "panePosition" ],

    data() {
        return {
            backgroundBaseSize: 50
        }
    },
    
    mounted: function () {
        //Update background based on pane transformation
        let bgElement = document.getElementById("backgroundContainer");
        bgElement.style.backgroundPositionX = this.panePosition.x + "px";
        bgElement.style.backgroundPositionY = this.panePosition.y + "px";
        bgElement.style.backgroundSize = 
            (this.backgroundBaseSize * this.panePosition.zoom) + "px " + 
            (this.backgroundBaseSize * this.panePosition.zoom) + "px"; 
    }
}
</script>

<style scoped>
#backgroundContainer {
    background-image: linear-gradient(
        0deg, 
        transparent 24%, 
        rgba(0, 0, 0, .10) 25%, 
        rgba(0, 0, 0, .10) 26%, 
        transparent 27%, 
        transparent 74%, 
        rgba(0, 0, 0, .10) 75%, 
        rgba(0, 0, 0, .10) 76%, 
        transparent 77%, 
        transparent
      ), 
      linear-gradient(
        90deg, 
        transparent 24%, 
        rgba(0, 0, 0, .10) 25%, 
        rgba(0, 0, 0, .10) 26%, 
        transparent 27%, 
        transparent 74%, 
        rgba(0, 0, 0, .10) 75%, 
        rgba(0, 0, 0, .10) 76%, 
        transparent 77%, 
        transparent
      ); 
}
</style>
