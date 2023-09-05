Blockly.defineBlocksWithJsonArray([{
  "type": "action_moveto",
  "message0": "移动到 %1 耗时 %2 毫秒",
  "args0": [
    {
      "type": "input_value",
      "name": "moveto_dst",
      "check": "value_position"
    },
    {
      "type": "field_number",
      "name": "moveto_d",
      "value": 1000,
      "min": 200,
      "max": 100000,
      "precision": 1
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 210,
  "tooltip": "移动到某个地点",
  "helpUrl": ""
},
{
  "type": "world_block",
  "message0": "传染性 %1 %2 人口构成 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "Infectious",
      "options": [
        [
          "很低",
          "VERY_LOW"
        ],
        [
          "低",
          "LOW"
        ],
        [
          "中",
          "MED"
        ],
        [
          "较高",
          "HIGH"
        ],
        [
          "很高",
          "VERY_HIGH"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "world_block_s",
      "check": "person_block"
    }
  ],
  "colour": 230,
  "tooltip": "构成世界的人们和整个世界",
  "helpUrl": ""
},
{
  "type": "person_block",
  "message0": "类别 %1 人口数量 %2 %3 无症状率(0-1) %4 %5 致死率(0-1) %6 %7 感染潜伏期 %8 %9 感染持续时间 %10 %11 人口空间分布 %12 %13 动作 %14",
  "args0": [
    {
      "type": "field_input",
      "name": "person_block_n",
      "text": "default"
    },
    {
      "type": "field_number",
      "name": "person_block_c",
      "value": 0,
      "min": 0,
      "max": 1000,
      "precision": 1
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "Asymptomatic_rate",
      "value": 0.5,
      "min": 0,
      "max": 1,
      "precision": 0.01
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "Fatality_rate",
      "value": 0.1,
      "min": 0,
      "max": 1,
      "precision": 0.01
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "Incubation_period",
      "value": 14,
      "min": 0,
      "max": 28,
      "precision": 1
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "duration",
      "value": 28,
      "min": 0,
      "max": 56,
      "precision": 1
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_dropdown",
      "name": "person_block_d",
      "options": [
        [
          "均匀分布",
          "uniform"
        ],
        [
          "高斯分布",
          "gaussian"
        ]
      ]
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "person_block_s"
    }
  ],
  "previousStatement": "person_block",
  "nextStatement": "person_block",
  "colour": 160,
  "tooltip": "形形色色的人和他们的身体",
  "helpUrl": ""
},
{
  "type": "value_random_position",
  "message0": "随机地点 %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "random_type",
      "options": [
        [
          "均匀分布",
          "uniform"
        ],
        [
          "高斯分布",
          "gaussian"
        ]
      ]
    }
  ],
  "output": "value_position",
  "colour": 65,
  "tooltip": "随机的地点, 未知的旅途",
  "helpUrl": ""
},
{
  "type": "action_timeout",
  "message0": "等待 %1 毫秒",
  "args0": [
    {
      "type": "field_number",
      "name": "action_timeout_d",
      "value": 500,
      "min": 0,
      "max": 100000,
      "precision": 1
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "我们在等待什么呢",
  "helpUrl": ""
},
{
  "type": "value_around_position",
  "message0": "附近地点 范围 %1",
  "args0": [
    {
      "type": "field_number",
      "name": "shifting",
      "value": 20,
      "min": 0,
      "max": 100
    }
  ],
  "output": "value_position",
  "colour": 65,
  "tooltip": "阡陌交通, 鸡犬相闻",
  "helpUrl": ""
},
{
  "type": "value_fixed_position",
  "message0": "指定地点 x %1 y %2",
  "args0": [
    {
      "type": "field_number",
      "name": "X",
      "value": 50,
      "min": 0,
      "precision": 1
    },
    {
      "type": "field_number",
      "name": "Y",
      "value": 50,
      "min": 0,
      "precision": 1
    }
  ],
  "output": "",
  "colour": 65,
  "tooltip": "确定的地点, 未知的冒险",
  "helpUrl": ""
},
{
  "type": "action_inject",
  "message0": "注射疫苗 有效率(0-1) %1",
  "args0": [
    {
      "type": "field_number",
      "name": "rate",
      "value": 1,
      "min": 0,
      "max": 1,
      "precision": 0.01
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 260,
  "tooltip": "疫苗会拯救我们吗",
  "helpUrl": ""
},
{
  "type": "value_is_symptomatic",
  "message0": "身体不适",
  "output": "Boolean",
  "colour": 330,
  "tooltip": "身体不太舒服, 这正常吗",
  "helpUrl": ""
},
{
  "type": "value_is_pcr",
  "message0": "核酸检测阳性 [假阴性率(0-1) %1 假阳性率(0-1) %2 ]",
  "args0": [
    {
      "type": "field_number",
      "name": "fack_n",
      "value": 0,
      "min": 0,
      "max": 1,
      "precision": 0.01
    },
    {
      "type": "field_number",
      "name": "fack_e",
      "value": 0,
      "min": 0,
      "max": 1,
      "precision": 0.01
    }
  ],
  "output": "Boolean",
  "colour": 330,
  "tooltip": "核酸检测, 为了自己或他人",
  "helpUrl": ""
}])

Blockly.JavaScript['action_moveto'] = function(block) {
  var value_moveto_dst = Blockly.JavaScript.valueToCode(block, 'moveto_dst', Blockly.JavaScript.ORDER_ATOMIC);
  var number_moveto_d = block.getFieldValue('moveto_d');
  var code = `await moveTo(environment.person, ${value_moveto_dst}, ${number_moveto_d})\n`;
  return code;
};

Blockly.JavaScript['world_block'] = function(block) {
  var dropdown_infectious = block.getFieldValue('Infectious');
  var statements_world_block_s = Blockly.JavaScript.statementToCode(block, 'world_block_s');
  var code = `var world = new World('${dropdown_infectious}')\n` + statements_world_block_s + '\n';
  return code;
};

Blockly.JavaScript['person_block'] = function(block) {
  var text_person_block_n = block.getFieldValue('person_block_n');
  var number_person_block_c = block.getFieldValue('person_block_c');
  var number_asymptomatic_rate = block.getFieldValue('Asymptomatic_rate');
  var number_fatality_rate = block.getFieldValue('Fatality_rate');
  var number_incubation_period = block.getFieldValue('Incubation_period');
  var number_duration = block.getFieldValue('duration');
  var dropdown_person_block_d = block.getFieldValue('person_block_d');
  var statements_person_block_s = Blockly.JavaScript.statementToCode(block, 'person_block_s');
  var config = `\{
    asymptomaticRate: ${number_asymptomatic_rate},
    fatalityRate:${number_fatality_rate},
    incubationPeriod:${number_incubation_period},
    numberDuration:${number_duration}
  }`
  var code = `addPersonToWorld(world, ${number_person_block_c}, '${dropdown_person_block_d}', ${config}, async (environment) => {\n${statements_person_block_s}})\n`
  return code;
};

Blockly.JavaScript['value_random_position'] = function(block) {
  var dropdown_random_type = block.getFieldValue('random_type');
  var code = `randomPosition(CanvasRange, '${dropdown_random_type}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['action_timeout'] = function(block) {
  var number_action_timeout_d = block.getFieldValue('action_timeout_d');
  var code = `await timeout(${number_action_timeout_d})\n`
  return code;
};

Blockly.JavaScript['value_around_position'] = function(block) {
  var number_shifting = block.getFieldValue('shifting');
  var code = `aroundPosition(CanvasRange, ${number_shifting}, environment.person)`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['value_fixed_position'] = function(block) {
  var number_x = block.getFieldValue('X');
  var number_y = block.getFieldValue('Y');
  var code = `{x: ${number_x}, y: ${number_y}}`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['action_inject'] = function(block) {
  var number_rate = block.getFieldValue('rate');
  var code = `changeStateToImmune(environment.world, environment.person, ${number_rate})\n`;
  return code;
};

Blockly.JavaScript['value_is_symptomatic'] = function(block) {
  var code = 'environment.person.healthState==="symptomatic"';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['value_is_pcr'] = function(block) {
  var number_fack_n = block.getFieldValue('fack_n');
  var number_fack_e = block.getFieldValue('fack_e');
  var code = `getIsAsymptomaticOrSymptomatic(environment.person, ${number_fack_n}, ${number_fack_e})`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
const workspace = Blockly.inject("blockly-container", {
  toolbox: document.getElementById("toolbox"),
  media: "media/",
  trashcan: true,
  maxTrashcanContents: 5,
});
Blockly.Xml.domToWorkspace(document.getElementById("workspaceBlocks"), workspace)
workspace.addChangeListener((event) => {
  const code = Blockly.JavaScript.workspaceToCode(workspace)
  document.getElementById('textarea').value = code
})