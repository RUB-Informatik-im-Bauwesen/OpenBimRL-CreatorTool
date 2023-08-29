<template>
    <ul>
        <li v-for="(node, index) in elements">
            <!-- Expand Arrow -->
            <p>
                <button @click="toggleExpanded(node)" class="w-4">
                    <component
                        v-show="node.nodes.length"
                        :is="node.state.expanded ? BarsArrowUpIcon : BarsArrowDownIcon"
                        class="inline-block"
                    />
                </button>
                <span
                    :class="{
                        hover: node.state.hover,
                        'text-default-contrast': node.state.selected,
                    }"
                    @dblclick="toggleExpanded(node)"
                    @click="if (node.selectable) $emit('select', node.id);"
                >
                    {{ node.text }}
                </span>
                <button v-show="node.addable" @click="addToNode(index)">
                    <FolderPlusIcon class="inline-block w-4" />
                </button>
                <button @click="data.splice(index, 1)">
                    <TrashIcon class="inline-block w-4" />
                </button>
            </p>
            <div v-if="isSubCheck(data[index])">
                <CategoryNode
                    v-show="node.state.expanded"
                    v-bind="{ nodes: nodes, data: (data[index] as SubCheck).applicability, parent: node, header: 'Applicability' }"
                    @select="$emit('select', $event)"
                    @add="(data[index] as SubCheck).applicability.push(getDefaultRule())"
                    class="ml-4"
                />
                <CategoryNode
                    v-show="node.state.expanded"
                    v-bind="{ nodes: nodes, data: (data[index] as SubCheck).rulesOrRuleSets, parent: node, header: 'Rules and Rule Sets' }"
                    @select="$emit('select', $event)"
                    @add="(data[index] as SubCheck).rulesOrRuleSets.push(getDefaultRule())"
                    class="ml-4"
                />
            </div>
            <TreeNode
                v-else-if="node.type === RuleOrRuleSetType.RULESET"
                v-show="node.state.expanded"
                v-bind="{ nodes: nodes, data: (data[index] as RuleSet).rulesOrRuleSets, parent: node }"
                @select="$emit('select', $event)"
                class="ml-4"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
import { createUniqueID } from '@/ParserOpenBIMRL';
import { Rule, RuleSet, SubCheck } from '@/components/graph/Types';
import {
    RuleOperator,
    RuleOrRuleSetType,
    RuleQuantifier,
    RuleSetOperator,
} from '@/components/graph/enums';
import {
    BarsArrowDownIcon,
    BarsArrowUpIcon,
    FolderPlusIcon,
    TrashIcon,
} from '@heroicons/vue/24/solid';
import { computed, onUnmounted, reactive, ref } from 'vue';
import { Node, NodeTypes, classifyNode, isRule, isRuleSet, isSubCheck } from '../utils';
import CategoryNode from './CategoryNode.vue';
import { TreeNodeState, TreeNode as TreeNodeType } from './Types';

const props = defineProps<{
    nodes: Map<string, TreeNodeType>;
    data: Array<Node>;
    parent?: TreeNodeType;
}>();

const states = ref(new Array<TreeNodeState>());

const toggleExpanded = (node: TreeNodeType) => {
    node.state.expanded = !node.state.expanded;
    if (node.state.expanded) return;
    emits('select', node.id);
};

const getDefaultRule = () =>
    structuredClone({
        label: 'new Rule',
        operand1: '',
        operand2: '',
        operator: RuleOperator.EQUALS,
        quantifier: RuleQuantifier.EXISTS,
        type: RuleOrRuleSetType.RULE,
    } as Rule);

const addToNode = (at: number) => {
    //(props.data[at] as RuleSet).rulesOrRuleSets.push(getDefaultRule());
    const item = props.data[at];
    if (isRuleSet(item)) {
        item.rulesOrRuleSets.push(getDefaultRule());
    } else if (isRule(item)) {
        props.data[at] = {
            label: 'new Rule Set',
            operator: RuleSetOperator.OR,
            rulesOrRuleSets: [item],
            type: RuleOrRuleSetType.RULESET,
        } as RuleSet;
    }
};

const elements = computed(() =>
    props.data.map((element, index) => {
        const type = classifyNode(element);
        const id = `${type}_${createUniqueID()}`;

        props.parent?.nodes.push(id);

        const state =
            states.value[index] ||
            reactive({
                expanded: false,
                hover: false,
                selected: false,
            });

        states.value[index] = state;

        const node = {
            addable: [
                RuleOrRuleSetType.RULESET,
                NodeTypes.SUB_CHECK,
                RuleOrRuleSetType.RULE,
            ].includes(type),
            id,
            nodes: reactive(new Array<string>()),
            path: [...(props.parent?.path || []), id],
            selectable: true,
            state,
            text: (element as any).name || element.label || type,
            data: element,
            type,
        } as TreeNodeType;

        props.nodes.set(id, node);

        return node;
    }),
);

onUnmounted(() => elements.value.forEach(element => props.nodes.delete(element.id)));

const emits = defineEmits<{
    (e: 'select', node: string): void;
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
