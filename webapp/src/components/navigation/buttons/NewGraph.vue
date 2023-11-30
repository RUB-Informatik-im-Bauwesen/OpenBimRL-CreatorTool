<template>
    <button class="nav-button" @click.prevent="dialog?.open()">
        <span>New</span>
    </button>
    <Dialog
        ref="dialog"
        accept_button_class="bg-red-600"
        reject_button_class="bg-gray-500"
        @close="newGraph"
    >
        <template v-slot:title>Creating new Project</template>
        <template v-slot:content>
            <p>Are you sure to create a new project?</p>
            <p>Unsaved changes will be lost.</p>
        </template>
        <template v-slot:accept_button_text>Continue</template>
        <template v-slot:reject_button_text>Go Back</template>
    </Dialog>
</template>

<script setup lang="ts">
import { graphInjectionKey } from '@/keys';
import { inject, ref } from 'vue';
import { GraphInject } from '../../graph/Types';
import { Dialog, DialogReturnValue } from '../../modals';

const { resetGraph } = inject(graphInjectionKey) as GraphInject;

const dialog = ref<typeof Dialog | null>(null);

const newGraph = () => {
    const returnValue = dialog.value!.returnValue() as DialogReturnValue;
    if (returnValue == DialogReturnValue.cancel) return;
    // else
    resetGraph();
};
</script>

<style scoped></style>
