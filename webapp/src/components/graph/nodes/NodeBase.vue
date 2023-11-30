<template>
    <div
        class="min-w-[12rem] rounded shadow-[0_0_0_1px] aria-selected:shadow-[0_0_0_2px] shadow-gray-500 bg-default-light dark:shadow-default-medium dark:bg-default-darkest"
        :aria-selected="selected"
        :style="widthStyle"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    selected: boolean;
    minWidth?: number;
}>();

const widthStyle = computed(() => (props.minWidth ? `width: ${props.minWidth}rem` : ''));
</script>

<style scoped></style>
