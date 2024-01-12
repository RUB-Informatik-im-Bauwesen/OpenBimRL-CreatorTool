<template>
    <nav
        class="main-nav bg-default-light border-b dark:border-b-0 dark:bg-default-dark dark:bg-opacity-90 pl-8 text-lg"
    >
        <ul class="flex">
            <li v-if="route.name == Routes.GRAPH">
                <NewGraph />
            </li>
            <li v-if="route.name == Routes.GRAPH">
                <Upload />
            </li>
            <li v-if="route.name == Routes.GRAPH">
                <Download />
            </li>
            <li v-if="route.name == Routes.GRAPH">
                <button class="nav-button" @click="$emit('showNodeLib')">Create Nodes</button>
            </li>
            <li v-if="route.name == Routes.GRAPH">
                <button class="nav-button">Create Group</button>
            </li>
            <li v-if="route.name == Routes.VIEWER">
                <AddModel />
            </li>
            <li>
                <button class="nav-button" @click="$emit('showApiConnection')">
                    Api-Connection
                </button>
            </li>
            <li>
                <button class="nav-button" @click="$emit('showHelp')">Help?</button>
            </li>
            <li class="ml-auto mr-4 flex">
                <div class="flex m-auto gap-4 justify-center">
                    <label class="hover:cursor-pointer" for="icon-list__switch">
                        <span>Light</span>
                    </label>
                    <input
                        class="m-auto h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-ease-blue before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-success checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                        type="checkbox"
                        role="switch"
                        id="icon-list__switch"
                        v-model="darkMode"
                    />
                    <label class="hover:cursor-pointer" for="icon-list__switch">
                        <span>Dark</span>
                    </label>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { darkModeKey } from '@/keys';
import { Routes, default as router } from '@/modules/router';
import { Ref, inject } from 'vue';
import { AddModel, Download, NewGraph, Upload } from './buttons';

defineEmits(['showNodeLib', 'showHelp', 'showApiConnection']);

const darkMode = inject(darkModeKey) as Ref<boolean>;
const route = router.currentRoute;
</script>

<style>
button.nav-button {
    @apply rounded !px-2 !py-1 hover:bg-default-medium dark:hover:bg-default-dark;
}

nav.main-nav > ul > li {
    @apply my-1;
}
</style>
