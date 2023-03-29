import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

/**
 * @author Marcel Stepien
 * @version 2022.11.1
 */

//===================================================
//================ Simple Types =====================

/**
 * 
 */
export function createInputType(dataNode:any) {
    //console.log(dataNode);

    //Creates nodes for in- and output
    //let targets = createTargets(dataNode.data.inputs, 0);
    let sources = createSources(dataNode.data.outputs, 0);
    

    let reactVueNode = React.createElement(
        'div', {
            'style': {
                width: '250px', 
                height: '50px',
                background: 'white',
                borderRadius: 5,
                textAlign: 'center',
                border: '2px solid black',
                boxShadow: dataNode.data.selected ? 
                    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)":
                    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", 
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            }
        }, 
        React.createElement('div', {
            'style': {
                background: 'white',
                height: '25px',
                margin: '10px',
                border: '2px solid black'
            }
        }, dataNode.data.label),
        sources
    );

    return reactVueNode;
}

/**
 * 
 */
export function createFunctionType(dataNode:any) {
    let sourceCount = dataNode.data.outputs.length;
    let targetCount = dataNode.data.inputs.length;

    let maxCount = sourceCount;
    if(sourceCount < targetCount){
        maxCount = targetCount;
    }

    let stepsize = 25;
    let maxSize = (stepsize * maxCount) + 25;

    //Creates nodes for in- and output
    let targets = createTargets(dataNode.data.inputs, 0);
    let sources = createSources(dataNode.data.outputs, 0);

    let reactVueNode = React.createElement(
        'div', {
            'style': {
                width: '250px', 
                height: String(maxSize) + 'px',
                background: 'lightblue',
                borderRadius: 5,
                textAlign: 'center',
                border: '2px solid black',
                boxShadow: dataNode.data.selected ?  
                    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)":
                    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", 
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            }
        }, 
        React.createElement('div', {
            'style': {
                background: 'white',
                height: String(maxSize - 25) + 'px',
                margin: '10px',
                border: '2px solid black'
            }
        }, dataNode.data.label),
        targets,
        sources
    );

    return reactVueNode;
}

/**
 * 
 */
export function createRuleIdentifier(dataNode:any) {
    //console.log(dataNode);
    
    //Creates nodes for in- and output
    let targets = createTargets(dataNode.data.inputs, 0);
    let sources = createSources(dataNode.data.outputs, 0);

    let reactVueNode = React.createElement(
        'div', {
            'style': {
                width: '250px', 
                height: '50px',
                background: 'Salmon',
                borderRadius: 5,
                textAlign: 'center',
                border: '2px solid black'
            }
        }, 
        React.createElement('div', {
            'style': {
                background: 'white',
                height: '25px',
                margin: '10px',
                border: '2px solid black'
            }
        }, dataNode.data.label),
        sources,
        targets
    );
    return reactVueNode;
}


//===================================================
//================ Fancy Types ======================

export const DEFAULT_NODE_WIDTH = 350;
const nodeHeaderSize = 50;
const stepsize = 25;
const targetsRadius = 15;

function createTargets(targetJSON:any, headOffsetProzentage:number, createLabel = false){
    let targets:any[] = [];
    
    if(targetJSON){
        let targetCount = targetJSON.length;

        for(let inputIndex in targetJSON){
            let input = targetJSON[inputIndex];
            
            //Positioning in procentage from the top
            let topPosition = headOffsetProzentage + 
                ((100 - headOffsetProzentage)  / targetCount) * new Number(inputIndex).valueOf() + 
                ((100 - headOffsetProzentage) / targetCount)/2;
            
            let label;
            if(createLabel){
                label = React.createElement(
                    'label', {
                        'style': {
                            position: 'fixed',
                            right: String(-1 * DEFAULT_NODE_WIDTH/2 + targetsRadius) + 'px',
                            top: String(-1 * targetsRadius/2) + 'px',
                            width: String(DEFAULT_NODE_WIDTH/2 - targetsRadius * 1.5) + 'px',
                            textAlign: Position.Left,
                            overflow: 'hidden'
                            //border: '1px solid black'
                        }
                    },
                    input.name
                );
            }

            let targetHandle = React.createElement(Handle, {
                'type': 'target', 
                'position': Position.Left,
                'id': input.index,
                'key': String(inputIndex),
                'style': {
                    top: String(topPosition) + '%',
                    width: String(targetsRadius) + 'px',
                    height: String(targetsRadius) + 'px',
                    borderRadius: targetsRadius,
                    border: '2px solid lightgray'
                }
            }, label);
            targets.push(targetHandle);
        }
    }
    return targets;
}

