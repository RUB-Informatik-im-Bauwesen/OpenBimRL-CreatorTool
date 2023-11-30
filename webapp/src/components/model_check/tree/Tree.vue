<template>
    <div>
        <ul>
            <CategoryNode
                :data="data.subChecks"
                header="Sub Checks"
                :nodes="nodeStateMap"
                :open="true"
                @select="selectNode($event)"
                @add="
                    data.subChecks.push({
                        applicability: [],
                        label: createUniqueID(),
                        name: 'new Sub Check',
                        resultSets: [],
                        rulesOrRuleSets: [],
                    })
                "
            />
            <CategoryNode
                :data="data.resultSets"
                header="Result Sets"
                :nodes="nodeStateMap"
                :open="true"
                @select="selectNode($event)"
                @add="
                    data.resultSets.push({
                        elements: '',
                        filter: '',
                        label: createUniqueID(),
                        name: 'new Result Set',
                        type: 'resultSet',
                    })
                "
            />
        </ul>
    </div>
</template>

<script setup lang="ts">
import { createUniqueID } from '@/ParserOpenBIMRL';
import { GraphJSON } from '@/components/graph/Types';
import { reactive } from 'vue';
import CategoryNode from './CategoryNode.vue';
import { ITree } from './Tree';
import { TreeNode } from './Types';

const props = defineProps<{
    data: GraphJSON;
}>();

const emits = defineEmits<{
    (e: 'select', node: TreeNode | null): void;
}>();

const nodeStateMap = reactive(new Map<string, TreeNode>());

const deselectAll = () => {
    nodeStateMap.forEach(element => {
        element.state.selected = false;
    });
};

const selectNode = (nodeID?: string) => {
    deselectAll();
    if (!nodeID) {
        emits('select', null);
    } else {
        const node = nodeStateMap.get(nodeID);
        if (!node) throw new Error('Node not found');
        node.state.selected = true;
        emits('select', node);
    }
};

defineExpose<ITree>({ selectNode, deselectAll, nodeStateMap });
</script>

<style scoped></style>
