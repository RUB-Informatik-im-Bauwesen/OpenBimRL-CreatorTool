<script lang="ts" setup>
import { ref } from 'vue';
import { DialogReturnValue } from '.';

interface Props {
    accept_button_class?: string;
    reject_button_class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    accept_button_class: 'bg-blue-600',
    reject_button_class: 'bg-red-600',
});

const dialog = ref<HTMLDialogElement | null>(null);

const open = () => {
    dialog.value?.showModal();
};

const returnValue = () => dialog.value?.returnValue as DialogReturnValue | undefined;

defineExpose({ open, returnValue });
</script>

<template>
    <dialog ref="dialog" class="-translate-y-full rounded border border-black p-12">
        <div>
            <span class="text-2xl">
                <slot name="title" />
            </span>
        </div>
        <hr class="my-4" />
        <div class="text-lg">
            <slot name="content" />
        </div>
        <form method="dialog" class="mt-4 flex justify-end gap-4">
            <button :class="reject_button_class" :value="DialogReturnValue.cancel">
                <span class="text-lg text-white">
                    <slot name="reject_button_text" />
                </span>
            </button>
            <button :class="accept_button_class" :value="DialogReturnValue.accept">
                <span class="text-lg text-white">
                    <slot name="accept_button_text" />
                </span>
            </button>
        </form>
    </dialog>
</template>

<style scoped>
form button {
    @apply rounded-sm px-3 py-[0.125rem];
}
</style>
