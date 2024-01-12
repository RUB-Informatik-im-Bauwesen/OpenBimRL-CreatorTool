<template>
    <div class="flex">
        <DropdownButton :modal-items="downloadModalItems">
            <span>Download</span>
        </DropdownButton>
    </div>
</template>

<script setup lang="ts">
import Parser from '@/ParserOpenBIMRL';
import { GraphInject } from '@/components/graph/Types';
import { graphInjectionKey, parserInjectionKey } from '@/keys';
import { Ref, inject, ref } from 'vue';
import { DropdownButton } from '..';
import type { DropdownProps } from '../Types';

const parser = inject(parserInjectionKey) as Parser;
const { graph } = inject(graphInjectionKey) as GraphInject;

const downloadFile = (filedata: string, filename: string) => {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(filedata));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

const downloadModalItems: Ref<DropdownProps> = ref({
    XML: () =>
        downloadFile(
            parser.build(
                graph.value.elements,
                graph.value.subChecks,
                graph.value.resultSets,
                'graph.openbimrl',
            ),
            'graph.openbimrl',
        ),
    JSON: () => downloadFile(JSON.stringify(graph.value), 'graph.json'),
});
</script>

<style scoped></style>
