<script setup lang="ts">
import { graphInjectionKey } from '@/keys';
import Parser from '@/ParserOpenBIMRL';
import { inject, Ref, ref } from 'vue';
import { DropdownButton } from '.';
import type { GraphInject } from '../graph/Types';
import { Dialog } from '../modals';
import { DropdownProps } from './Types';

const { graph } = inject(graphInjectionKey) as GraphInject;

const downloadFile = (filedata: string, filename: string) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filedata));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

const uploadModalItems: DropdownProps = {
    XML: () => console.log('XML'),
    JSON: () => console.log('JSON'),
};
const downloadModalItems: Ref<DropdownProps> = ref({
    XML: () =>
        downloadFile(
            new Parser().build(
                graph.value.elements,
                graph.value.subChecks,
                graph.value.resultSets,
                'graph.xml',
            ),
            'graph.xml',
        ),
    JSON: () => downloadFile(JSON.stringify(graph.value), 'graph.json'),
});

const dialog = ref<typeof Dialog | null>(null);
</script>

<template>
    <nav class="fixed z-10 w-full bg-gray-300 py-2 pl-8 text-white">
        <ul class="mt-1 flex gap-3">
            <li>
                <button class="nav-button" @click.prevent="dialog?.open()">
                    <span>New</span>
                </button>
                <Dialog
                    ref="dialog"
                    accept_button_class="bg-red-600"
                    reject_button_class="bg-gray-500"
                    @close=""
                >
                    <template v-slot:title>Creating new Project</template>
                    <template v-slot:content>
                        <p>Are you sure to create a new project?</p>
                        <p>Unsaved changes will be lost.</p>
                    </template>
                    <template v-slot:accept_button_text>Continue</template>
                    <template v-slot:reject_button_text>Go Back</template>
                </Dialog>
            </li>
            <li>
                <div class="flex gap-1">
                    <DropdownButton :modal-items="uploadModalItems">
                        <span>Upload</span>
                    </DropdownButton>
                    <DropdownButton :modal-items="downloadModalItems">
                        <span>Download</span>
                    </DropdownButton>
                </div>
            </li>
            <li>
                <button class="colored nav-button bg-blue-600" @click="$emit('showNodeLib')">
                    Create Nodes
                </button>
            </li>
            <li>
                <button class="colored nav-button bg-red-600">Create Group</button>
            </li>
            <li>
                <button class="nav-button" @click="$emit('showHelp')">Help?</button>
            </li>
        </ul>
    </nav>
</template>

<style>
button.nav-button {
    @apply rounded px-2 py-1 text-lg;
}

button.nav-button:not(.colored) {
    @apply bg-gray-500;
}
</style>
