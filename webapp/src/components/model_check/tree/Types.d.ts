import { Node, NodeType } from '../utils';

export interface TreeNode {
    id: string;
    nodes: Array<string>;
    selectable: boolean;
    addable: boolean;
    path: Array<string>;
    state: TreeNodeState;
    text: string;
    type: NodeType | 'CATEGORY';
    data?: Node;
}

export interface TreeNodeState {
    selected: boolean;
    expanded: boolean;
    hover: boolean;
}
