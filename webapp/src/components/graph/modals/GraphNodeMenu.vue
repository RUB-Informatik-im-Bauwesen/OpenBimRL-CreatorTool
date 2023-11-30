<template>
    <aside
        class="fixed grid p-4 gap-4 h-full min-w-[25%] max-w-full right-0 bg-default-medium dark:bg-default-dark z-50 transition-transform"
        :style="`width: ${width}px`"
    >
        <button class="absolute border-2 h-full cursor-col-resize" @mousedown="mouseResizeStart" />
        <form>
            <InputField v-model="search" placeholder="ifc.get...">
                <span>Search</span>
                <template v-slot:icon>
                    <span class="relative">
                        <MagnifyingGlassIcon class="text-gray-400 w-6 absolute top-2 right-2" />
                    </span>
                </template>
            </InputField>
        </form>

        <div class="flex flex-col h-full max-w-full">
            <div class="p-2 flex gap-4 justify-center">
                <label class="hover:cursor-pointer" for="icon-list__switch">
                    <span>Icons</span>
                </label>
                <input
                    class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-ease-blue before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-200 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-success checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                    type="checkbox"
                    role="switch"
                    id="icon-list__switch"
                    v-model.value="showLibsAsList"
                />
                <label class="hover:cursor-pointer" for="icon-list__switch">
                    <span>List</span>
                </label>
            </div>
            <div class="flex">
                <ul class="border border-b-default-light rounded-t overflow-hidden">
                    <li
                        v-for="(libname, index) in loadedLibraries"
                        :key="index"
                        class="aria-selected:bg-default-light dark:aria-selected:bg-default-darkest p-2 border-r last:border-r-0"
                        :aria-selected="libname === currentSelection"
                    >
                        <button class="text-sm bg-transparent" @click="currentSelection = libname">
                            <span>{{ libname }}</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div
                class="bg-default-light dark:bg-default-dark border overflow-y-auto overflow-x-hidden h-full"
            >
                <div
                    v-for="(libname, index) in loadedLibraries"
                    :key="index"
                    class=""
                    v-show="libname === currentSelection"
                >
                    <GraphItemGroup
                        v-for="group in availableLibraries[libname]"
                        :search="search"
                        :key="group.id"
                        :group="group"
                        :show-as-list="showLibsAsList"
                    />
                </div>
            </div>
        </div>

        <hr />

        <div class="flex flex-col gap-4">
            <form class="flex gap-4 items-center">
                <div
                    class="bg-default-light dark:bg-default-dark w-full flex border rounded overflow-hidden"
                >
                    <label
                        for="lib-select"
                        class="inline-block bg-default-medium dark:bg-default-dark p-2 border-r"
                    >
                        <span>Library</span>
                    </label>
                    <select
                        id="lib-select"
                        class="bg-default-light dark:bg-default-dark pl-3 w-full"
                        v-model.value="currentSelection"
                    >
                        <option v-for="lib in Object.keys(availableLibraries)" v-text="lib" />
                    </select>
                </div>
                <button
                    type="button"
                    class="bg-success h-full aspect-square flex rounded justify-center items-center"
                    @click="createLibrary"
                >
                    <PlusIcon class="w-9" />
                </button>
            </form>

            <div
                class="border rounded hover:bg-opacity-70 bg-default-contrast dark:bg-default-dark dark:hover:bg-default-darkest"
            >
                <button class="w-full p-1" @click="handleUpload">
                    <span>Upload Library</span>
                </button>
                <input
                    id="uploadLibraryJSONAnchorElem"
                    class="hidden"
                    type="file"
                    @change="uploaderOnChange($event, 'json')"
                />
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { InputField } from '@/components';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import GraphItemGroup from './GraphItemGroup.vue';
import type { ImportedRuleSet, RuleSetElement } from './Types';

const width = ref(window.innerWidth / 4);

const updateListener = (e: MouseEvent) => {
    width.value = window.innerWidth - e.x;
    window.addEventListener('mouseup', mouseResizeStop);
};

const mouseResizeStart = () => {
    window.addEventListener('mousemove', updateListener);
};

const mouseResizeStop = () => {
    window.removeEventListener('mousemove', updateListener);
    window.removeEventListener('mouseup', mouseResizeStop);
};

const showLibsAsList = ref(false);

const importedLibraries: Record<string, ImportedRuleSet> = import.meta.glob(
    '@/assets/graph/libs/*.json',
    {
        eager: true,
    },
);

const availableLibraries: { [key: string]: Array<RuleSetElement> } = {};

for (const file in importedLibraries) {
    const baseName = file.split('/').pop()?.split('.')[0];
    if (!baseName) continue;
    availableLibraries[baseName] = importedLibraries[file].default;
}

const search = ref<string>('');
const loadedLibraries = Object.keys(availableLibraries);
const currentSelection = ref(loadedLibraries[0]);

const createLibrary = () => {
    loadedLibraries.push(currentSelection.value);
};

const handleUpload = () => {
    document.getElementById('uploadLibraryJSONAnchorElem')?.click();
};

const uploaderOnChange = (event: Event, filetype: string) => {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
        if (filetype !== 'json') return;

        let obj = JSON.parse((event.target?.result as string | null) || '{}');
        availableLibraries[file.name] = obj;
    };
    reader.readAsText(file);
};
</script>

<style scoped>
aside {
    grid-template-rows: auto 80% auto auto;
}

aside.grid > * {
    min-width: 0px;
}
</style>
