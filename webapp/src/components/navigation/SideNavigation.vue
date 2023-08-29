<template>
    <nav
        class="bg-default-medium dark:bg-default-darkest dark:bg-opacity-90 transition-all"
        :class="{ 'max-w-[4rem]': !open, 'max-w-full': open }"
    >
        <ul class="flex flex-col h-full">
            <li class="mt-16">
                <button
                    @click="open = !open"
                    class="p-2 flex w-full h-full hover:bg-neutral-400 dark:bg-default-darkest dark:bg-opacity-0 dark:hover:bg-opacity-100"
                >
                    <Bars3Icon />
                </button>
            </li>
            <li>
                <RouterLink
                    to="/"
                    id="router-link-graph"
                    title="Graph"
                    class="hover:bg-neutral-400 dark:bg-default-darkest dark:bg-opacity-0 dark:hover:bg-opacity-100"
                >
                    <CubeTransparentIcon />
                    <label v-show="open" for="router-link-graph"><span>Graph</span></label>
                </RouterLink>
            </li>
            <li>
                <RouterLink
                    to="/checks"
                    id="router-link-checks"
                    title="Sub Checks"
                    class="hover:bg-neutral-400 dark:bg-default-darkest dark:bg-opacity-0 dark:hover:bg-opacity-100"
                >
                    <ShieldCheckIcon />
                    <label v-show="open" for="router-link-checks"><span>Sub Checks</span></label>
                </RouterLink>
            </li>
            <li>
                <RouterLink
                    to="/viewer"
                    id="router-link-viewer"
                    title="View Model"
                    class="hover:bg-neutral-400 dark:bg-default-darkest dark:bg-opacity-0 dark:hover:bg-opacity-100"
                >
                    <HomeModernIcon />
                    <label v-show="open" for="router-link-viewer"><span>Model Viewer</span></label>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { HomeModernIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline';
import { Bars3Icon, CubeTransparentIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

const open = ref(false);
</script>

<style scoped>
li > a {
    @apply flex h-full w-full p-2;
}

li > a > label {
    @apply mx-4 my-auto inline-block select-none text-xl;
}

li > a > svg {
    @apply inline-block w-12;
}

li > button > svg {
    @apply inline-block w-12;
}
</style>
