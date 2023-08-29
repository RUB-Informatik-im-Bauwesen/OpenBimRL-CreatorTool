<template>
    <MiniMap
        ref="map"
        pannable
        zoomable
        :position="PanelPosition.TopLeft"
        :zoom-step="0.5"
        :node-color="getMinimapNodeColor"
        :node-stroke-color="'black'"
        :class="{ 'scale-100': scaled, 'scale-50': !scaled }"
        class="transition-transform dark:bg-default-dark"
        @mouseenter="scaled = true"
        @mouseleave="scaled = false"
    />
</template>

<script setup lang="ts">
import { PanelPosition } from '@vue-flow/core';
import { MiniMap } from '@vue-flow/minimap';
import { ref } from 'vue';
import { getMinimapNodeColor } from './config';

const scaled = ref(false);
</script>

<style>
@import '@vue-flow/minimap/dist/style.css';
</style>
