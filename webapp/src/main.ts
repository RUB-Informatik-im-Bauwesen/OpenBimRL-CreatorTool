import { createApp } from 'vue';
import App from './App.vue';
import { initialGraph } from './components/graph/config';
import { graphInjectionKey } from './keys';
import './style.css';

const graph = initialGraph();

const app = createApp(App);
app.provide(graphInjectionKey, graph);
app.mount('#app');
