import json from '@/assets/graph/defaultGraphExample.json';
import { Edge, NodeTypesObject } from '@vue-flow/core';
import { markRaw, Ref, ref } from 'vue';
import { FunctionNode, InputType, RuleIdentifier } from './nodes';
import type { CustomNode, GraphJSON } from './Types';

export const multiSelectKeys = ['Shift', 'Control'];

export const nodeTypes = {
    functionType: markRaw(FunctionNode),
    inputType: markRaw(InputType),
    ruleIdentifier: markRaw(RuleIdentifier),
} as NodeTypesObject;

export function initialGraph() {
    const graph: Ref<GraphJSON> = ref<GraphJSON>(json as GraphJSON);

    const updateGraph = (nodes: Array<CustomNode>, edges: Array<Edge>) => {
        graph.value.elements = [...nodes, ...edges];
    };

    return { graph, updateGraph };
}
