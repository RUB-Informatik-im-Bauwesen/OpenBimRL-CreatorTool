<template>
    <div
        class="flex w-full rounded overflow-hidden border dark:border-default-medium"
        :class="getLabelClasses"
    >
        <label
            :for="key"
            v-bind="invalidMessageProp"
            class="p-2 text-sm cursor-text select-none bg-default-light border-r border-inherit dark:bg-default-dark"
        >
            <slot />
        </label>
        <input
            :id="key"
            :placeholder="placeholder || '...'"
            :value="modelValue"
            :type="type ?? 'text'"
            v-bind="invalidMessageProp"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            @focusin="focused = true"
            @focusout="focused = false"
            class="w-full pl-1 dark:bg-default-dark focus-visible:outline-none"
        />
        <slot name="icon" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps(['modelValue', 'placeholder', 'type', 'valid', 'invalidMessage']);
defineEmits(['update:modelValue']);

const focused = ref(false);

const getLabelClasses = computed(() => {
    if (props.valid === false) return ['!border-red-700'];
    if (focused.value)
        return ['border-opacity-20', 'border-default-dark', 'dark:border-opacity-50'];
});

const invalidMessageProp = computed(() => {
    if (props.valid === false) return { title: props.invalidMessage };
    return {};
});

const key = self.crypto.randomUUID();
</script>

<style scoped></style>
