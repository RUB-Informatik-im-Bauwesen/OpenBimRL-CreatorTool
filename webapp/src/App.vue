<script setup lang="ts">
import { ref } from "vue";
import { Flowchart, Help, SideOverlay } from "./components";
import Navigation from "./components/navigation";

const showHelp = ref(false);
</script>

<template>
    <Navigation @showHelp="showHelp = !showHelp" />
    <SideOverlay />
    <Help v-show="showHelp" @close="showHelp = false" />
    <Flowchart class="h-screen" />
</template>

<style scoped></style>
