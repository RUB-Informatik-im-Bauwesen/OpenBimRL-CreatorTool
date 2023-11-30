import json from '@/assets/graph/defaultGraphExample.json';
import { Edge, GraphNode, NodeTypesObject } from '@vue-flow/core';
import { Ref, markRaw, ref } from 'vue';
import type { CustomNode, GraphInject, GraphJSON, GraphResetCallback } from './Types';
import { FunctionNode, InputType, RuleIdentifier } from './nodes';

export const multiSelectKeys = ['Shift', 'Control'];

export const nodeTypes = {
    functionType: markRaw(FunctionNode),
    inputType: markRaw(InputType),
    ruleIdentifier: markRaw(RuleIdentifier),
} as NodeTypesObject;

export function initialGraph(): GraphInject {
    const graph: Ref<GraphJSON> = ref<GraphJSON>(json as GraphJSON);

    const updateGraph = (nodes: Array<CustomNode>, edges: Array<Edge>) => {
        graph.value.elements = [...nodes, ...edges];
    };

    const graphResetCallbacks = Array<GraphResetCallback>();

    const registerResetCallback = (callback: GraphResetCallback) =>
        graphResetCallbacks.push(callback);

    const resetGraph = (toGraph: GraphJSON = { elements: [], resultSets: [], subChecks: [] }) => {
        graph.value = toGraph;
        graphResetCallbacks.forEach(cb => cb());
    };

    return { graph, updateGraph, registerResetCallback, resetGraph };
}

export function getMinimapNodeColor(node: GraphNode): string {
    switch (node.type) {
        case 'functionType':
            return 'cyan';
        case 'inputType':
            return 'khaki';
        case 'ruleIdentifier':
            return 'lightCoral';
        default:
            return '#aaa';
    }
}
