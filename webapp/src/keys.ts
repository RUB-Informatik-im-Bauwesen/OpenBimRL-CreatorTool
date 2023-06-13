import { InjectionKey } from 'vue';
import { GraphInject } from './components/graph/Types';

export const graphInjectionKey: InjectionKey<GraphInject> = Symbol('graph');
