<script setup lang="ts">
import { ref } from 'vue';
import { Graph, Help, SideOverlay } from './components';
import GraphNodeMenu from './components/graph/modals/GraphNodeMenu.vue';
import Navigation from './components/navigation';

const showHelp = ref(false);
const showNodeLib = ref(false);
</script>

<template>
    <Navigation @showHelp="showHelp = !showHelp" @showNodeLib="showNodeLib = !showNodeLib" />
    <SideOverlay />
    <Help v-show="showHelp" @close="showHelp = false" />
    <GraphNodeMenu v-show="showNodeLib" />
    <main>
        <Graph class="h-screen" />
    </main>
</template>

<style scoped></style>
