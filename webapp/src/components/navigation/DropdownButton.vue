<template>
  <button class="nav-button" @click.stop="activateModal">
    <span>
      <slot />
      <ChevronUpIcon v-if="modal?.active" class="h-4 w-4 inline" />
      <ChevronDownIcon v-else class="h-4 w-4 inline" />
    </span>
  </button>
  <Modal ref="modal" :modal-items="modalItems" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DropdownModal as Modal, closeAll } from "../modals";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/20/solid";
import { DropdownProps } from "./Types";

const { modalItems } = defineProps<{ modalItems: DropdownProps }>();

const modal = ref<typeof Modal | null>(null);

const activateModal = () => {
  const oldVal = modal.value?.active;
  closeAll();
  modal.value!.active = !oldVal;
};
</script>

<style scoped></style>
