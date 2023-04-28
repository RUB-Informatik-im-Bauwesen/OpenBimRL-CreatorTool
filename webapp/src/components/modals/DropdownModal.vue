<template>
  <div class="anchor">
    <dialog
      class="absolute block bg-white shadow-lg -translate-x-full top-8"
      :class="{ hidden: !active }"
    >
      <ul class="flex flex-col gap-px">
        <li v-for="item in Object.keys(modalItems)" class="border">
          <a @click.stop="modalItems[item]" class="cursor-pointer px-4">{{
            item
          }}</a>
        </li>
      </ul>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { registerModal } from ".";
import { DropdownProps } from "../navigation/Types";

const { modalItems } = defineProps<{ modalItems: DropdownProps }>();

const active = registerModal();
defineExpose({ active });
</script>

<style scoped></style>
