<template>
    <div class="rule-form">
        <p>
            <span class="text-xl">Edit Rule</span>
        </p>
        <InputField v-model="rule.label">
            <span>Label</span>
        </InputField>
        <div class="flex gap-2">
            <div class="flex w-full rounded overflow-hidden border dark:border-default-medium">
                <label
                    class="p-2 text-sm cursor-text select-none bg-default-light border-r border-inherit dark:bg-default-dark"
                    for="rule-form-operator-select"
                >
                    <span>Quantifier</span>
                </label>
                <select
                    v-model="rule.quantifier"
                    class="w-full pl-1 bg-default-light dark:bg-default-dark focus-visible:outline-none"
                    id="rule-form-operator-select"
                >
                    <option v-for="(value, name) in RuleQuantifier" :value="value">
                        {{ name }}
                    </option>
                </select>
            </div>
            <div class="flex w-full rounded overflow-hidden border dark:border-default-medium">
                <label
                    class="p-2 text-sm cursor-text select-none bg-default-light border-r border-inherit dark:bg-default-dark"
                    for="rule-form-operator-select"
                >
                    <span>Operator</span>
                </label>
                <select
                    v-model="rule.operator"
                    class="w-full pl-1 bg-default-light dark:bg-default-dark focus-visible:outline-none"
                    id="rule-form-operator-select"
                >
                    <option v-for="(value, name) in RuleOperator" :value="value">{{ name }}</option>
                </select>
            </div>
        </div>

        <div class="flex gap-2">
            <InputField v-model="rule.operand1">
                <span>Operand&nbsp;1</span>
            </InputField>
            <InputField v-model="rule.operand2">
                <span>Operand&nbsp;2</span>
            </InputField>
        </div>
    </div>
</template>

<script setup lang="ts">
import InputField from '@/components/InputField.vue';
import { Rule } from '@/components/graph/Types';
import { RuleOperator, RuleQuantifier } from '@/components/graph/enums';

const props = defineProps<{ rule: Rule }>();
</script>

<style scoped>
div.rule-form > * {
    @apply my-1;
}
</style>
