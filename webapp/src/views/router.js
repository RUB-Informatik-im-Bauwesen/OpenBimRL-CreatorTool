import VueRouter from 'vue-router';

import RuleEditorView from './RuleEditor/RuleEditorView.vue';
import NotFoundView from './NotFound/NotFoundView.vue';

const router = new VueRouter({
    //mode: 'history',
    routes:[
        { path: '/', name: 'RuleEditor', component: RuleEditorView },
        { path: '/:catchAll(.*)', name: 'NotFound', component: NotFoundView } //404 - NotFound default view
    ]
});

export default router;