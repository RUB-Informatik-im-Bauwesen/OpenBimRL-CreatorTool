<template>
    <div class="grid w-full h-full dark:bg-default-dark p-5">
        <div style="grid-area: header" class="flex">
            <h1 class="text-2xl my-auto">Checks</h1>
        </div>
        <div style="grid-area: sidebar" class="p-2 mr-2 rounded-lg border select-none">
            <Tree ref="tree" :data="graph" @select="currentNode = $event" />
        </div>
        <div
            style="grid-area: main"
            class="relative overflow-hidden p-10 border rounded-lg bg-default-medium dark:bg-default-darkest dark:bg-opacity-50"
        >
            <div v-if="currentNode && tree">
                <p>
                    <span v-for="(id, index) in currentNode.path">
                        <span v-if="index != 0">&nbsp;/&nbsp;</span>
                        <!-- I've never seen more inefficient code... Well 'git blame Florian' -->
                        <button
                            @mouseenter="tree.nodeStateMap.get(id)!.state.hover = true"
                            @mouseleave="tree.nodeStateMap.get(id)!.state.hover = false"
                            @click="tree.selectNode(id)"
                        >
                            {{ tree.nodeStateMap.get(id)!.text }}
                        </button>
                    </span>
                </p>
                <hr class="border-default-dark" />
                <!-- check wheather it's a rule or ruleset -->
                <div v-if="currentNode.type === RuleOrRuleSetType.RULESET">
                    <RuleSetForm :rule-set="(currentNode.data as RuleSet)" />
                </div>
                <div v-else-if="currentNode.type === RuleOrRuleSetType.RULE">
                    <RuleForm :rule="(currentNode.data as Rule)" />
                </div>
                <div v-else-if="currentNode.data?.type === 'resultSet'">
                    <ResultSetForm
                        :result-set="(currentNode.data as ResultSet)"
                        :graph-nodes="graph.elements"
                        :sub-checks="graph.subChecks"
                    />
                </div>
                <div v-else-if="currentNode.data?.hasOwnProperty('name')">
                    <p class="my-1">
                        <span class="text-xl">Edit Name</span>
                    </p>
                    <InputField class="my-1" v-model="(currentNode.data as SubCheck).name">
                        <span>Name</span>
                    </InputField>
                </div>
                <div v-else><span class="text-2xl">Error! Could not get type!</span></div>
            </div>
            <div v-else><span class="text-xl">Select a node</span></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { graphInjectionKey } from '@/keys';
import { inject, ref } from 'vue';
import { InputField } from '..';
import type { GraphInject, ResultSet, Rule, RuleSet, SubCheck } from '../graph/Types';
import { RuleOrRuleSetType } from '../graph/enums';
import { ResultSetForm, RuleForm, RuleSetForm } from './forms';
import Tree from './tree';
import { ITree } from './tree/Tree';
import { TreeNode } from './tree/Types';
const { graph } = inject(graphInjectionKey) as GraphInject;

const tree = ref<ITree | null>(null);
const currentNode = ref<TreeNode | null>(null);
</script>
<style scoped>
div.grid {
    grid-template-areas:
        'header header'
        'sidebar main';

    grid-template-columns: 30rem 1fr;
    grid-template-rows: 4rem 1fr;
}
</style>
<style>
span.icon_parent {
    @apply !align-top;
}

i.expanded_icon {
    @apply mr-1 align-super;
}
</style>
