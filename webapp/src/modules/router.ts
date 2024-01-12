import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { Graph, IFCViewer, ModelCheckView } from '../components';

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
        component: IFCViewer,
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
