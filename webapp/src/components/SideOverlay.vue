<template>
  <aside
    class="fixed z-10 inset-y-16 w-10 border bg-neutral-200 shadow-md selection:shadow-xl rounded bg-opacity-90 right-4 duration-200 transition-all"
    :class="{ open: open }"
  >
    <button
      class="w-10 h-full hover:bg-neutral-300 transition-colors duration-300 relative"
      @click="handler"
    >
      <div
        class="text-xl block -rotate-90 absolute -left-2"
        v-text="open ? 'close' : 'open'"
      />
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);

const handler = (event: Event) => (open.value = !open.value);
</script>
<style scoped>
aside.open {
  @apply w-1/2;
}
</style>
