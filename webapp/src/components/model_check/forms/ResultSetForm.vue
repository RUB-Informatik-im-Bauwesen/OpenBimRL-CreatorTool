<template>
    <div class="result_set-form">
        <p><span class="text-xl"> Edit RuleSet </span></p>
        <InputField v-model="resultSet.name">
            <span>Name</span>
        </InputField>

        <div class="flex gap-2">
            <div class="flex w-full rounded overflow-hidden border dark:border-default-medium">
                <label
                    class="p-2 text-sm cursor-text select-none bg-default-light border-r border-inherit dark:bg-default-dark"
                    for="rule-form-operator-select"
                >
                    <span>Elements</span>
                </label>
                <select
                    v-model="resultSet.elements"
                    class="w-full pl-1 bg-default-light dark:bg-default-dark focus-visible:outline-none"
                    id="rule-form-operator-select"
                >
                    <option
                        v-for="value in graphNodes.filter(
                            element => element.type === 'ruleIdentifier',
                        )"
                        :value="value.data?.label"
                    >
                        {{ value.data?.label }}
                    </option>
                </select>
            </div>
            <div class="flex w-full rounded overflow-hidden border dark:border-default-medium">
                <label
                    class="p-2 text-sm cursor-text select-none bg-default-light border-r border-inherit dark:bg-default-dark"
                    for="rule-form-operator-select"
                >
                    <span>Filter</span>
                </label>
                <select
                    v-model="resultSet.filter"
                    class="w-full pl-1 bg-default-light dark:bg-default-dark focus-visible:outline-none"
                    id="rule-form-operator-select"
                >
                    <option v-for="value in filter" :value="value.label">{{ value.label }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputField from '@/components/InputField.vue';
import type {
    CustomNode,
    ResultSet,
    Rule,
    RuleSet,
    RulesOrRuleSets,
    SubChecks,
} from '@/components/graph/Types';
import { RuleOrRuleSetType } from '@/components/graph/enums';
import { Edge } from '@vue-flow/core';
import { computed } from 'vue';

const props = defineProps<{
    resultSet: ResultSet;
    subChecks: SubChecks;
    graphNodes: Array<CustomNode | Edge>;
}>();

const filter = computed((): Array<Rule> => {
    const returnArray: Array<Rule> = [];
    props.subChecks.forEach(element =>
        returnArray.push(...filterRecursive(element.rulesOrRuleSets)),
    );
    return returnArray;
});

const filterRecursive = (rulesOrRuleSets: RulesOrRuleSets): Array<Rule> => {
    const returnArray: Array<Rule> = [];
    rulesOrRuleSets.forEach(element => {
        switch (element.type) {
            case RuleOrRuleSetType.RULE:
                returnArray.push(element as Rule);
                break;

            case RuleOrRuleSetType.RULESET:
                returnArray.push(...filterRecursive((element as RuleSet).rulesOrRuleSets));
                break;
        }
    });

    return returnArray;
};
</script>

<style scoped>
div.result_set-form > * {
    @apply my-1;
}
</style>
