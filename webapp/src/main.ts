import { createApp } from 'vue';
import App from './App.vue';
import Parser from './ParserOpenBIMRL';
import { initialGraph } from './components/graph/config';
import { darkModeKey, graphInjectionKey, parserInjectionKey } from './keys';
import { darkMode, router } from './modules';
import './style.css';

const graph = initialGraph();
const parser = new Parser();

const app = createApp(App);
app.provide(graphInjectionKey, graph);
app.provide(parserInjectionKey, parser);
app.provide(darkModeKey, darkMode);
app.use(router);
app.mount('#app');
