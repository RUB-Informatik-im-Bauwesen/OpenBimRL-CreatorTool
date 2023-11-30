<template>
    <div class="border m-1 rounded relative">
        <div
            class="text-center m-1 dark:text-default-darkest dark:mix-blend-hard-light"
            :style="{ 'background-color': group.color }"
        >
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
                        class="aspect-square flex justify-center items-center border border-default-darkest p-[6px] rounded bg-default-medium hover:bg-opacity-70 hover:opacity-70 dark:bg-default-darkest"
                        @dragstart="onDragStart($event, item)"
                        draggable="true"
                    >
                        <ExclamationCircleIcon class="w-7 text-secondary" />
                    </button>
                    <template #content>
                        <div
                            class="bg-default-light dark:bg-default-dark rounded border m-2"
                            data-popover="up"
                        >
                            <p class="bg-default-light dark:bg-default-dark p-2">
                                {{ item.data!.name }}
                            </p>
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
import { RuleSetElement } from './Types';

interface Props {
    group: RuleSetElement;
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
