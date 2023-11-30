<template>
    <div
        class="flex w-full rounded overflow-hidden border dark:border-default-medium"
        :class="
            focused ? ['border-opacity-20', 'border-default-dark', 'dark:border-opacity-50'] : []
        "
    >
        <label
            :for="key"
            class="p-2 text-sm cursor-text select-none bg-default-light border-r border-inherit dark:bg-default-dark"
        >
            <slot />
        </label>
        <input
            :id="key"
            :placeholder="placeholder || '...'"
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            @focusin="focused = true"
            @focusout="focused = false"
            class="w-full pl-1 dark:bg-default-dark focus-visible:outline-none"
        />
        <slot name="icon" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps(['modelValue', 'placeholder']);
defineEmits(['update:modelValue']);

const focused = ref(false);

const key = self.crypto.randomUUID();
</script>

<style scoped></style>
