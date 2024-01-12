import { ref } from 'vue';

export const apiEndpoint = ref(new URL('http://localhost:8080'));

interface ApiAnswer<T> {
    status: string;
    content: T;
}

export async function checkGraph(modelUUID: string, graph: string): Promise<ApiAnswer<any>> {
    const fd = new FormData();

    fd.append('file', graph);

    const graphUUID = (await postApi<string>('/graph', fd)).content;

    const getParams = `graphIDs=${graphUUID}`;

    const requestEndpoint = `/check/${modelUUID}?${getParams}`;

    return await getApi<any>(requestEndpoint);
}

export async function isConnected(): Promise<boolean> {
    try {
        const response = await getApi<boolean>('/connection');
        return response.content;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function addModel(file: File): Promise<ApiAnswer<string>> {
    const fd = new FormData();

    fd.append('file', file);
    const response = await postApi<string>('/model', fd);

    return response;
}

export async function getModel(id: string): Promise<Uint8Array> {
    return await getApiBinary('/model/' + id);
}

export async function getModels(): Promise<Map<string, string>> {
    try {
        const response = await getApi<{ [key: string]: string }>('/models');
        return new Map(Object.entries(response.content));
    } catch (e) {
        console.error(e);
        return new Map();
    }
}

async function getApi<T>(path: string): Promise<ApiAnswer<T>> {
    const response = await fetch(new URL(path, apiEndpoint.value));
    if (!response.ok) throw new Error(response.statusText);

    const data = await (response.json() as Promise<ApiAnswer<T>>);
    return data;
}

async function getApiBinary(path: string): Promise<Uint8Array> {
    const response = await fetch(new URL(path, apiEndpoint.value));
    if (!response.ok) throw new Error(response.statusText);

    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
}

async function postApi<T>(path: string, params: FormData): Promise<ApiAnswer<T>> {
    const response = await fetch(new URL(path, apiEndpoint.value), {
        method: 'POST',
        body: params,
    });
    if (!response.ok) throw new Error(response.statusText);

    const data = await (response.json() as Promise<ApiAnswer<T>>);
    return data;
}
