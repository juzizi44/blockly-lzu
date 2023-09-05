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

const workspace = Blockly.inject('blocklydiv', {
  toolbox: document.getElementById('toolbox'),
  media: 'media/',
  trashcan: true,
  maxTrashcanContents: 5
})
try {
  Blockly.Xml.domToWorkspace(document.getElementById("workspaceBlocks"), workspace)
} catch (error) {
  
}

function exportCode() {
  const code = Blockly.JavaScript.workspaceToCode(workspace);

  // 创建一个包含多行文本的文本区域
  const textArea = document.createElement("textarea");
  textArea.value = code;
  textArea.style.width = "400px";
  textArea.style.height = "400px";
  textArea.style.padding = "10px";

  // 创建关闭按钮
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.margin = "10px";
  closeButton.addEventListener("click", function () {
    // 关闭对话框时从页面中移除对话框元素
    document.body.removeChild(dialog);
  });

  // 创建自定义对话框
  const dialog = document.createElement("div");
  dialog.style.position = "fixed";
  dialog.style.top = "50%";
  dialog.style.left = "50%";
  dialog.style.transform = "translate(-50%, -50%)";
  dialog.style.padding = "10px";
  dialog.style.backgroundColor = "#fff";
  dialog.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
  dialog.style.borderRadius = "10px"; // 添加圆角
  dialog.style.display = "flex"; // 使用flexbox布局
  dialog.style.flexDirection = "column"; // 垂直布局
  dialog.appendChild(textArea);
  dialog.appendChild(closeButton);

  // 设置对话框在页面中置顶
  dialog.style.zIndex = "9999";

  // 添加对话框到页面中
  document.body.appendChild(dialog);
}

function runCode() {
  const code = Blockly.JavaScript.workspaceToCode(workspace);
  window.eval(code);
}

window.addEventListener("DOMContentLoaded", function () {
  var navItems = document.querySelectorAll("li.nav-item");
  var targetHref = "evolutionary.html";

  navItems.forEach(function (item) {
    var link = item.querySelector("a.nav-link");
    if (link.getAttribute("href") === targetHref) {
      link.classList.add("active");
    }
  });
});