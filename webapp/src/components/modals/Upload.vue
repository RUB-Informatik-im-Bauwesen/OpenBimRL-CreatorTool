<template>
  <div class="anchor">
    <dialog
      class="absolute block aspect-square w-16 bg-red-800"
      :class="{ hidden: !active }"
    ></dialog>
  </div>
</template>

<script setup lang="ts">
import { registerModal } from ".";

const active = registerModal();
defineExpose({ active });
</script>

<style scoped></style>
