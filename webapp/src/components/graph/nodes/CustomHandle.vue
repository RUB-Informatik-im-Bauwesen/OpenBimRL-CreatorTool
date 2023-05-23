<template>
    <Handle class="flex items-center w-3 h-3">
        <span class="px-4 pointer-events-none" style="display: ruby">
            <slot />
        </span>
    </Handle>
</template>

<script setup lang="ts">
import { Handle } from '@vue-flow/core';
</script>

<style>
div.vue-flow__handle-left {
    left: -6px;
}

div.vue-flow__handle-right {
    @apply justify-end;
}

div.vue-flow__handle:hover > span {
    @apply text-blue-600;
}
</style>
