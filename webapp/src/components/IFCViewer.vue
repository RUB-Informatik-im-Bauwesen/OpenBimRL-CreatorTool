<template>
    <div ref="viewerContainer" class="relative dark:text-default-darkest"></div>
</template>

<script setup lang="ts">
import * as OBC from 'openbim-components';
// @ts-ignore
import * as THREE from 'three';
import { onMounted, ref } from 'vue';

const viewerContainer = ref<HTMLElement | null>(null);
const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    const viewer = new OBC.Components();
    viewer.onInitialized.add(() => {});

    const sceneComponent = new OBC.SimpleScene(viewer);
    sceneComponent.setup();
    viewer.scene = sceneComponent;

    const rendererComponent = new OBC.PostproductionRenderer(viewer, viewerContainer.value!);
    viewer.renderer = rendererComponent;
    const postproduction = rendererComponent.postproduction;

    const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer);
    viewer.camera = cameraComponent;

    const raycasterComponent = new OBC.SimpleRaycaster(viewer);
    viewer.raycaster = raycasterComponent;

    viewer.init();
    postproduction.enabled = true;

    const grid = new OBC.SimpleGrid(viewer, new THREE.Color(0x666666));
    postproduction.customEffects.excludedMeshes.push(grid.get());

    const ifcLoader = new OBC.FragmentIfcLoader(viewer);

    ifcLoader.settings.wasm = {
        path: '/resources/',
        absolute: true,
    };

    const highlighter = new OBC.FragmentHighlighter(viewer);
    highlighter.setup();

    const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer);
    highlighter.events.select.onClear.add(() => {
        propertiesProcessor.cleanPropertiesList();
    });

    ifcLoader.onIfcLoaded.add(async model => {
        propertiesProcessor.process(model);
        highlighter.events.select.onHighlight.add(selection => {
            const fragmentID = Object.keys(selection)[0];
            const expressID = Number([...selection[fragmentID]][0]);
            propertiesProcessor.renderProperties(model, expressID);
        });
        highlighter.update();
    });

    const mainToolbar = new OBC.Toolbar(viewer, { name: 'Main Toolbar', position: 'bottom' });
    mainToolbar.addChild(
        ifcLoader.uiElement.get('main'),
        propertiesProcessor.uiElement.get('main'),
    );
    viewer.ui.addToolbar(mainToolbar);
});
</script>

<style></style>
