import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { Graph, ModelCheckView } from '../components';

export enum Routes {
    GRAPH = 'graph',
    CHECKS = 'checks',
    VIEWER = 'viewer',
}

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: Routes.GRAPH,
        component: Graph,
    },
    {
        path: '/checks',
        name: Routes.CHECKS,
        component: ModelCheckView,
    },
    {
        path: '/viewer',
        name: Routes.VIEWER,
        component: () => import('@/components/viewer/IfcViewer.vue'),
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
