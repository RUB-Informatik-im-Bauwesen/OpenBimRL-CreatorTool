<template>
    <aside
        class="fixed right-0 top-0 z-50 flex flex-col h-full w-1/4 bg-default-medium bg-opacity-90 dark:text-default-medium dark:bg-opacity-95 dark:bg-default-dark px-3 py-2"
    >
        <div class="flex justify-between">
            <button class="bg-transparent" @click="$emit('close')">
                <XMarkIcon class="inline h-8 w-8" />
            </button>
            <h3 class="text-3xl"><strong>API Connection</strong></h3>
        </div>
        <div class="ml-4">
            <h4 class="text-2xl mb-1">API Settings</h4>
            <InputField
                type="url"
                v-model="tempApiUrl"
                :valid="urlValid"
                invalid-message="Not a valid URL"
            >
                <span>Endpoint</span>
            </InputField>
            <br />

            <button
                class="w-full p-1 border rounded hover:bg-opacity-70 bg-default-contrast dark:bg-default-dark dark:hover:bg-default-darkest disabled:bg-opacity-30"
                @click="testConnection"
                v-bind="{ disabled: connectionLoading || !urlValid }"
            >
                <span v-if="!connectionLoading">Connect</span>
                <VueSpinnerRadio v-else class="inline-block" />
            </button>

            <p>
                <span>connection status:&nbsp;</span>
                <strong :class="statusTextColor">{{ connectionStatusText }}</strong>
            </p>

            <br />
            <div v-show="connected">
                <h4 class="text-2xl mb-1">Rule Checker</h4>
                <button
                    class="w-full min-h-[40px] flex justify-center p-1 border rounded hover:bg-opacity-70 bg-default-contrast dark:bg-default-dark dark:hover:bg-default-darkest disabled:bg-opacity-30 disabled:text-opacity-30 disabled:hover:dark:bg-default-dark"
                    @click="checkGraph"
                    v-bind="{ disabled: checkLoading || !selected }"
                >
                    <span v-if="!checkLoading">Check Current Graph</span>
                    <VueSpinnerPacman v-else class="block mr-10" color="yellow" size="15" />
                </button>
            </div>
        </div>
        <div v-show="connected" class="h-full ml-4 p-4">
            <div class="border h-full dark:bg-white overflow-auto">
                <VueJsonPretty
                    v-if="!checkLoading"
                    class="dark:text-default-darkest"
                    :data="checkResult"
                />
                <div v-else class="h-full flex justify-center items-center">
                    <VueSpinner size="75" class="dark:text-default-dark" />
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { InputField } from '@/components';
import { checkGraph as apiCheckGraph, apiEndpoint, isConnected } from '@/modules/apiConnection';
import { selected } from '@/modules/ifcViewer';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { Ref, computed, inject, ref, watch } from 'vue';

import { VueSpinner, VueSpinnerPacman, VueSpinnerRadio } from 'vue3-spinners';

import Parser from '@/ParserOpenBIMRL';
import { graphInjectionKey, parserInjectionKey } from '@/keys';
import VueJsonPretty from 'vue-json-pretty';
import type { GraphInject } from '../graph/Types';

defineEmits(['close']);

const parser = inject(parserInjectionKey) as Parser;
const { graph } = inject(graphInjectionKey) as GraphInject;

const urlValid = ref(true);

const tempApiUrl = ref(apiEndpoint.value);

const connectionStatus = ref<boolean | undefined>(undefined);
const connectionLoading = ref(false);

const checkLoading = ref(false);

const checkResult: Ref<any> = ref<any>({});

const connectionStatusText: Ref<string> = computed(() => {
    if (connectionStatus.value === false) return 'not connected';
    if (connectionStatus.value) return 'connected';
    return 'unknown';
});

const testConnection = () => {
    connectionStatus.value = undefined;
    connectionLoading.value = true;
    isConnected()
        .then(val => (connectionStatus.value = val))
        .catch(() => (connectionStatus.value = false))
        .finally(() => (connectionLoading.value = false));
};

const updateUrl = () => {
    try {
        apiEndpoint.value = new URL(tempApiUrl.value);
        urlValid.value = true;
    } catch (e) {
        console.error(e);
        urlValid.value = false;
        connectionStatus.value = undefined;
    }
};

const checkGraph = () => {
    if (!selected.value) return;

    const graphString = parser.build(
        graph.value.elements,
        graph.value.subChecks,
        graph.value.resultSets,
        'graph.openbimrl',
    );

    checkLoading.value = true;
    apiCheckGraph(selected.value, graphString)
        .then(data => (checkResult.value = data.content))
        .finally(() => {
            checkLoading.value = false;
        });
};

const statusTextColor: Ref<string | undefined> = computed(() => {
    if (connectionStatus.value === false) return 'text-red-700';
    if (connectionStatus.value) return 'text-green-700';
});

const connected = computed(() => connectionStatus.value ?? false);

watch(tempApiUrl, updateUrl);
watch(apiEndpoint, testConnection);
</script>

<style scoped>
@import 'vue-json-pretty/lib/styles.css';

td:first-child {
    vertical-align: baseline;
}
</style>