function createSources(sourceJSON:any, headOffsetProzentage:number, createLabel = false){
    let sources:any[] = [];

    if(sourceJSON){
        let sourceCount = sourceJSON.length;

        for(let outputIndex in sourceJSON){
            let output = sourceJSON[outputIndex];
            
            //Positioning in procentage from the top
            let topPosition = headOffsetProzentage + 
                ((100 - headOffsetProzentage) / sourceCount) * new Number(outputIndex).valueOf() + 
                ((100 - headOffsetProzentage) / sourceCount)/2;
            
            let label;
            if(createLabel){
                label = React.createElement(
                    'label', {
                        'style': {
                            position: 'fixed',
                            left: String(-1 * DEFAULT_NODE_WIDTH/2 + targetsRadius) + 'px',
                            top: String(-1 * targetsRadius/2) + 'px',
                            width: String(DEFAULT_NODE_WIDTH/2 - targetsRadius * 1.5) + 'px',
                            textAlign: Position.Right,
                            overflow: 'hidden'
                            //border: '1px solid black'
                        }
                    },
                    output.name
                );
            }
            
            let sourceHandle = React.createElement(Handle, {
                'type': 'source', 
                'position': Position.Right,
                'id': output.index,
                'key': String(outputIndex),
                'style': {
                    top: String(topPosition) + '%',
                    width: String(targetsRadius) + 'px',
                    height: String(targetsRadius) + 'px',
                    borderRadius: targetsRadius,
                    border: '2px solid lightgray'
                }
            }, label);
            sources.push(sourceHandle);
        }
    }
    return sources;
}


/**
 * 
 */
 export function creatFancyFunctionType(dataNode:any) {
    let sourceCount = dataNode.data.outputs.length;
    let targetCount = dataNode.data.inputs.length;

    let maxCount = sourceCount;
    if(sourceCount < targetCount){
        maxCount = targetCount;
    }

    let maxSize = (stepsize * maxCount) + 25 + nodeHeaderSize;
    let headOffsetProzentage = (nodeHeaderSize / maxSize) * 100;

    //Creates nodes for in- and output
    let targets = createTargets(dataNode.data.inputs, headOffsetProzentage, true);
    let sources = createSources(dataNode.data.outputs, headOffsetProzentage, true);
    
    //Create the head container, containing titel and function
    let headContainer = React.createElement(
        'div', {
            'style': {
                background: 'LightCyan',
                height: String(nodeHeaderSize) + 'px'
            }
        }, 
        "(" + dataNode.data.name + ")",
        React.createElement('br'), 
        dataNode.data.label
    );

    //Create the body container
    let bodyContainer = React.createElement(
        'div', {
            'style': {
                background: 'white',
                height: String(maxSize - nodeHeaderSize) + 'px',
                display: 'flex',
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center"
            }
        }
    );
    
    let reactVueNode = React.createElement(
        'div', {
            'style': {
                width: String(DEFAULT_NODE_WIDTH) + 'px', 
                height: String(maxSize) + 'px',
                background: 'white',
                borderRadius: 5,
                textAlign: 'center',
                border: '2px solid lightgray',
                overflow: 'hidden',
                boxShadow: dataNode.data.selected ?  
                    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)":
                    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", 
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            }
        }, 
        headContainer,
        bodyContainer,
        targets,
        sources
    );

    return reactVueNode;
}

