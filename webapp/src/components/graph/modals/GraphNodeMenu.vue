<template>
    <aside class="fixed grid p-4 gap-4 h-full w-1/5 right-0 bg-slate-50 z-50 transition-transform">
        <form>
            <div class="border rounded overflow-hidden flex">
                <label for="search-lib" class="p-2 text-sm cursor-text bg-slate-100 border-r">
                    <span>Search</span>
                </label>
                <input id="search-lib" class="w-full pl-1" v-model="search" />
                <span class="relative">
                    <MagnifyingGlassIcon class="text-gray-400 w-6 absolute top-2 right-2" />
                </span>
            </div>
        </form>

        <div class="flex flex-col h-full">
            <div class="flex">
                <ul class="border border-b-white rounded-t overflow-hidden">
                    <li
                        v-for="(libname, index) in loadedLibraries"
                        :key="index"
                        class="aria-selected:bg-white p-2 border-r last:border-r-0"
                        :aria-selected="libname === currentSelection"
                    >
                        <button class="text-sm" @click="currentSelection = libname">
                            <span>{{ libname }}</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="bg-white border overflow-y-auto overflow-x-hidden h-full">
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
                    />
                </div>
            </div>
        </div>

        <hr />

        <div class="flex flex-col gap-4">
            <form class="flex gap-4 items-center">
                <div class="bg-white w-full flex border rounded overflow-hidden">
                    <label for="lib-select" class="inline-block bg-slate-100 p-2 border-r">
                        <span>Library</span>
                    </label>
                    <select
                        id="lib-select"
                        class="bg-white pl-3 w-full"
                        v-model.value="currentSelection"
                    >
                        <option v-for="lib in Object.keys(availableLibraries)" v-text="lib" />
                    </select>
                </div>
                <button
                    type="button"
                    class="bg-green-500 h-full aspect-square flex rounded justify-center items-center text-white"
                    @click="createLibrary"
                >
                    <PlusIcon class="w-9" />
                </button>
            </form>

            <div class="border rounded bg-gray-600">
                <button class="w-full text-white p-1" @click="handleUpload">
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
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import type { RuleSet } from '../Types';
import GraphItemGroup from './GraphItemGroup.vue';

interface ImportedRuleSet {
    default: RuleSet;
}

const importedLibraries: Record<string, ImportedRuleSet> = import.meta.glob(
    '@/assets/graph/libs/*.json',
    {
        eager: true,
    },
);

const availableLibraries: { [key: string]: RuleSet } = {};

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
</style>
