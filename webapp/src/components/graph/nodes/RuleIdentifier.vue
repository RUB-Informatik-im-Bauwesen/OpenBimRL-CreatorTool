<template>
    <NodeBase :selected="selected">
        <div class="node-head bg-red-300 bg-opacity-60 px-2">
            <p class="heading text-center">
                <span>{{ data.name }}</span>
            </p>
        </div>
        <div class="node-body relative mt-4 min-h-[1.5rem]" :style="`height: ${minHeight}rem`">
            <p class="text-center">
                <span class="pr-2" style="display: ruby">{{ data.label }}</span>
            </p>
            <CustomHandle
                v-for="(input, index) in data.inputs"
                :id="input.index"
                type="target"
                :position="Position.Left"
                :style="calcTopOffsetStyle(index, data.inputs.length)"
            />
            <CustomHandle
                v-for="(output, index) in data.outputs"
                :id="output.index"
                type="source"
                :position="Position.Right"
                :style="calcTopOffsetStyle(index, data.outputs.length)"
            />
        </div>
    </NodeBase>
</template>

<script setup lang="ts">
import { NodeProps, Position } from '@vue-flow/core';
import { CustomHandle } from '.';
import { calcTopOffsetStyle, minHeight as heightFunction } from '..';
import type { RuleIdentifierNodeData } from '../Types';
import NodeBase from './NodeBase.vue';

const props = defineProps<NodeProps<RuleIdentifierNodeData>>();

const minHeight = heightFunction(props.data.inputs, props.data.outputs);
</script>

<style scoped></style>
