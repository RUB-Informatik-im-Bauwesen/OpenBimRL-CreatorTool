<template>
    <li v-if="node">
        <!-- Expand Arrow -->
        <p @click="node.state.expanded = !node.state.expanded">
            <button class="w-4">
                <component
                    v-show="data.length"
                    :is="node.state.expanded ? BarsArrowUpIcon : BarsArrowDownIcon"
                    class="inline-block"
                />
            </button>
            <span
                :class="{
                    hover: node.state.hover,
                    'text-default-contrast': node.state.selected,
                }"
            >
                {{ header }}
            </span>
            <button
                v-show="node.addable"
                @click.stop="
                    $emit('add');
                    node.state.expanded = true;
                "
            >
                <FolderPlusIcon class="inline-block w-4" />
            </button>
        </p>
        <TreeNode
            v-show="node.state.expanded"
            v-bind="{ nodes: nodes, data, parent: node }"
            @select="$emit('select', $event)"
            class="ml-4"
        />
    </li>
</template>

<script setup lang="ts">
import { createUniqueID } from '@/ParserOpenBIMRL';
import { ResultSets, RulesOrRuleSets, SubChecks } from '@/components/graph/Types';
import { BarsArrowDownIcon, BarsArrowUpIcon, FolderPlusIcon } from '@heroicons/vue/24/solid';
import { computed, reactive, watchEffect } from 'vue';
import TreeNode from './TreeNode.vue';
import { TreeNode as TreeNodeType } from './Types';

const props = defineProps<{
    nodes: Map<string, TreeNodeType>;
    data: RulesOrRuleSets | SubChecks | ResultSets;
    parent?: TreeNodeType;
    header: string;
    open?: boolean;
}>();

const id = `${props.header}_${createUniqueID()}`;

props.nodes.set(id, {
    addable: true,
    id,
    text: props.header,
    nodes: reactive(new Array<string>()),
    path: [...(props.parent?.path || []), id],
    selectable: false,
    type: 'CATEGORY',
    state: {
        expanded: props.open || false,
        hover: false,
        selected: false,
    },
} as TreeNodeType);

watchEffect(() => props.parent?.nodes.push(id));

const node = computed(() => props.nodes.get(id));

const emits = defineEmits<{
    (e: 'select', node: string): void;
    (e: 'add'): void;
}>();
</script>

<style scoped>
.hover {
    @apply text-default-contrast text-opacity-60;
}

p > * {
    @apply hover:text-default-contrast hover:text-opacity-60;
}

p > button {
    @apply mx-1;
}
</style>
