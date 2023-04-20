import { Ref, ref, defineExpose } from "vue";

export { default as Upload } from "./Upload.vue";

const modals: Array<Ref<boolean>> = [];

export function registerModal(): Ref<boolean> {
    const active = ref(false);
    modals.push(active);
    return active;
}

window.addEventListener("click", () =>
    modals.forEach((e) => (e.value = false))
);
