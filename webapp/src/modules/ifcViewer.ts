import { FragmentsGroup } from 'bim-fragment';
import * as OBC from 'openbim-components';
import { Color } from 'three';
import { reactive, ref, watch } from 'vue';
import { getModel, getModels } from './apiConnection';

// init components
const components = new OBC.Components();
components.onInitialized.add(() => {});

// init scene
const sceneComponent = new OBC.SimpleScene(components);
sceneComponent.setup();
components.scene = sceneComponent;

// reference declaration
export const selected = ref<string | null>(null);
export const loading = ref(false);
let loader: OBC.FragmentIfcLoader;

export const models = reactive(new Map<string, string>());
const loadedModels = new Map<string, FragmentsGroup | null>();

export function init(container: HTMLElement) {
    const rendererComponent = new OBC.PostproductionRenderer(components, container);
    components.renderer = rendererComponent;
    const postproduction = rendererComponent.postproduction;

    const cameraComponent = new OBC.OrthoPerspectiveCamera(components);
    components.camera = cameraComponent;

    // const raycasterComponent = new OBC.SimpleRaycaster(components);
    // components.raycaster = raycasterComponent;

    components.init();
    postproduction.enabled = true;

    const grid = new OBC.SimpleGrid(components, new Color(0x666666));
    postproduction.customEffects.excludedMeshes.push(grid.get());

    loader = new OBC.FragmentIfcLoader(components);

    loader.settings.wasm = {
        path: '/resources/',
        absolute: true,
    };

    // // highlight on hover
    // const highlighter = new OBC.FragmentHighlighter(components);
    // highlighter.setup();

    // const propertiesProcessor = new OBC.IfcPropertiesProcessor(components);
    // highlighter.events.select.onClear.add(() => {
    //     propertiesProcessor.cleanPropertiesList();
    // });

    // // automatically process the model
    // loader.onIfcLoaded.add(async model => {
    //     propertiesProcessor.process(model);
    //     highlighter.events.select.onHighlight.add(selection => {
    //         const fragmentID = Object.keys(selection)[0];
    //         const expressID = Number([...selection[fragmentID]][0]);
    //         propertiesProcessor.renderProperties(model, expressID);
    //     });
    // });
}

async function updateWindow() {
    // await (await components.tools.get(OBC.FragmentHighlighter)).update();
    await (await components.tools.get(OBC.FragmentManager)).updateWindow();
}

// loads a model
export async function loadModel(model: FragmentsGroup) {
    loading.value = true;
    components.scene.get().add(model);
    await updateWindow();
    loading.value = false;
}

// uloads a model
export async function unloadModel(model: FragmentsGroup) {
    loading.value = true;
    components.scene.get().remove(model);
    await updateWindow();
    loading.value = false;
}

// this is cursed. Please make it better JS/TS god
export async function getSelected(): Promise<FragmentsGroup | null> {
    if (!loader) throw new Error('loader not yet initialized');
    if (!selected.value) return null;
    if (!loadedModels.has(selected.value)) throw new Error('Key not found');

    const model = loadedModels.get(selected.value);

    if (model) return model;

    // if model was not loaded yet:
    loading.value = true;
    const loadedModel = await loader.load(await getModel(selected.value), selected.value);
    loadedModels.set(selected.value, loadedModel);
    loading.value = false;
    return loadedModel;
}

export function updateModels() {
    getModels().then(data => {
        models.clear();
        data.forEach((v, k) => models.set(k, v));
    });
}

watch(selected, async (newVal, oldVal) => {
    if (!loader) return;
    if (oldVal) {
        const oldModel = loadedModels.get(oldVal);
        if (oldModel) await unloadModel(oldModel);
    }

    if (!newVal) return;
    const selectedModel = await getSelected();
    if (!selectedModel) return;
    loadModel(selectedModel);
});

watch(models, () =>
    [...models.keys()].forEach(model => loadedModels.set(model, loadedModels.get(model) || null)),
);
