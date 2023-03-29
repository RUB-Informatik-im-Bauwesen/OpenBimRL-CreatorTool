import { isNode, isEdge, Position } from 'react-flow-renderer';
import dagre, { graphlib } from 'dagre';
import { v4 as uuidv4 } from 'uuid';

/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */
export default class Parser {
   
    constructor() { }

    /**
     * Creates an XML document, providing the elements of the scene graph.
     * 
     * @param elements 
     */
    build(elements, subChecks, resultSets, name){
        
        let rootString = 
            "<?xml version='1.0' encoding='utf-8'?>" +
            "<BIMRule " + 
            "schemaVersion='0.1' " +
            "xmlns='http://inf.bi.rub.de/OpenBimRL' " + 
            "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' " + 
            "xsi:schemaLocation='http://inf.bi.rub.de/OpenBimRL OpenBimRL.xsd'>" +
            "</BIMRule>";
        
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(rootString, "text/xml");
        
        let root = xmlDoc.getElementsByTagName("BIMRule");
        let nodePrecalculations = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Precalculations");

        let nodeModelCheck = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "ModelCheck");
        nodeModelCheck.setAttribute("name", name);
        
        root[0].appendChild(nodePrecalculations);
        root[0].appendChild(nodeModelCheck);

        let nodeRuleIdentifiers = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "RuleIdentifiers");
        nodeModelCheck.appendChild(nodeRuleIdentifiers);
        
        let ruleIdentifierIds:any = {};

        let filteredNodes = elements.filter((element:any) => {
            return isNode(element);
        });

        //Process and parse nodes
        for(let index in filteredNodes){
            let el = filteredNodes[index];

            if(el.type === "ruleIdentifier"){
                let n = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "RuleIdentifier");
                n.setAttribute("label", el.data.label);

                //memorize id for filtering
                ruleIdentifierIds[el.id] = n;

                nodeRuleIdentifiers.appendChild(n);
            }else{
                let n = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Node");
                n.setAttribute("id", el.id);

                if(el.data){
                    n.setAttribute("function", el.data.name);
                    
                    if(el.type !== "inputType"){ //set label as alias, if it is not an input node
                        n.setAttribute("alias", el.data.label);
                    }
                }
                
                if(el.data.inputs){
                    let inputs = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Inputs");
                    for(let inputIndex in el.data.inputs){
                        let inputObj = el.data.inputs[inputIndex];
                        let input = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Input");
                        input.setAttribute("name", inputObj.name);

                        if(inputObj.value){ //set value instead, if it exists
                            input.setAttribute("value", inputObj.value);
                        }

                        inputs.appendChild(input);
                    }

                    if(el.data.inputs.length !== 0){
                        n.appendChild(inputs);
                    }
                }
                
                if(el.data.outputs){
                    let outputs = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Outputs");
                    for(let outputIndex in el.data.outputs){
                        let outputObj = el.data.outputs[outputIndex];

                        let output = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Output");
                        output.setAttribute("name", outputObj.name);

                        if(outputObj.value){ 
                            output.setAttribute("value", outputObj.value);
                        }

                        if(el.type === "inputType"){ //set label instead, if it is an inputType
                            output.setAttribute("value", el.data.label);
                        }

                        outputs.appendChild(output);
                    }
                    
                    if(el.data.outputs.length !== 0){
                        n.appendChild(outputs);
                    }
                }

                nodePrecalculations.appendChild(n);
            }
            
        }

        let filteredEdges = elements.filter((element:any) => {
            return isEdge(element);
        });

        //Process and parse edges
        for(let index in filteredEdges){
            let el = filteredEdges[index];

            //Skip, if its an edge to an identifier
            if(ruleIdentifierIds[el.target]){ 
                
                ruleIdentifierIds[el.target].setAttribute("source", el.source);

                if(el.sourceHandle){
                    ruleIdentifierIds[el.target].setAttribute("sourceHandle", el.sourceHandle);
                }else{
                    //create a default sourceHandle, if no specific is set
                    ruleIdentifierIds[el.target].setAttribute("sourceHandle", "0"); 
                }

            }else{

                let e = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Edge");
                e.setAttribute("id", el.id);

                e.setAttribute("source", el.source);
                if(el.sourceHandle){
                    e.setAttribute("sourceHandle", el.sourceHandle);
                }

                e.setAttribute("target", el.target);
                if(el.targetHandle){
                    e.setAttribute("targetHandle", el.targetHandle);
                }

                nodePrecalculations.appendChild(e);
            }
        }

        let nodeModelSubChecks = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "ModelSubChecks");
        nodeModelCheck.appendChild(nodeModelSubChecks);

        for(let index in subChecks){
            let subCheck = subChecks[index];
            let nodeModelSubCheck = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "ModelSubCheck");
            nodeModelSubCheck.setAttribute("name", subCheck.name);
            nodeModelSubChecks.appendChild(nodeModelSubCheck);

            if(typeof subCheck.applicability !== 'undefined'){
                if(subCheck.applicability.length > 0){
                    let nodeApplicability = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Applicability");
                    nodeModelSubCheck.appendChild(nodeApplicability);

                    this.handleRulesOrRuleSets(xmlDoc, nodeApplicability, subCheck.applicability);
                }
            }

            if(typeof subCheck.rulesOrRuleSets !== 'undefined'){
                if(subCheck.rulesOrRuleSets.length > 0){
                    this.handleRulesOrRuleSets(xmlDoc, nodeModelSubCheck, subCheck.rulesOrRuleSets);
                }
            }
        }

        
        let nodeResultSets = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "ResultSets");
        nodeModelCheck.appendChild(nodeResultSets);
        for(let index in resultSets){
            let resultSet = resultSets[index];
            let nodeResultSet = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "ResultSet");
            nodeResultSet.setAttribute("name", resultSet.name);
            nodeResultSet.setAttribute("elements", resultSet.elements);
            nodeResultSet.setAttribute("filter", resultSet.filter);
            nodeResultSets.appendChild(nodeResultSet);
        }

        let serializer = new XMLSerializer();
        let xmlString = serializer.serializeToString(xmlDoc);

        return xmlString;
    }

    handleRulesOrRuleSets(xmlDoc:any, parent:any, rulesOrRuleSets:any){
        for(let index in rulesOrRuleSets){
            let ruleOrRuleSet = rulesOrRuleSets[index];

            if(ruleOrRuleSet.type === 'rule'){
                let nodeRule = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Rule");
                
                if(typeof ruleOrRuleSet.label !== 'undefined'){
                    if(ruleOrRuleSet.label !== ""){
                        nodeRule.setAttribute("label", ruleOrRuleSet.label);
                    }
                }

                if(ruleOrRuleSet.quantifier){
                    if(ruleOrRuleSet.quantifier !== "" || ruleOrRuleSet.quantifier !== "undefined"){
                        nodeRule.setAttribute("quantifier", ruleOrRuleSet.quantifier);
                    }
                }
                
                nodeRule.setAttribute("operator", ruleOrRuleSet.operator);
                nodeRule.setAttribute("operand1", ruleOrRuleSet.operand1);
                nodeRule.setAttribute("operand2", ruleOrRuleSet.operand2);
                parent.appendChild(nodeRule);
            }

            if(ruleOrRuleSet.type === 'ruleSet'){
                let nodeRules = xmlDoc.createElementNS("http://inf.bi.rub.de/OpenBimRL", "Rules");
                
                if(typeof ruleOrRuleSet.label !== 'undefined'){
                    if(ruleOrRuleSet.label !== ""){
                        nodeRules.setAttribute("label", ruleOrRuleSet.label);
                    }
                }

                nodeRules.setAttribute("operator", ruleOrRuleSet.operator);
                parent.appendChild(nodeRules);
                this.handleRulesOrRuleSets(xmlDoc, nodeRules, ruleOrRuleSet.rulesOrRuleSets);
            }
        }
    }

    /**
     * Parses JSON data that has been converted from an XML document.
     * 
     * @param data 
     * @param opts 
     * @returns 
     */
    parse(data:any, opts:any){
        let bimRule = data["BIMRule"];
        let precalculations = bimRule["Precalculations"];
        let ns = precalculations["Node"];
        let es = precalculations["Edge"];

        var graphElements:any[] = [];
        var nodeMap:any = {};

        //If Precalculations is checked in
        if(opts.enablePrecalculations){
            //Parse Nodes
            for(let index in ns){
                let n = ns[index];

                let inputHandles:any[] = [];
                if(typeof n["Inputs"] !== 'undefined'){
                    let ihs = n["Inputs"]["Input"];
                    
                    if(!Array.isArray(ihs)){
                        ihs = [ihs];
                    }

                    for(let i in ihs){
                        inputHandles.push({
                            'index': i,
                            'name': ihs[i]._attributes.name,
                            'value': ihs[i]._attributes.value
                        });
                    }
                }

                let outputHandles:any[] = [];
                if(typeof n["Outputs"] !== 'undefined'){
                    let ohs = n["Outputs"]["Output"];

                    if(!Array.isArray(ohs)){
                        ohs = [ohs];
                    }

                    for(let o in ohs){
                        outputHandles.push({
                            'index': o,
                            'name': ohs[o]._attributes.name,
                            'value': ohs[o]._attributes.value
                        });
                    }
                }

                let nNameLbl = n._attributes.function;
                let nIcon = "none"; //TODO - read custom icons
                let nDescription = "none"; //TODO - read description
                
                let nT = 'functionType';
                let nCustomLbl = "Node Label Here"; //Default Text if no Alias has been given
                
                //TODO: should be identified by a specific type identifier, not inputs and outputs
                if(inputHandles.length == 0 && outputHandles.length == 1){
                    nT = 'inputType';
                    nCustomLbl = n["Outputs"]["Output"]._attributes["value"];
                }else{
                    //Set an Alias for function nodes, if it exists
                    if(n._attributes.alias){
                        nCustomLbl = n._attributes.alias
                    }
                }

                graphElements.push({
                    id: n._attributes.id,
                    type: nT, // Custom Node Type
                    data: {
                        name: nNameLbl,
                        icon: nIcon, 
                        description: nDescription,
                        label: nCustomLbl,
                        inputs: inputHandles,
                        outputs: outputHandles, 
                        selected: false
                    },
                    position: { x: 0, y: 0 }
                });

                nodeMap[n._attributes.id] = n;
            }

            //Parse Edges
            for(let index in es){
                let e = es[index];
                let eAttr = e._attributes;

                let sourceNode = nodeMap[eAttr.source];
                if(typeof sourceNode["Outputs"] !== 'undefined'){
                    let outputHandle = sourceNode["Outputs"]["Output"];
                    if(!Array.isArray(outputHandle)){
                        outputHandle = [outputHandle];
                    }

                    let handleIndex = eAttr.sourceHandle ? eAttr.sourceHandle : '0';
                    
                    //Comment in to add Labels to the edge
                    //eAttr.label = outputHandle[handleIndex]._attributes["name"];
                }

                let targetNode = nodeMap[eAttr.target];
                if(typeof targetNode["Inputs"] !== 'undefined'){
                    let inputHandle = targetNode["Inputs"]["Input"];
                    if(!Array.isArray(inputHandle)){
                        inputHandle = [inputHandle];
                    }

                    /*
                    if(typeof inputHandle[eAttr.targetHandle]._attributes["collectionType"] !== 'undefined'){
                        eAttr.animated = true;
                    }
                    */
                }

                eAttr.style = {
                    'strokeWidth' : 4
                };

                graphElements.push(eAttr);
            }
        }

        let modelCheck = bimRule["ModelCheck"];
        let ruleIdentifiers = modelCheck["RuleIdentifiers"];
        if(opts.enableRuleIdentifier){
            let rIArr = ruleIdentifiers["RuleIdentifier"];

            for(let index in rIArr){
                let rI = rIArr[index];

                let nIcon = "none"; //TODO - read custom icons
                let nDescription = "none"; //TODO - read description

                let rIAttributes = rI._attributes ? rI._attributes : rI; //check if information are packaged as _attributes

                let identifierNode = {
                    id: rIAttributes.label,
                    type: "ruleIdentifier", // Custom Node Type
                    data: { 
                        name: "RuleIdentifier",
                        icon: nIcon, 
                        description: nDescription,
                        label: rIAttributes.label,
                        inputs: [{
                            'index': "0",
                            'name': undefined,
                            'value': undefined
                        }],
                        outputs: [{
                            'index': "0",
                            'name': undefined,
                            'value': undefined
                        }], 
                        selected: false
                    },
                    position: { x: 0, y: 0 }
                };

                graphElements.push(identifierNode);
                nodeMap[rIAttributes.label] = identifierNode;

                graphElements.push({
                    id: createUniqueID(),
                    source: rIAttributes.source,
                    sourceHandle: rIAttributes.sourceHandle,
                    target: rIAttributes.label,
                    targetHandle: "0",
                    style: {
                        'strokeWidth' : 4
                    }
                });

                //Add a source if precalculations are not created
                if(typeof nodeMap[rIAttributes.source] === 'undefined'){
                    graphElements.push({
                        id: rIAttributes.source,
                        type: "inputType", // Custom Node Type
                        data: { 
                            name: "InputNode",
                            icon: "none",
                            description: "none",
                            label: rIAttributes.source,
                            outputs: [
                                { "index": "0", "name":"text" } 
                            ],
                            selected: false
                        },
                        position: { x: 0, y: 0 }
                    });
                }
            }
        }

        let subChecks:any[] = [];
        let modelSubChecks = modelCheck["ModelSubChecks"];
        if(typeof modelSubChecks !== 'undefined'){
            
            let subChecksArr = modelSubChecks["ModelSubCheck"];
            if(typeof subChecksArr !== 'undefined'){
                if(!Array.isArray(subChecksArr)){
                    subChecksArr = [subChecksArr];
                }

                for(let index in subChecksArr){
                    let subCheck = subChecksArr[index];
                    let subCheckAttributes = subCheck._attributes ? subCheck._attributes : subCheck; //check if information are packaged as _attributes

                    let newApplicabilityList:any[] = [];
                    let newRulesOrRuleSetsList:any[] = [];
                    let newResultSetsList:any[] = [];

                    let subCheckItem = {
                        label: uuidv4(),
                        name: subCheckAttributes.name,
                        applicability: newApplicabilityList,
                        rulesOrRuleSets: newRulesOrRuleSetsList,
                        resultSets: newResultSetsList
                    }

                    //Applicability
                    let applicability = subCheck["Applicability"];
                    if(applicability){
                        subCheckItem.applicability = this.parseRulesAndRuleSets(applicability);
                    }

                    //RulesOrRuleSets
                    let rulesOrRuleSets = subCheck["Rules"];
                    if(rulesOrRuleSets){
                        subCheckItem.rulesOrRuleSets = this.parseRulesAndRuleSets(subCheck);
                    }
                    
                    subChecks.push(subCheckItem);
                }
            }
        }
        
        //ResultSets
        let resultSetsArr:any[] = [];
        let resultSets = modelCheck["ResultSets"];
        if(resultSets){
            let resultSetArr = resultSets["ResultSet"];
            if(resultSetArr){
                if(!Array.isArray(resultSetArr)){
                    resultSetArr = [resultSetArr];
                }

                for(let rsIndex in resultSetArr){
                    let resultSet = resultSetArr[rsIndex];
                    let resultSetAttributes = resultSet._attributes ? resultSet._attributes : resultSet; //check if information are packaged as _attributes
                    
                    resultSetsArr.push({
                        label: uuidv4(),
                        type: "resultSet",
                        name: resultSetAttributes.name,
                        elements: resultSetAttributes.elements,
                        filter: resultSetAttributes.filter
                    });
                }
            }  
        }
        

        return { 
            'elements': this.getLayoutedElements(graphElements, 'LR'), 
            'subChecks' : subChecks,
            'resultSets' : resultSetsArr
        }; //Apply layout and register elements
        
        /*
        if(this.enableRules){
            TODO
        }
        */
    }

    parseRulesAndRuleSets(element:any){
        let rArS:any[] = [];

        let ruleSets = element["Rules"]
        if(ruleSets){
            if(!Array.isArray(ruleSets)){
                ruleSets = [ruleSets];
            }

            for(let rsIndex in ruleSets){
                let ruleSet = ruleSets[rsIndex];
                
                let ruleSetAttributes = ruleSet._attributes ? ruleSet._attributes : ruleSet; //check if information are packaged as _attributes

                let newList:any[] = [];
                let ruleSetItem = {
                    label: ruleSetAttributes.label ? ruleSetAttributes.label : uuidv4(),
                    type: "ruleSet",
                    operator: ruleSetAttributes.operator,
                    rulesOrRuleSets:newList
                };
                
                ruleSetItem.rulesOrRuleSets = this.parseRulesAndRuleSets(ruleSet);
                rArS.push(ruleSetItem);

                //let temp_rArS = this.parseRulesAndRuleSets(ruleSet);
                //Array.prototype.push.apply(rArS, temp_rArS); //merging arrays recursivly
            }
        }
        
        let rules = element["Rule"]
        if(rules){
            if(!Array.isArray(rules)){
                rules = [rules];
            }

            for(let rIndex in rules){
                let rule = rules[rIndex];
                let ruleAttributes = rule._attributes ? rule._attributes : rule; //check if information are packaged as _attributes

                let ruleItem = {
                    label: ruleAttributes.label ? ruleAttributes.label : uuidv4(),
                    type: "rule",
                    quantifier: ruleAttributes.quantifier,
                    operator: ruleAttributes.operator,
                    operand1: ruleAttributes.operand1,
                    operand2: ruleAttributes.operand2
                };
                
                rArS.push(ruleItem);
            }
        }

        return rArS;
    }

    getLayoutedElements(elements:any, direction = 'TB'){
        const nodeWidth = 450;
        const nodeHeight = 150;

        if (graphlib) {
            const dagreGraph = new graphlib.Graph();
            dagreGraph.setDefaultEdgeLabel(() => ({}));
            
            const isHorizontal = direction === 'LR';
            dagreGraph.setGraph({ rankdir: direction });
            
            elements.forEach((el:any) => {
                if (isNode(el)) {
                    dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
                } else {
                    dagreGraph.setEdge(el.source, el.target);
                }
            });
            
            dagre.layout(dagreGraph);
            
            return elements.map((el:any) => {
                if (isNode(el)) {
                    const nodeWithPosition = dagreGraph.node(el.id);
                    el.targetPosition = isHorizontal ? Position.Left : Position.Top;
                    el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
                    
                    // unfortunately we need this little hack to pass a slightly different position
                    // to notify react flow about the change. Moreover we are shifting the dagre node position
                    // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
                    el.position = {
                        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
                        y: nodeWithPosition.y - nodeHeight / 2,
                    };
                }
                return el;
            });
        }
    }
}

export function createUniqueID(){
    function chr4(){
        return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}