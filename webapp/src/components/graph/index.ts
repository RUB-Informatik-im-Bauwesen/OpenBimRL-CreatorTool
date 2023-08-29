export const calcTopOffsetStyle = (index: number, len: number) => ({
    top: len > 1 ? ((index / len) * 100).toString() + '%' : '50%',
});

export const minHeight = (
    inputs: Array<unknown> = [],
    outputs: Array<unknown> = [], // here it doesn't matter which types are used cause it only needs the length
) => Math.max(inputs.length, outputs.length);

export { default as Graph } from './Graph.vue';
export { default as GraphNodeMenu } from './modals/GraphNodeMenu.vue';
