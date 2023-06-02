<template>
    <NodeBase :selected="selected">
        <div class="node-head bg-yellow-100 bg-opacity-60 px-2">
            <p class="heading text-center">
                <span>{{ data.name }}</span>
            </p>
        </div>
        <div class="node-body relative mt-4 min-h-[1.5rem]" :style="`height: ${minHeight}rem`">
            <p class="text-center" :class="{ 'text-blue-600': hovering }">
                <span>{{ data.label }}</span>
            </p>
            <CustomHandle
                v-for="(output, index) in data.outputs"
                :id="output.index"
                @mouseenter="hovering = true"
                @mouseleave="hovering = false"
                type="source"
                :position="Position.Right"
                :style="calcTopOffsetStyle(index, data.outputs.length)"
            />
        </div>
    </NodeBase>
</template>

<script setup lang="ts">
import { NodeEventsOn, NodeProps, Position } from '@vue-flow/core';
import { ref } from 'vue';
import { CustomHandle } from '.';
import { calcTopOffsetStyle, minHeight as heightFunction } from '..';
import type { InputNodeData } from '../Types';
import NodeBase from './NodeBase.vue';

const props = defineProps<NodeProps<InputNodeData, NodeEventsOn>>();
const hovering = ref(false);

// theoretically are the inputs defined but I'd rather not include them - safety first
const minHeight = heightFunction([], props.data.outputs);
</script>

<style scoped></style>
