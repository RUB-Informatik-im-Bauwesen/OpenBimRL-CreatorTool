<!-- Flowchart.vue -->
<script lang="ts" setup>
import { VueFlow } from "@vue-flow/core";
import { nodeTypes } from "./graph";
import { Background, BackgroundVariant } from "@vue-flow/background";
import { ref } from "vue";

import json from "../assets/defaultGraphExample.json";

const elements = ref<Array<any>>(json.elements);
//     {
//         id: "1",
//         label: "node 1",
//         position: { x: 100, y: 100 },
//     },
//     {
//         id: "2",
//         label: "node 2",
//         position: { x: 100, y: 200 },
//     },
//     {
//         id: "e1-2",
//         target: "2",
//         source: "1",
//     },
// ]);
</script>

<template>
  <VueFlow :node-types="nodeTypes" v-model="elements">
    <Background
      :variant="BackgroundVariant.Lines"
      :pattern-color="'#efefef'"
      :size="0.8"
    />
  </VueFlow>
</template>
