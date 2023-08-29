import type { Edge, Node } from '@vue-flow/core';
import type { Ref } from 'vue';
import { RuleOperator, RuleOrRuleSetType, RuleQuantifier, RuleSetOperator } from './enums';

export interface GraphJSON {
    elements: Array<CustomNode | Edge>;
    subChecks: SubChecks;
    resultSets: ResultSets;
}

// Nodes
export interface NodeData<InputConnectorType = unknown, OutputConnectorType = unknown> {
    name: string;
    icon: string;
    description: string;
    label: string;
    selected: boolean;
    inputs: Array<InputConnectorType>;
    outputs: Array<OutputConnectorType>;
}

interface BaseConnectorType {
    index: string;
}

interface FunctionNodeConnectorType extends BaseConnectorType {
    name: string;
}

interface InputNodeConnectorType extends FunctionNodeConnectorType {
    value: string;
}

export type FunctionNodeData = NodeData<FunctionNodeConnectorType, FunctionNodeConnectorType>;

export type InputNodeData = NodeData<never, InputNodeConnectorType>;

export type RuleIdentifierNodeData = NodeData<BaseConnectorType, BaseConnectorType>;

export type CustomNode = Node<NodeData<unknown, unknown>>;

// Rules and RuleSets

export interface Rule {
    label: string;
    operand1: string;
    operand2: string;
    operator: RuleOperator;
    quantifier: RuleQuantifier;
    type: RuleOrRuleSetType;
}

export interface RuleSet {
    label: string;
    type: RuleOrRuleSetType;
    operator: RuleSetOperator;
    rulesOrRuleSets: Array<Rule | RuleSet>;
}

export type RulesOrRuleSets = Array<Rule | RuleSet>;

export type SubChecks = Array<SubCheck>;

export interface SubCheck {
    label: string;
    name: string;
    applicability: RulesOrRuleSets;
    rulesOrRuleSets: RulesOrRuleSets;
    resultSets: Array<unknown>;
    [key: string]: any;
}

export type ResultSets = Array<ResultSet>;
export interface ResultSet {
    elements: string;
    filter: string;
    label: string;
    name: string;
    type: 'resultSet';
}

export interface GraphInject {
    graph: Ref<GraphJSON>;
    updateGraph: (nodes: Array<CustomNode>, edges: Array<Edge>) => void;
    registerResetCallback: (callback: GraphResetCallback) => number;
    resetGraph: (toGraph?: GraphJSON) => void;
}

export type GraphResetCallback = () => void;

export interface ParseOptions {
    multiSelectionMode: boolean;
    enablePrecalculations: boolean;
    enableRuleIdentifier: boolean;
    enableRules: boolean;
    renderBackground: boolean;
}
