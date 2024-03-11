<template>
    <VueFlow
        @connect="onConnect"
        @node-double-click="onNodeDoubleClick"
        @dragover.prevent="onDragOver"
        @drop="onDrop"
        class="bg-default-light dark:bg-default-dark"
    >
        <Background
            :variant="backgroundLines ? BackgroundVariant.Lines : BackgroundVariant.Dots"
            :pattern-color="
                darkMode
                    ? TWConf.theme.extend.colors.default.light
                    : TWConf.theme.extend.colors.default.dark
            "
            :line-width="0.25"
            :size="0.8"
        />
        <Controls>
            <ControlButton @click="backgroundLines = !backgroundLines">
                <TableCellsIcon class="bg-black" />
            </ControlButton>
        </Controls>
        <CustomMap />
        <Dialog ref="dialog" @close="">
            <template v-slot:title>Change Input</template>
            <template v-slot:content>
                <input
                    class="px-1 py-2 border border-black hover:border-blue-600 focus:border-transparent"
                    type="text"
                    v-if="nodes[selectedNode]"
                    v-model.value="nodes[selectedNode].data[nodeDataIndex]"
                />
            </template>
            <template v-slot:accept_button_text>Change Input</template>
            <template v-slot:reject_button_text>Revert</template>
        </Dialog>
    </VueFlow>
</template>

<script lang="ts" setup>
import { darkModeKey, graphInjectionKey } from '@/keys';
import { Background, BackgroundVariant } from '@vue-flow/background';
import { ControlButton, Controls } from '@vue-flow/controls';
import { Edge, GraphEdge, GraphNode, VueFlow, isEdge, isNode, useVueFlow } from '@vue-flow/core';
import { Ref, inject, nextTick, ref, watch } from 'vue';
import { Dialog } from '../modals';
import CustomMap from './CustomMap.vue';
import type { CustomNode, GraphInject } from './Types';
import { multiSelectKeys, nodeTypes } from './config';
import { ConnectEvent, DoubleClickEvent, DragOverEvent, DropEvent } from './graphEvents';
import { TableCellsIcon } from '@heroicons/vue/24/outline';

import TWConf from '@/../tailwind.config';

const dialog = ref<typeof Dialog | null>(null);
const selectedNode = ref<number>(0);
const nodeDataIndex = ref<string>('name');
const backgroundLines = ref<boolean>(true);

// injected from app level (main.ts)
const { graph, updateGraph, registerResetCallback } = inject(graphInjectionKey) as GraphInject;
const darkMode = inject(darkModeKey) as Ref<boolean>;

const { nodes, edges, addEdges, addNodes, project, vueFlowRef, removeEdges, removeNodes } =
    useVueFlow({
        maxZoom: 2,
        minZoom: 0.1,
        fitViewOnInit: true,
        edges: graph.value.elements.filter(e => isEdge(e)) as Array<Edge>,
        nodes: graph.value.elements.filter(e => isNode(e)) as Array<CustomNode>,
        nodeTypes: nodeTypes,
        multiSelectionKeyCode: multiSelectKeys,
    });

registerResetCallback(() => {
    const newNodes = graph.value.elements.filter(e => isNode(e)) as Array<GraphNode>,
        newEdges = graph.value.elements.filter(e => isEdge(e)) as Array<GraphEdge>;

    removeNodes(nodes.value);

    // this is necessary due to an issue where the elements are not removed properly when they have the same node ID
    nextTick(() => {
        addNodes(newNodes);
        addEdges(newEdges);
    });
});

watch([edges, nodes], ([newEdges, newNodes]) => updateGraph(newNodes, newEdges), { deep: true });

const onConnect = ConnectEvent(addEdges, removeEdges, edges);
const onNodeDoubleClick = DoubleClickEvent(nodes, selectedNode, nodeDataIndex, dialog);
const onDragOver = DragOverEvent();
const onDrop = DropEvent(vueFlowRef, project, addNodes);
</script>

<style>
/* import the required styles */
@import '@vue-flow/core/dist/style.css';

/* import the default theme (optional) */
@import '@vue-flow/core/dist/theme-default.css';

/* import control styles */
@import '@vue-flow/controls/dist/style.css';
</style>
