<template>
  <div class="anchor">
    <dialog
      class="absolute block h-20 w-full bg-red-800 -translate-x-full top-8"
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
