<template>
  <div
    class="border border-black rounded min-w-[12rem] bg-white"
    :style="`width: ${minWidth}rem`"
  >
    <div class="node-head px-2 bg-cyan-100 bg-opacity-60">
      <p class="heading text-center">
        <span>({{ data.name }})</span>
      </p>
      <p class="text-center">
        <span>{{ data.label }}</span>
      </p>
    </div>
    <div
      class="node-body mt-4 relative min-h-[1.5rem]"
      :style="`height: ${minHeight}rem`"
    >
      <Handle
        v-for="(input, index) in data.inputs"
        :id="input.index"
        type="target"
        class="flex items-center"
        :position="Position.Left"
        :style="calcTopOffsetStyle(index, data.inputs.length)"
      >
        <span class="pl-2" style="display: ruby">{{ input.name }}</span>
      </Handle>
      <Handle
        v-for="(output, index) in data.outputs"
        :id="output.index"
        type="source"
        :position="Position.Right"
        class="flex items-center justify-end"
        :style="calcTopOffsetStyle(index, data.outputs.length)"
      >
        <span class="pr-2" style="display: ruby">{{ output.name }}</span>
      </Handle>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NodeProps, Handle, Position } from "@vue-flow/core";
import type { FunctionNodeData } from "./Types";
import { calcTopOffsetStyle, minHeight as heightFunction } from ".";

const props = defineProps<NodeProps<FunctionNodeData>>();

const minHeight = heightFunction(props.data.inputs, props.data.outputs) + 1;

const minWidth =
  (Math.max(
    ...props.data.inputs.map<number>((element) => element.name.length)
  ) +
    Math.max(
      ...props.data.outputs.map<number>((element) => element.name.length)
    )) /
  1.5;
</script>

<style scoped></style>
