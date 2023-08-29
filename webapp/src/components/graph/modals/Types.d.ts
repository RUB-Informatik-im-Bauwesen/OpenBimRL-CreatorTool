import type { CustomNode } from '../Types';

export interface ImportedRuleSet {
    default: Array<RuleSetElement>;
}

export interface RuleSetElement {
    color: string;
    id: string;
    name: string;
    items: Array<CustomNode>;
}
