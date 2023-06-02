<template>
    <div class="border m-1 rounded relative">
        <div class="text-center m-1" :style="{ 'background-color': group.color }">
            <span>{{ group.name }}</span>
        </div>

        <div class="flex flex-wrap justify-center gap-2 p-2">
            <div :class="{ 'w-full': showAsList }" v-for="item in filterItems" :key="item.id">
                <!-- show as icons -->
                <Popper
                    v-if="!showAsList"
                    :hover="true"
                    :interactive="false"
                    :arrow="true"
                    :placement="'top'"
                >
                    <button
                        class="aspect-square flex justify-center items-center border border-black p-[6px] rounded bg-zinc-200 hover:bg-zinc-400"
                        @dragstart="onDragStart($event, item)"
                        draggable="true"
                    >
                        <ExclamationCircleIcon class="w-7" />
                    </button>
                    <template #content>
                        <div class="bg-white rounded border m-2" data-popover="up">
                            <p class="bg-slate-50 p-2">{{ item.data!.name }}</p>
                            <p class="p-2">{{ item.data!.description }}</p>
                        </div>
                    </template>
                </Popper>
                <!-- show as list -->
                <button
                    class="w-full flex"
                    v-else
                    @dragstart="onDragStart($event, item)"
                    draggable="true"
                >
                    <Cog8ToothIcon class="w-7" />
                    <span>{{ item.data?.name }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Cog8ToothIcon, ExclamationCircleIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
import Popper from 'vue3-popper';
import { Rule } from '../Types';

interface Props {
    group: Rule;
    search: string;
    showAsList?: boolean;
}

const props = defineProps<Props>();

const onDragStart = (event: DragEvent, node: any) => {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData('application/vueflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
};

const filterItems = computed(() =>
    props.group.items.filter(dataObj =>
        dataObj.data!.name.toLowerCase().includes(props.search.toLowerCase()),
    ),
);
</script>

<style scoped></style>
