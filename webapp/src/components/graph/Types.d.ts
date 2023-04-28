interface NodeData<InputConnectorType, OutputConnectorType> {
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

export type FunctionNodeData = NodeData<
    FunctionNodeConnectorType,
    FunctionNodeConnectorType
>;

export type InputNodeData = NodeData<never, InputNodeConnectorType>;

export type RuleIdentifierNodeData = NodeData<
    BaseConnectorType,
    BaseConnectorType
>;
