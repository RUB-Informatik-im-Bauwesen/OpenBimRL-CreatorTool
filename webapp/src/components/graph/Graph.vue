<!-- Flowchart.vue -->
<script lang="ts" setup>
import { graphInjectionKey } from '@/keys';
import { Background, BackgroundVariant } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { Edge, isEdge, isNode, useVueFlow, VueFlow } from '@vue-flow/core';
import { inject, ref, watch } from 'vue';
import { Dialog } from '../modals';
import { multiSelectKeys, nodeTypes } from './config';
import { ConnectEvent, DoubleClickEvent, DragOverEvent, DropEvent } from './graphEvents';
import type { CustomNode, GraphInject } from './Types';

const dialog = ref<typeof Dialog | null>(null);
const selectedNode = ref<number>(0);
const nodeDataIndex = ref<string>('name');

// injected from app level (main.ts)
const { graph, updateGraph } = inject(graphInjectionKey) as GraphInject;

const { nodes, edges, addEdges, addNodes, project, vueFlowRef, removeEdges } = useVueFlow({
    edges: graph.value.elements.filter(e => isEdge(e)) as Array<Edge>,
    nodes: graph.value.elements.filter(e => isNode(e)) as Array<CustomNode>,
    nodeTypes: nodeTypes,
    multiSelectionKeyCode: multiSelectKeys,
});

watch([edges, nodes], ([newEdges, newNodes]) => updateGraph(newNodes, newEdges), { deep: true });

const onConnect = ConnectEvent(addEdges, removeEdges, edges);
const onNodeDoubleClick = DoubleClickEvent(nodes, selectedNode, nodeDataIndex, dialog);
const onDragOver = DragOverEvent();
const onDrop = DropEvent(vueFlowRef, project, addNodes);
</script>

<template>
    <VueFlow
        @connect="onConnect"
        @node-double-click="onNodeDoubleClick"
        @dragover.prevent="onDragOver"
        @drop="onDrop"
    >
        <Background :variant="BackgroundVariant.Lines" :pattern-color="'#efefef'" :size="0.8" />
        <Controls />
        <Dialog ref="dialog" @close="">
            <template v-slot:title>Change Input</template>
            <template v-slot:content>
                <input
                    class="px-1 py-2 border border-black hover:border-blue-600 focus:border-transparent"
                    type="text"
                    v-model.value="nodes[selectedNode].data[nodeDataIndex]"
                />
            </template>
            <template v-slot:accept_button_text>Change Input</template>
            <template v-slot:reject_button_text>Revert</template>
        </Dialog>
    </VueFlow>
</template>