/**
 * 
 */
 export function createFancyInputType(dataNode:any) {
     
    let headerSize = 30;
    let maxSize = 50 + headerSize;

    let headOffsetProzentage = (headerSize / maxSize) * 100;

    //let targets = createTargets(dataNode.data.inputs, headOffsetProzentage);
    let sources = createSources(dataNode.data.outputs, headOffsetProzentage);

    //Create the head container, containing titel and function
    let headContainer = React.createElement(
        'div', {
            'style': {
                background: 'LightGoldenRodYellow',
                height: String(headerSize) + 'px'
            }
        }, 
        "(" + dataNode.data.name + ")"
    );

    //Create the body container
    let bodyContainer = React.createElement(
        'div', {
            'style': {
                background: 'white',
                height: String(maxSize - headerSize) + 'px',
                display: 'flex',
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center"
            }
        }, 
        dataNode.data.label
    );

    let reactVueNode = React.createElement(
        'div', {
            'style': {
                width: String(DEFAULT_NODE_WIDTH) + 'px', 
                height: String(maxSize) +'px',
                background: 'white',
                borderRadius: 5,
                textAlign: 'center',
                border: '2px solid lightgray',
                overflow: 'hidden',
                boxShadow: dataNode.data.selected ? 
                    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)":
                    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", 
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            }
        },
        headContainer,
        bodyContainer,
        sources
    );

    return reactVueNode;
}

/**
 * 
 */
 export function createFancyRuleIdentifier(dataNode:any) {
    
    let headerSize = 30;
    let maxSize = 50 + headerSize;

    let headOffsetProzentage = (headerSize / maxSize) * 100;

    let targets = createTargets(dataNode.data.inputs, headOffsetProzentage);
    let sources = createSources(dataNode.data.outputs, headOffsetProzentage);

    //Create the head container, containing titel and function
    let headContainer = React.createElement(
        'div', {
            'style': {
                background: 'LightPink',
                height: String(headerSize) + 'px'
            }
        }, 
        "(" + dataNode.data.name + ")"
    );

    //Create the body container
    let bodyContainer = React.createElement(
        'div', {
            'style': {
                background: 'white',
                height: String(maxSize - headerSize) + 'px',
                display: 'flex',
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center"
            }
        }, 
        dataNode.data.label
    );

    let reactVueNode = React.createElement(
        'div', {
            'style': {
                width: String(DEFAULT_NODE_WIDTH) + 'px', 
                height: String(maxSize) + 'px',
                background: 'white',
                borderRadius: 5,
                textAlign: 'center',
                border: '2px solid lightgray',
                overflow: 'hidden',
                boxShadow: dataNode.data.selected ? 
                    "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)":
                    "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)", 
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            }
        },
        headContainer,
        bodyContainer,
        targets,
        sources
    );
    return reactVueNode;
}


export function createGroupNode(dataNode:any){
    let headerSize = 30;
    let maxSize = 50 + headerSize;
    let margin = 50;

    //Create the head container, containing titel and function
    let headContainer = React.createElement(
        'div', {
            'style': {
                background: 'red',
                height: String(headerSize) + 'px'
            }
        }, 
        "Group: " + dataNode.data.label
    );

    let reactVueNode = React.createElement(
        'div', {
            'style': {
                width: String(dataNode.data.width + DEFAULT_NODE_WIDTH + margin) + 'px', 
                height: String(dataNode.data.height + maxSize + margin + headerSize) + 'px',
                background: 'white',
                borderRadius: 5,
                textAlign: 'center',
                border: '2px solid black',
                overflow: 'hidden',
                transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            }
        },
        headContainer
    );
    return reactVueNode;
}