<template>
  <button class="nav-button" @click.stop="activateModal">
    <span
      ><slot />
      <ChevronUpIcon v-if="modal?.active" class="h-4 w-4 inline" />
      <ChevronDownIcon v-else class="h-4 w-4 inline" />
    </span>
  </button>
  <Modal ref="modal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DropdownModal as Modal } from "../modals";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/20/solid";

const modal = ref<typeof Modal | null>(null);

const activateModal = () => (modal.value!.active = !modal.value?.active);
</script>

<style scoped></style>
