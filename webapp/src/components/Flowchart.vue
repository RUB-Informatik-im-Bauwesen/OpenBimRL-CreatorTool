<!-- Flowchart.vue -->
<script lang="ts" setup>
import { VueFlow } from "@vue-flow/core";
import { Background, BackgroundVariant } from '@vue-flow/background'
import { ref } from "vue";

const elements = ref([
    {
        id: "1",
        label: "node 1",
        position: { x: 100, y: 100 },
    },
    {
        id: "2",
        label: "node 2",
        position: { x: 100, y: 200 },
    },
    {
        id: "e1-2",
        target: "2",
        source: "1",
    },
]);
</script>

<template>
    <VueFlow v-model="elements">
        <Background :variant="BackgroundVariant.Lines" :pattern-color="'#efefef'" :size="0.8" />
    </VueFlow>
</template>
