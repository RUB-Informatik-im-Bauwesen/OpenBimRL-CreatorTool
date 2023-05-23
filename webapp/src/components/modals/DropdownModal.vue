<template>
    <div class="anchor">
        <dialog
            class="absolute top-8 block -translate-x-full bg-white shadow-lg"
            :class="{ hidden: !active }"
        >
            <div class="flex flex-col gap-px">
                <form
                    v-for="item in Object.keys(modalItems)"
                    @submit.prevent="modalItems[item]"
                    class="border hover:bg-slate-200 hover:border-slate-400"
                >
                    <button class="cursor-pointer px-4">{{ item }}</button>
                </form>
            </div>
        </dialog>
    </div>
</template>

<script setup lang="ts">
import { registerModal } from '.';
import type { DropdownProps } from '../navigation/Types';

const { modalItems } = defineProps<{ modalItems: DropdownProps }>();

const active = registerModal();
defineExpose({ active });
</script>

<style scoped></style>
