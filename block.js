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



  Blockly.defineBlocksWithJsonArray([{
    "type": "define_gene_structure",
    "message0": "Define Gene Structure %1 bit %2 Popnum %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "bit"
      },
      {
        "type": "input_value",
        "name": "popnum"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "initializing_population",
    "message0": "初始化种群",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "define_functions",
    "message0": "定义必要的函数",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "selection",
    "message0": "轮盘赌选择法",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "totenandcalfitvalue",
    "message0": "二进制转换为十进制并且计算适应度函数值",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "mutation",
    "message0": "变异",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "bestgene",
    "message0": "记录最大值",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }])
  
  Blockly.JavaScript['define_gene_structure'] = function(block) {
    var value_bit = Blockly.JavaScript.valueToCode(block, 'bit', Blockly.JavaScript.ORDER_ATOMIC);
    var value_popnum = Blockly.JavaScript.valueToCode(block, 'popnum', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `var gene = {
        "geneBit": undefined, //基因
        "fitValue": undefined //该基因对应的适应度函数值
  };\n
  var bit =`+value_bit+`; //基因的位数
  var Popnum = `+value_popnum+`; //染色体个数
  var Pop = new Array(); //种群
  var bestValue = 0; //最大值
  var bestGeneTenValue = 0; //最大值对应的数值\n`;
    return code;
  };
  
  Blockly.JavaScript['initializing_population'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
  createPop()
  `;
    return code;
  };
  
  Blockly.JavaScript['define_functions'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
  function createSingle() {
      var str = "";
      for (var i = 0; i < bit - 1; i++) {
          if (Math.random() < 0.5) {
              str += "1";
          } else {
              str += "0";
          }
      }
  
      //保证产生的数在[0,30]内
      if (str == "1111") {
          str += 0;
      } else {
          if (Math.random() < 0.5) {
              str += "1";
          } else {
              str += "0";
          }
      }
      return str;
  }
  
  // 计算适应度函数值
  function calFitValue(x) {
      return x * x * x - 60 * x * x + 900 * x + 100;
  }
  
  // 二进制转化成十进制（译码）
  function toTen(x) {
      return x[0] * 16 + x[1] * 8 + x[2] * 4 + x[3] * 2 + x[4] * 1;
  }
  
  // 交叉（单点）
  function crossover(x, y) {
      if (Math.random() < 0.6) { //变异概率为0.6
          var str1, str2, tem1 = 0,
              tem2 = 0;
          var pos = Math.floor(Math.random() * bit);
          str1 = Pop[x].geneBit.substring(pos);
          str2 = Pop[y].geneBit.substring(pos);
          Pop[x].geneBit = Pop[x].geneBit.substring(0, pos) + str2;
          Pop[y].geneBit = Pop[y].geneBit.substring(0, pos) + str1;
  
          // 为交叉后得到的个体计算适应度值
          tem1 = toTen(Pop[x].geneBit);
          Pop[x].fitValue = calFitValue(tem1);
          tem2 = toTen(Pop[y].geneBit);
          Pop[y].fitValue = calFitValue(tem2);
      }
  } 
  function mutation() {
      for (var j = 0; j < Popnum; j++) {
          if (Math.random() < 0.01) { //变异概率为0.01
              var pos = Math.floor(Math.random() * bit);
              var tem = 0;
              if (Pop[j].geneBit[pos] == "1") {
                  Pop[j].geneBit[pos] = "0";
              } else {
                  Pop[j].geneBit[pos] = "1";
              }
  
              // 为变异后得到的个体计算适应度值
              tem = toTen(Pop[j].geneBit);
              Pop[j].fitValue = calFitValue(tem);
          }
      }
  }
  
  function selection() {
      var totallFitValue = 0; //总的适应度
      var choicePro = new Array(Popnum); //每个染色体的适应度值对应的概率
      var sumChoicePro = new Array(Popnum); //累计概率
      for (var j = 0; j < Popnum; j++) {
          totallFitValue += Pop[j].fitValue;
      }
      for (var j = 0; j < Popnum; j++) {
          choicePro[j] = Pop[j].fitValue / totallFitValue;
          if (j != 0) {
              sumChoicePro[j] = sumChoicePro[j - 1] + choicePro[j];
          } else {
              sumChoicePro[j] = choicePro[j];
          }
      }
  
      for (var j = 0; j < Popnum - 1; j++) {
          var rand = Math.random();
          for (var k = 0; k < Popnum - 1; k++) {
              if (rand <= sumChoicePro[k]) {
                  crossover(k, k + 1); //选择出来的染色体与他下一个进行交叉
                  break;
              }
          }
      }
  }
  function bestGene() {
      bestValue = 0, bestGeneTenValue = 0;
      for (var j = 0; j < Popnum; j++) {
          if (Pop[j].fitValue > bestValue) {
              bestValue = Pop[j].fitValue;
              bestGeneTenValue = toTen(Pop[j].geneBit);
          }
      }
  }
  function toTenAndCalFitValue() {
      for (var j = 0; j < Popnum; j++) {
          var tenValue = toTen(Pop[j].geneBit);
          Pop[j].fitValue = calFitValue(tenValue);
      }
  }
  function createPop() {
      for (var j = 0; j < Popnum; j++) {
          Pop[j] = new Object();
          Pop[j].geneBit = createSingle();
      }
  }
  `;
    return code;
  };
  
  Blockly.JavaScript['selection'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
  selection();`;
    return code;
  };
  
  Blockly.JavaScript['totenandcalfitvalue'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
  toTenAndCalFitValue();`;
    return code;
  };
  
  Blockly.JavaScript['mutation'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
  mutation();`;
    return code;
  };
  
  Blockly.JavaScript['bestgene'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = `
  bestGene();`;
    return code;
  };

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


Blockly.defineBlocksWithJsonArray([{
    "type": "graph_get_x",
    "message0": "%1 x",
    "args0": [
      {
          "type": "field_number",
          "name": "COEFFICIENT",
          "value": 1
      }
  ],
    "output": "Number",
    "colour": Blockly.Msg['VARIABLES_HUE'],
    "tooltip": Blockly.Msg['VARIABLES_GET_TOOLTIP'],
    "helpUrl": Blockly.Msg['VARIABLES_GET_HELPURL']
}]);

// Blockly.JavaScript['graph_get_x'] = function (block) {
//     // x variable getter.
//     return ['x', Blockly.JavaScript.ORDER_ATOMIC];
// };
Blockly.JavaScript['graph_get_x'] = function (block) {
  // x variable getter.
  var coefficient = block.getFieldValue('COEFFICIENT');
  var code = coefficient + ' * x';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.defineBlocksWithJsonArray([{
    "type": "graph_set_y",
    "message0": "y = %1",
    "args0": [
        {
            "type": "input_value",
            "name": "VALUE",
            "check": "Number"
        }
    ],
    "colour": Blockly.Msg['VARIABLES_HUE'],
    "tooltip": Blockly.Msg['VARIABLES_SET_TOOLTIP'],
    "helpUrl": Blockly.Msg['VARIABLES_SET_HELPURL']
}]);

Blockly.JavaScript['graph_set_y'] = function (block) {
    // y variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '';
    return 'y = ' + argument0 + ';';
};

Blockly.defineBlocksWithJsonArray([
  {
      "type": "math_custom_log",
      "message0": "log base %1 of %2",
      "args0": [
          {
              "type": "input_value",
              "name": "BASE",
              "check": "Number"
          },
          {
              "type": "input_value",
              "name": "VALUE2",
              "check": "Number"
          }
      ],
      "output": "Number",
      "colour": Blockly.Msg['MATH_HUE'],
      "tooltip": "Calculate logarithm with custom base",
      "helpUrl": ""
  }
]);
Blockly.JavaScript['math_custom_log'] = function (block) {
  // Custom logarithm calculation.
  var base = Blockly.JavaScript.valueToCode(block, 'BASE', Blockly.JavaScript.ORDER_ATOMIC);
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE2', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'Math.log(' + value + ') / Math.log(' + base + ')';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.defineBlocksWithJsonArray([
  {
    "type": "math_normal_distribution",
    "message0": "random normal distribution %1 mean %2 standard deviation %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "MEAN",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "STD_DEV",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": Blockly.Msg['MATH_HUE'],
    "tooltip": "Generate a random number from normal distribution",
    "helpUrl": ""
  }
]);

Blockly.JavaScript['math_normal_distribution'] = function (block) {
  // Normal distribution random number generation.
  var mean = Blockly.JavaScript.valueToCode(block, 'MEAN', Blockly.JavaScript.ORDER_ATOMIC);
  var stdDev = Blockly.JavaScript.valueToCode(block, 'STD_DEV', Blockly.JavaScript.ORDER_ATOMIC);

  var code = `Math.sqrt(-2.0 * Math.log((function() { let u; while (!(u = Math.random())); return u; })())) * Math.cos(2.0 * Math.PI * Math.random()) * ${stdDev} + ${mean}`;

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};





Blockly.defineBlocksWithJsonArray([{
    "type": "move",
    "message0": "move NO.%1 plate from position %2 to position %3",
    "args0": [
      {
        "type": "input_value",
        "name": "plate"
      },
      {
        "type": "input_value",
        "name": "start"
      },
      {
        "type": "input_value",
        "name": "end"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }])
  
  Blockly.JavaScript['move'] = function(block) {
    var value_plate = Blockly.JavaScript.valueToCode(block, 'plate', Blockly.JavaScript.ORDER_ATOMIC)
    var value_start = Blockly.JavaScript.valueToCode(block, 'start', Blockly.JavaScript.ORDER_ATOMIC)
    var value_end = Blockly.JavaScript.valueToCode(block, 'end', Blockly.JavaScript.ORDER_ATOMIC)
    
    var code = `move(${value_plate}, ${value_start}, ${value_end})\n`
    return code
  }

// 幂律增加的块===================================================

  Blockly.defineBlocksWithJsonArray([{
    "type": "create_map",
    "message0": "Create map",
    "inputsInline": true,
    "output": null,
    "colour": 230,
    "tooltip": "Create a empty map",
    "helpUrl": ""
  },
  {
    "type": "map_add",

    "message0": "Add key %1  in %2 %4 value %3 ",

    "args0": [
      {
        "type": "input_value",
        "name": "key"
      },
    
      {
        "type": "field_input",
        "name": "map_name",
        "text": "map"
      },
      {
        "type": "input_value",
        "name": "value"
      },
      {
        "type": "input_dummy"
      },


    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Add a key value pair to a map",
    "helpUrl": ""
  },
  {
    "type": "map_change",
    "message0": "Change key %1  in  %2  %4 value %3 ",
    "args0": [
      {
        "type": "input_value",
        "name": "NAME"
      },
   
      {
        "type": "field_input",
        "name": "map_name",
        "text": "map"
      },
    
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "input_dummy"
      },
  
   

    ],
 
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Change the value of given key by new value",
    "helpUrl": ""
  },
  
  
  {
    "type": "map_get",
    "message0": "get key %2 in %1  ",
    "args0": [
      {
        "type": "field_input",
        "name": "map_name",
        "text": "map"
      },
      {
        "type": "input_value",
        "name": "NAME"
      }
    ],
    "output": null,
    "colour": 230,
    "tooltip": "Get the value of given key in a map",
    "helpUrl": ""
  },
  
  {
    "type": "sort_map",
    "message0": "sort map %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "map_name"
      },
      {
        "type": "field_dropdown",
        "name": "sort_type",
        "options": [
          ["by value", "VALUE"],
          ["by key", "KEY"]
          
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Sort the map by key or value",
    "helpUrl": ""
  }
  
  
  ])
  Blockly.JavaScript['create_map'] = function (block) {
    var code = '{}';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  
  Blockly.JavaScript['map_add'] = function (block) {
    var map_name = block.getFieldValue('map_name');
    var value_key = Blockly.JavaScript.valueToCode(block, 'key', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
    var code = map_name + '[' + value_key + '] = ' + value_value + ';\n';
    return code;
  };
  
  Blockly.JavaScript['map_change'] = function (block) {
    var map_name = block.getFieldValue('map_name');
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var value_va = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);

    var code = map_name + '[' + value_name + '] = '+value_va+' ;\n';
    return code;
  };
  
  Blockly.JavaScript['map_get'] = function (block) {
    var map_name = block.getFieldValue('map_name');
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = map_name + '[' + value_name + ']\n';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };
  
  Blockly.JavaScript['sort_map'] = function (block) {
    var map_name = Blockly.JavaScript.valueToCode(block, 'map_name', Blockly.JavaScript.ORDER_ATOMIC);
    var sort_type = block.getFieldValue('sort_type');
    if (sort_type == 'KEY') {
      var code = `\
      var sdic=Object.keys(${map_name}).sort();
  var sval = [];
  for (var i=0; i<sdic.length ; i++){
  sval.push([sdic[i], ${map_name}[sdic[i]]]);
  }
  ${map_name}=sval
    `;
    } else {
      var code = `\
  var sdic=Object.keys(${map_name}).sort(function(a,b){return ${map_name}[b]-${map_name}[a]});
  var sval = [];
  for (var i=0; i<sdic.length ; i++){
  sval.push([sdic[i], ${map_name}[sdic[i]]]);
  }
  ${map_name}=sval
  `};
    return code;
  };
  