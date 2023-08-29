export enum RuleSetOperator {
    AND = 'and',
    OR = 'or',
    XOR = 'xor',
    NAND = 'nand',
}
export enum RuleOrRuleSetType {
    RULE = 'rule',
    RULESET = 'ruleSet',
}
export enum RuleQuantifier {
    UNDEFINED = 'undefined',
    EXISTS = 'exists',
    ALL = 'all',
    NOTEXISTS = 'notexists',
    NOTALL = 'notall',
}

export enum RuleOperator {
    EQUALS = 'equals',
    // INCLUDES = 'includes',
    GREATER_THAN = 'greaterthan',
    GREATER_OR_EQUALS = 'greaterorequals',
    LESS_OR_EQUALS = 'lessorequals',
    LESS_THAN = 'lessthan',
    NOT_EQUALS = 'notequals',
}
