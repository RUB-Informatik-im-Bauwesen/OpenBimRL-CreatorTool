import { createUniqueID } from '@/ParserOpenBIMRL';
import {
    AddEdges,
    AddNodes,
    Connection,
    Edge,
    GraphEdge,
    GraphNode,
    isNode,
    Node,
    NodeMouseEvent,
    Project,
    RemoveEdges,
} from '@vue-flow/core';
import type { Ref } from 'vue';
import { Dialog } from '../modals';
import { CustomNode } from './Types';

export function ConnectEvent(
    addEdges: AddEdges,
    removeEdges: RemoveEdges,
    edges: Ref<Array<GraphEdge>>,
): (connection: Connection) => void {
    return connection => {
        const edge = connection as Edge;
        edge.style = {
            strokeWidth: 4,
        };

        if (
            !connection.source ||
            !connection.sourceHandle ||
            !connection.target ||
            !connection.targetHandle
        )
            return;

        const existingConnection = edges.value.find(element => element.target == edge.target);

        if (existingConnection) removeEdges([existingConnection]);

        addEdges([edge]);
    };
}

export function DoubleClickEvent(
    nodes: Ref<Array<GraphNode<any, any, string>>>,
    selectedNode: Ref<number>,
    nodeDataIndex: Ref<string>,
    dialog: Ref<typeof Dialog | null>,
): (event: NodeMouseEvent) => void {
    return event => {
        selectedNode.value = nodes.value.findIndex(
            (element: GraphNode) => element.id == event.node.id,
        );

        switch (event.node.type) {
            case 'inputType':
            case 'ruleIdentifier':
            default:
                nodeDataIndex.value = 'label';
                break;
        }

        dialog.value?.open();
    };
}

export function DragOverEvent(): (event: DragEvent) => void {
    return event => {
        if (!event.dataTransfer) return;
        event.dataTransfer.dropEffect = 'move';
    };
}

export function DropEvent(
    vueFlowRef: Ref<HTMLDivElement | null>,
    project: Project,
    addNodes: AddNodes,
): (event: DragEvent) => void {
    return event => {
        if (!event.dataTransfer) return;
        const nodeInfo = JSON.parse(
            event.dataTransfer.getData('application/vueflow'),
        ) as Node<CustomNode>;

        // should never be false. Just there to make typescript happy
        if (!vueFlowRef.value) return;

        nodeInfo.id = createUniqueID();

        // calculate new position
        const { left, top } = vueFlowRef.value.getBoundingClientRect();
        nodeInfo.position = project({
            x: event.clientX - left,
            y: event.clientY - top,
        });

        // just a check if the node is a valid node
        if (!isNode(nodeInfo)) return;

        addNodes([nodeInfo]);
    };
}
