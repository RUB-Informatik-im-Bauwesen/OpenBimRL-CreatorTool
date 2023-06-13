<template>
    <NodeBase :selected="selected" :min-width="minWidth">
        <div class="node-head bg-cyan-100 bg-opacity-60 px-2 rounded-t">
            <p class="heading p-2 text-center">
                <span>{{ data.name }}</span>
            </p>
        </div>
        <div class="node-body relative mt-4 min-h-[1.5rem]" :style="`height: ${minHeight}rem`">
            <CustomHandle
                v-for="(input, index) in data.inputs"
                :id="input.index"
                type="target"
                :position="Position.Left"
                :style="calcTopOffsetStyle(index, data.inputs.length)"
            >
                {{ input.name }}
            </CustomHandle>
            <CustomHandle
                v-for="(output, index) in data.outputs"
                :id="output.index"
                type="source"
                :position="Position.Right"
                :style="calcTopOffsetStyle(index, data.outputs.length)"
            >
                {{ output.name }}
            </CustomHandle>
        </div>
    </NodeBase>
</template>

<script setup lang="ts">
import { NodeProps, Position } from '@vue-flow/core';
import { CustomHandle } from '.';
import { calcTopOffsetStyle, minHeight as heightFunction } from '..';
import type { FunctionNodeData } from '../Types';
import NodeBase from './NodeBase.vue';

const props = defineProps<NodeProps<FunctionNodeData>>();

const minHeight = heightFunction(props.data.inputs, props.data.outputs) + 1;

const minWidth =
    (Math.max(...props.data.inputs.map<number>(element => element.name.length)) +
        Math.max(...props.data.outputs.map<number>(element => element.name.length))) /
    1.45;
</script>

<style scoped></style>
