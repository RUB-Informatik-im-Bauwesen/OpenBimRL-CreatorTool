<template>
    <div class="rule_set-form">
        <p><span class="text-xl"> Edit RuleSet </span></p>
        <InputField v-model="ruleSet.label">
            <span>Label</span>
        </InputField>

        <div class="flex w-full rounded overflow-hidden border dark:border-default-medium">
            <label
                class="p-2 text-sm cursor-text select-none bg-default-light border-r border-inherit dark:bg-default-dark"
                for="rule-form-operator-select"
            >
                <span>Operator</span>
            </label>
            <select
                v-model="ruleSet.operator"
                class="w-full pl-1 bg-default-light dark:bg-default-dark focus-visible:outline-none"
                id="rule-form-operator-select"
            >
                <option v-for="(value, name) in RuleSetOperator" :value="value">{{ name }}</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputField from '@/components/InputField.vue';
import { RuleSet } from '@/components/graph/Types';
import { RuleSetOperator } from '@/components/graph/enums';

const props = defineProps<{ ruleSet: RuleSet }>();
</script>

<style scoped>
div.rule_set-form > * {
    @apply my-1;
}
</style>
