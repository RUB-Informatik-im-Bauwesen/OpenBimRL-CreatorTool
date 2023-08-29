<template>
    <Help
        :class="{ 'translate-x-full': !modals[Modal.Help] }"
        class="transition-transform"
        @close="toggleModal(Modal.Help)"
    />
    <GraphNodeMenu
        :class="{ 'translate-x-full': !modals[Modal.NodeLib] }"
        class="transition-transform text-default-dark dark:text-default-light"
    />
    <main class="grid h-screen text-default-dark dark:text-default-light">
        <TopNavigation
            style="grid-area: nav"
            @showHelp="toggleModal(Modal.Help)"
            @showNodeLib="toggleModal(Modal.NodeLib)"
        />
        <SideNavigation style="grid-area: side" />
        <RouterView style="grid-area: main" @click="closeAllModals()" />
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GraphNodeMenu, Help, SideNavigation, TopNavigation } from './components';

enum Modal {
    Help,
    NodeLib,
    SideOverlay,
}
const modals = ref<{ [key in Modal]?: boolean }>({});

modals.value[Modal.Help] = false;
modals.value[Modal.NodeLib] = false;

const toggleModal = (modalName: Modal) => {
    const oldState = modals.value[modalName];
    closeAllModals();

    modals.value[modalName] = !oldState;
    console.log(modals.value[modalName]);
};

const closeAllModals = () => {
    // this is cursed js/ts
    for (const [, index] of Object.entries(Modal)) modals.value[index as Modal] = false;
};
</script>

<style scoped>
main {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
        'side nav'
        'side main';
}
</style>
