<template>
    <div class="flex">
        <input
            class="hidden"
            type="file"
            ref="uploadXMLInput"
            accept="application/xml"
            @change="onXMLUpload"
        />
        <input
            class="hidden"
            type="file"
            ref="uploadJSONInput"
            accept="application/json"
            @change="onJSONUpload"
        />
        <DropdownButton :modal-items="uploadModalItems">
            <span>Upload</span>
        </DropdownButton>
    </div>
</template>

<script setup lang="ts">
import Parser from '@/ParserOpenBIMRL';
import { graphInjectionKey } from '@/keys';
import { inject, ref } from 'vue';
import { xml2js } from 'xml-js';
import { DropdownButton } from '..';
import type { GraphInject, ParseOptions } from '../../graph/Types';
import { DropdownProps } from '../Types';

const { resetGraph } = inject(graphInjectionKey) as GraphInject;

const getUploadedFile = async (input: HTMLInputElement | null): Promise<string> => {
    if (!input?.files || input.files.length < 1) return Promise.reject('no files inserted');
    return await input.files[0].text();
};

const parser = new Parser();
const parseOptions: ParseOptions = {
    enablePrecalculations: true,
    enableRuleIdentifier: true,
    enableRules: false,
    multiSelectionMode: false,
    renderBackground: true,
};

const uploadXMLInput = ref<HTMLInputElement | null>(null);
const onXMLUpload = () => {
    getUploadedFile(uploadXMLInput.value).then(content => {
        resetGraph(parser.parse(xml2js(content, { compact: true }), parseOptions));
    });
};

const uploadJSONInput = ref<HTMLInputElement | null>(null);
const onJSONUpload = () =>
    getUploadedFile(uploadJSONInput.value).then(content => resetGraph(JSON.parse(content)));

const uploadModalItems: DropdownProps = {
    XML: () => uploadXMLInput.value?.click(),
    JSON: () => uploadJSONInput.value?.click(),
};
</script>

<style scoped></style>
