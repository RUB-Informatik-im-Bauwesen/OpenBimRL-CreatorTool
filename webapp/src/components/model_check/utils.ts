import { ResultSet, Rule, RuleSet, SubCheck } from '../graph/Types';
import { RuleOrRuleSetType } from '../graph/enums';

enum UnlistedTypes {
    SUB_CHECK = 'subCheck',
    RESULT_SET = 'resultSet',
}

export type NodeType = RuleOrRuleSetType | UnlistedTypes;
export const NodeTypes = { ...RuleOrRuleSetType, ...UnlistedTypes };
export type Node = Rule | RuleSet | SubCheck | ResultSet;

export function classifyNode(node: Node): NodeType {
    if (node.hasOwnProperty('type')) {
        node = node as Rule | RuleSet | ResultSet;

        if (node.type === 'resultSet') return UnlistedTypes.RESULT_SET;
        return (node as Rule | RuleSet).type;
    }

    return UnlistedTypes.SUB_CHECK;
}

export function isSubCheck(node: Node): node is SubCheck {
    return classifyNode(node) === UnlistedTypes.SUB_CHECK;
}

export function isRuleSet(node: Node): node is RuleSet {
    return classifyNode(node) === RuleOrRuleSetType.RULESET;
}

export function isRule(node: Node): node is Rule {
    return classifyNode(node) === RuleOrRuleSetType.RULE;
}
