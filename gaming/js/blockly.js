const workspace = Blockly.inject("blocklyDiv", {
  // media: '../../media/',
  toolbox: document.getElementById("toolbox"),
  media: "media/",
  trashcan: true,
  maxTrashcanContents: 5,
});

Blockly.defineBlocksWithJsonArray([{
    "type": "value_cooperation",
    "message0": "合作",
    "output": "Choice",
    "colour": 65,
    "tooltip": "合作，决策的一种选择",
    "helpUrl": ""
},
{
    "type": "value_defection",
    "message0": "背叛",
    "output": "Choice",
    "colour": 65,
    "tooltip": "背叛，决策的一种选择",
    "helpUrl": ""
},
{
    "type": "value_index",
    "message0": "已进行轮数",
    "output": "Number",
    "colour": 230,
    "tooltip": "已进行的轮数，不包括本轮",
    "helpUrl": ""
},
{
    "type": "value_another_i",
    "message0": "对方第 %1 轮决策",
    "args0": [
        {
            "type": "input_value",
            "name": "index",
            "check": "Number"
        }
    ],
    "inputsInline": true,
    "output": "Choice",
    "colour": 65,
    "tooltip": "返回对方第n轮的决策，从1开始计数",
    "helpUrl": ""
},
{
    "type": "value_self_i",
    "message0": "己方第 %1 轮决策",
    "args0": [
        {
            "type": "input_value",
            "name": "index",
            "check": "Number"
        }
    ],
    "inputsInline": true,
    "output": "Choice",
    "colour": 65,
    "tooltip": "返回己方第n轮的决策，从1开始计数",
    "helpUrl": ""
},
{
    "type": "value_another_list",
    "message0": "对方历史决策",
    "output": "Uint8Array",
    "colour": 330,
    "tooltip": "对方历史决策数组",
    "helpUrl": ""
},
{
    "type": "value_self_list",
    "message0": "己方历史决策",
    "output": "Uint8Array",
    "colour": 330,
    "tooltip": "",
    "helpUrl": ""
},
{
    "type": "return_block",
    "message0": "该轮决定 %1 %2",
    "args0": [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_value",
            "name": "choice",
            "check": "Choice"
        }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 290,
    "tooltip": "立即结束本轮并提交决定",
    "helpUrl": ""
},
{
    "type": "stratege_block",
    "message0": "策略名 %1 %2 每轮策略 %3",
    "args0": [
        {
            "type": "field_input",
            "name": "name",
            "text": "default"
        },
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "input"
        }
    ],
    "colour": 20,
    "tooltip": "自定义策略",
    "helpUrl": ""
}])

Blockly.JavaScript['value_cooperation'] = function (block) {
    var code = '1';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['value_defection'] = function (block) {
    var code = '0';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['value_index'] = function (block) {
    var code = 'i';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['value_another_i'] = function (block) {
    var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `another[${value_index}]`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['value_self_i'] = function (block) {
    var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `self[${value_index}]`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['value_another_list'] = function (block) {
    var code = 'another';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['value_self_list'] = function (block) {
    var code = 'self';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['return_block'] = function (block) {
    var value_choice = Blockly.JavaScript.valueToCode(block, 'choice', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `return (${value_choice});\n`;
    return code;
};

Blockly.JavaScript['stratege_block'] = function (block) {
    var statements_input = Blockly.JavaScript.statementToCode(block, 'input');
    var code = 'new Function("i", "another", "self", `'+ statements_input +'\n`)';
    return code;
};

Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'), workspace)