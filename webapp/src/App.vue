<script setup lang="ts">
import Flowchart from "./components/Flowchart.vue";
import SideOverlay from "./components/SideOverlay.vue";
import Navigation from "./components/navigation";
</script>

<template>
  <Navigation />
  <SideOverlay />
  <Flowchart class="h-screen" />
</template>

<style scoped></style>
