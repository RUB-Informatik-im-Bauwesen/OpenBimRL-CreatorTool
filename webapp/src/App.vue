<template>
    <Help
        :class="{ 'translate-x-full': !modals[Panels.Help] }"
        class="transition-transform"
        @close="toggleSidePanel(Panels.Help, false)"
    />
    <ApiConnection
        :class="{ 'translate-x-full': !modals[Panels.ApiConnection] }"
        class="transition-transform"
        @close="toggleSidePanel(Panels.ApiConnection, false)"
    />
    <GraphNodeMenu
        :class="{ 'translate-x-full': !modals[Panels.NodeLib] }"
        class="transition-transform text-default-dark dark:text-default-light"
    />
    <main class="grid h-screen text-default-dark dark:text-default-light">
        <TopNavigation
            style="grid-area: nav"
            @showHelp="toggleSidePanel(Panels.Help)"
            @showNodeLib="toggleSidePanel(Panels.NodeLib)"
            @showApiConnection="toggleSidePanel(Panels.ApiConnection)"
        />
        <SideNavigation style="grid-area: side" />
        <RouterView style="grid-area: main" @click="closeAllPanels()" />
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GraphNodeMenu, SideNavigation, TopNavigation } from './components';
import { ApiConnection, Help } from './components/side_panels';

enum Panels {
    Help,
    NodeLib,
    SideOverlay,
    ApiConnection,
}

const modals = ref<{ [key in Panels]?: boolean }>({});

modals.value[Panels.Help] = false;
modals.value[Panels.NodeLib] = false;
modals.value[Panels.ApiConnection] = false;

const toggleSidePanel = (panelName: Panels, state?: boolean) => {
    const oldState = modals.value[panelName];
    closeAllPanels();

    modals.value[panelName] = state ?? !oldState; // same as: `state !== undefined ? state : !oldState`
};

const closeAllPanels = () => {
    // this is cursed js/ts
    for (const [, index] of Object.entries(Panels)) modals.value[index as Panels] = false;
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
