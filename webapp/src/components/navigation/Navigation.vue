<script setup lang="ts">
import { ref } from "vue";
import { Dropdown } from ".";
import { Dialog } from "../modals";

const uploadModalItems = {
    XML: () => console.log("XML"),
    JSON: () => console.log("JSON"),
};
const downloadModalItems = {
    XML: () => console.log("XML"),
    JSON: () => console.log("JSON"),
};

const dialog = ref<typeof Dialog | null>(null);
</script>

<template>
    <nav class="w-full fixed p-1 pl-8 bg-gray-300 text-white z-10">
        <ul class="flex gap-4 mt-1">
            <li>
                <button class="nav-button" @click.prevent="dialog?.open()">
                    New
                </button>
                <Dialog ref="dialog">
                    <template v-slot:title>Creating new Project</template>
                    <template v-slot:content>
                        <p>Are you sure to create a new project?</p>
                        <p>Unsaved changes will be lost.</p>
                    </template>
                    <template v-slot:accept_button_text>Go Back</template>
                    <template v-slot:reject_button_text>Continue</template>
                </Dialog>
            </li>
            <li>
                <div class="flex gap-1">
                    <Dropdown :modal-items="uploadModalItems">Upload</Dropdown>
                    <Dropdown :modal-items="downloadModalItems"
                        >Download</Dropdown
                    >
                </div>
            </li>
            <li>
                <button class="blue bg-blue-600 nav-button">
                    Create Nodes
                </button>
            </li>
            <li><button class="nav-button">Help?</button></li>
        </ul>
    </nav>
</template>

<style>
button.nav-button {
    @apply rounded-sm py-1 px-2;
}

button.nav-button:not(.blue) {
    @apply bg-gray-500;
}
</style>
