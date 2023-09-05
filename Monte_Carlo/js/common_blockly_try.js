// Blockly.defineBlocksWithJsonArray([{
//   "type": "create_map",
//   "message0": "Create map",
//   "inputsInline": true,
//   "output": null,
//   "colour": 230,
//   "tooltip": "",
//   "helpUrl": ""
// },
// {
//   "type": "map_add",
//   "message0": "Add key-value to %1 %2 key %3 value %4",
//   "args0": [
//     {
//       "type": "field_input",
//       "name": "map_name",
//       "text": "map"
//     },
//     {
//       "type": "input_dummy"
//     },
//     {
//       "type": "input_value",
//       "name": "key"
//     },
//     {
//       "type": "input_value",
//       "name": "value"
//     }
//   ],
//   "previousStatement": null,
//   "nextStatement": null,
//   "colour": 230,
//   "tooltip": "",
//   "helpUrl": ""
// },
// {
//   "type": "map_change",
//   "message0": "Change key-value to %1 %2 key: %3",
//   "args0": [
//     {
//       "type": "field_input",
//       "name": "map_name",
//       "text": "map"
//     },
//     {
//       "type": "input_dummy"
//     },
//     {
//       "type": "input_value",
//       "name": "NAME"
//     }
//   ],
//   "previousStatement": null,
//   "nextStatement": null,
//   "colour": 230,
//   "tooltip": "",
//   "helpUrl": ""
// },
// {
//   "type": "map_get",
//   "message0": "Get value from  %1 %2 key: %3",
//   "args0": [
//     {
//       "type": "field_input",
//       "name": "map_name",
//       "text": "map"
//     },
//     {
//       "type": "input_dummy"
//     },
//     {
//       "type": "input_value",
//       "name": "NAME"
//     }
//   ],
//   "output": null,
//   "colour": 230,
//   "tooltip": "",
//   "helpUrl": ""
// }, {
//   "type": "sort_map",
//   "message0": "sort map %1",
//   "args0": [
//     {
//       "type": "input_value",
//       "name": "map_name"
//     }
//   ],
//   "previousStatement": null,
//   "nextStatement": null,
//   "colour": 230,
//   "tooltip": "",
//   "helpUrl": ""
// }])
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

function shuffle(array) {
  let m = array.length;
  let i;
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [array[m], array[i]] = [array[i], array[m]];
  }
  return array;
}
function xyIn(x, y) {
  let r = x;
  let theta = y * 0.5 * Math.PI;
  return [Math.sin(theta) * Math.sqrt(r), Math.cos(theta) * Math.sqrt(r)];
}
function xyOut(x, y) {
  let r = x;
  let theta = Math.sqrt(y * 0.5 * Math.PI);
  return [Math.sin(theta) * (1 + r), Math.cos(theta) * (1 + r)];
}
class AnmPIM {
  constructor() {
    const mc = document.getElementById("m-demo");
    this.mcv = document.getElementById("mv-demo");
    this.ctx = mc.getContext("2d");
    this.canvasSize = 250;
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#888";
    this.ctx.arc(30, this.canvasSize, this.canvasSize - 1, -0.5 * Math.PI, 0);
    this.ctx.stroke();

    // Draw horizontal and vertical axes
    this.ctx.strokeStyle = "#000";
    this.ctx.beginPath();
    // console.log(this.canvasSize);
    this.ctx.moveTo(30, this.canvasSize);
    this.ctx.lineTo(this.canvasSize + 30, this.canvasSize);
    this.ctx.moveTo(30, this.canvasSize);
    this.ctx.lineTo(30, 0);
    this.ctx.stroke();

    // Draw tick marks and labels on the x-axis
    const tickSizeX = 5; // Length of tick marks on x-axis
    const tickIntervalX = 25; // Interval between tick marks on x-axis
    this.ctx.strokeStyle = "#000";
    this.ctx.fillStyle = "#000";
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "center";
    this.ctx.beginPath();
    for (let i = tickIntervalX - 25; i < this.canvasSize; i += tickIntervalX) {
      this.ctx.moveTo(i + 30, this.canvasSize);
      ``;
      this.ctx.lineTo(i + 30, this.canvasSize - tickSizeX);

      const label = (i / this.canvasSize).toFixed(1);
      this.ctx.fillText(label, i + 30, this.canvasSize - tickSizeX + 20);
    }
    this.ctx.stroke();

    // Draw tick marks and labels on the y-axis
    const tickSizeY = 5; // Length of tick marks on y-axis
    const tickIntervalY = 25; // Interval between tick marks on y-axis
    this.ctx.strokeStyle = "#000";
    this.ctx.fillStyle = "#000";
    this.ctx.font = "12px Arial";
    this.ctx.textAlign = "end";
    this.ctx.beginPath();
    for (let i = tickIntervalY; i <= this.canvasSize; i += tickIntervalY) {
      this.ctx.moveTo(30, i);
      this.ctx.lineTo(25, i);

      const label = (1 - i / this.canvasSize).toFixed(1);
      this.ctx.fillText(label, tickSizeY + 15, i);
    }
    this.ctx.stroke();

    this.counter = {
      total: 0,
      hint: 0,
    };
  }

  plotOnCanvas(x, y, color) {
    color && (this.ctx.fillStyle = color);
    this.ctx.beginPath();
    this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  randerHTML() {
    return `\
      <a>Total: ${this.counter.total.toFixed(0)}</a>
      <a>Hint: ${this.counter.hint.toFixed(0)}</a>
      <a>Pi: ${((this.counter.hint / this.counter.total) * 4).toFixed(3)}</a>
    `;
  }
  *tick() {
    const anmLength = 300;
    const emPI = (Math.PI + (Math.random() - 0.5) * 0.02) / 4;
    const pseudRandomList = shuffle(
      Array.from({ length: anmLength }, (_, i) =>
        i <= anmLength * emPI ? 1 : 0
      )
    );
    console.log(pseudRandomList);
    for (let i = 0; i < anmLength; i++) {
      let [x, y] = [Math.random(), Math.random()];
      [x, y] = (pseudRandomList[i] == 1 ? xyIn : xyOut)(x, y);
      this.counter.total++;
      let color = "#f00";
      if (x * x + y * y <= 1) {
        this.counter.hint++;
        color = "#00f";
      }
      this.plotOnCanvas(
        x * this.canvasSize + 30,
        (1 - y) * this.canvasSize,
        color
      );
      // 进行了修改
      this.mcv.innerHTML = this.randerHTML();
      yield i;
    }
  }
  start() {
    const iter = this.tick();
    this.drawBackground();
    this.timer = setInterval(() => {
      if (iter.next().done) {
        this.stop();
      }
    }, 100);
  }
  stop() {
    this.timer && clearInterval(this.timer);
  }
}

function startAim() {
  try {
    new AnmPIM().start();
  } catch (error) {}
}
document.getElementById("aim-start").addEventListener("click", startAim);

window.addEventListener("DOMContentLoaded", function () {
  var navItems = document.querySelectorAll("li.nav-item");
  var targetHref = "Monte_Carlo.html";

  navItems.forEach(function (item) {
    var link = item.querySelector("a.nav-link");
    if (link.getAttribute("href") === targetHref) {
      link.classList.add("active");
    }
  });
});