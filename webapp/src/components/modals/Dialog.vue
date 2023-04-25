<script lang="ts" setup>
import { ref } from "vue";

const dialog = ref<HTMLDialogElement | null>(null);

const open = () => {
    dialog.value?.showModal();
};

defineExpose({ open });
</script>

<template>
    <dialog ref="dialog" class="border border-black rounded p-12">
        <div>
            <span class="text-2xl"><slot name="title" /></span>
        </div>
        <hr class="my-4" />
        <div class="text-lg">
            <slot name="content" />
        </div>
        <form method="dialog" class="flex gap-4 justify-end mt-4">
            <button class="bg-blue-600 rounded-sm py-1 px-2 text-white" value="accepted">
                <slot name="accept_button_text" />
            </button>
            <button class="bg-red-600 rounded-sm py-1 px-2 text-white" value="cancel">
                <slot name="reject_button_text" />
            </button>
        </form>
    </dialog>
</template>
