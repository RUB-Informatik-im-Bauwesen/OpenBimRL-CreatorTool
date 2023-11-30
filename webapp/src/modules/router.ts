import { RouteRecordRaw,createRouter,createWebHashHistory } from 'vue-router';
import { Graph, IFCViewer, ModelCheckView } from '../components';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Graph,
    },
    {
        path: '/checks',
        component: ModelCheckView,
    },
    {
        path: '/viewer',
        component: IFCViewer,
    },
];

export default createRouter({
    history: createWebHashHistory(),
    routes,
});
