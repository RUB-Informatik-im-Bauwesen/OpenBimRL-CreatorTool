<template>
    <aside
        class="fixed inset-y-16 right-4 z-10 w-10 rounded border bg-neutral-200 bg-opacity-90 shadow-md transition-all duration-200 selection:shadow-xl"
        :class="{ open: open }"
    >
        <button
            class="relative h-full w-10 transition-colors duration-300 hover:bg-neutral-300"
            @click="handler"
        >
            <div
                class="absolute -left-2 block -rotate-90 text-xl"
                v-text="open ? 'close' : 'open'"
            />
        </button>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);

const handler = (event: Event) => (open.value = !open.value);
</script>
<style scoped>
aside.open {
    @apply w-1/2;
}
</style>
