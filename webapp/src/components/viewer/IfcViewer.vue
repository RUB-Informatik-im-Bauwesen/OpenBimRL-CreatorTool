<template>
    <div
        ref="el"
        class="bg-default-light dark:bg-default-dark h-full w-full grid grid-flow-col grid-cols-7"
    >
        <div ref="viewerContainer" class="relative dark:text-default-darkest col-span-6">
            <div
                v-show="loading"
                class="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-20"
            >
                <VueSpinnerCore :color="darkMode ? '#000' : '#fff'" :size="80" />
            </div>
        </div>
        <div class="p-4 relative">
            <h4 class="text-xl">Models:</h4>
            <p v-for="[id, name] in models" class="text-ellipsis break-words overflow-hidden">
                <button @click="selected = id">
                    <strong v-if="selected === id">{{ name }}</strong>
                    <span v-else>{{ name }}</span>
                </button>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import darkMode from '@/modules/darkmode';
import { init, loading, models, selected, updateModels } from '@/modules/ifcViewer';
import { onMounted, ref } from 'vue';
import { VueSpinnerCore } from 'vue3-spinners';

const viewerContainer = ref<HTMLElement | null>(null);

onMounted(() => {
    if (!viewerContainer.value) return;
    init(viewerContainer.value);

    updateModels();
});
</script>

<style scoped></style>
