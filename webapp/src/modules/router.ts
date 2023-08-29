import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { Graph, ModelCheckView } from '../components';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Graph,
    },
    {
        path: '/checks',
        component: ModelCheckView,
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
