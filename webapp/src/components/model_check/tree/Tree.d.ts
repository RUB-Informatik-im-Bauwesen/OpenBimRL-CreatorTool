import { TreeNode } from './Types';

export interface ITree {
    selectNode: (nodeID: string) => void;
    deselectAll: () => void;
    nodeStateMap: Map<string, TreeNode>;
}
