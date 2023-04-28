import { markRaw } from "vue";
import FunctionNodeVue from "./FunctionNode.vue";
import InputType from "./InputType.vue";
import RuleIdentifier from "./RuleIdentifier.vue";
import type { NodeTypesObject } from "@vue-flow/core";

export const nodeTypes = {
    functionType: markRaw(FunctionNodeVue),
    inputType: markRaw(InputType),
    ruleIdentifier: markRaw(RuleIdentifier),
} as NodeTypesObject;

export const calcTopOffsetStyle = (index: number, len: number) => ({
    top: len > 1 ? ((index / len) * 100).toString() + "%" : "50%",
});

export const minHeight = (
    inputs: Array<unknown> = [],
    outputs: Array<unknown> = [] // here it doesn't matter which types are used cause it only needs the length
) => Math.max(inputs.length, outputs.length);
