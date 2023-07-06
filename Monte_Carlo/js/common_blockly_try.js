Blockly.defineBlocksWithJsonArray([{
  "type": "create_map",
  "message0": "Create map",
  "inputsInline": true,
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "map_add",
  "message0": "Add key-value to %1 %2 key %3 value %4",
  "args0": [
    {
      "type": "field_input",
      "name": "map_name",
      "text": "map"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "key"
    },
    {
      "type": "input_value",
      "name": "value"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "map_change",
  "message0": "Change key-value to %1 %2 key: %3",
  "args0": [
    {
      "type": "field_input",
      "name": "map_name",
      "text": "map"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "map_get",
  "message0": "Get value from  %1 %2 key: %3",
  "args0": [
    {
      "type": "field_input",
      "name": "map_name",
      "text": "map"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "NAME"
    }
  ],
  "output": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}, {
  "type": "sort_map",
  "message0": "sort map %1",
  "args0": [
    {
      "type": "input_value",
      "name": "map_name"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}])
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
  alert(Blockly.JavaScript.workspaceToCode(workspace))
}

function runCode() {
  const code = Blockly.JavaScript.workspaceToCode(workspace)
  window.eval(code)
}

function shuffle(array) {
  let m = array.length
  let i
  while (m) {
    i = (Math.random() * m--) >>> 0;
    [array[m], array[i]] = [array[i], array[m]];
  }
  return array
}
function xyIn(x, y) {
  let r = x
  let theta = y * .5 * Math.PI
  return [Math.sin(theta) * Math.sqrt(r), Math.cos(theta) * Math.sqrt(r)]
}
function xyOut(x, y) {
  let r = x
  let theta = Math.sqrt(y * .5 * Math.PI)
  return [Math.sin(theta) * (1 + r), Math.cos(theta) * (1 + r)]
}
class AnmPIM {
  constructor() {
    const mc = document.getElementById("m-demo")
    this.mcv = document.getElementById("mv-demo")
    this.ctx = mc.getContext('2d')
    this.canvasSize = 300
  }

  drawBackground() {
    this.ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#888';
    this.ctx.arc(0, this.canvasSize, this.canvasSize - 1, -0.5 * Math.PI, 0);
    this.ctx.stroke();

    // Draw horizontal and vertical axes
    this.ctx.strokeStyle = '#000';
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvasSize);
    this.ctx.lineTo(this.canvasSize, this.canvasSize);
    this.ctx.moveTo(0, this.canvasSize);
    this.ctx.lineTo(0, 0);
    this.ctx.stroke();

    // Draw tick marks and labels on the x-axis
    const tickSizeX = 10; // Length of tick marks on x-axis
    const tickIntervalX = 30; // Interval between tick marks on x-axis
    this.ctx.strokeStyle = '#000';
    this.ctx.fillStyle = '#000';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.beginPath();
    for (let i = tickIntervalX; i <= this.canvasSize; i += tickIntervalX) {
      this.ctx.moveTo(i, this.canvasSize); ``
      this.ctx.lineTo(i, this.canvasSize - tickSizeX);

      const label = (i / this.canvasSize).toFixed(1);
      this.ctx.fillText(label, i, this.canvasSize - tickSizeX - 1);
    }
    this.ctx.stroke();

    // Draw tick marks and labels on the y-axis
    const tickSizeY = 10; // Length of tick marks on y-axis
    const tickIntervalY = 30; // Interval between tick marks on y-axis
    this.ctx.strokeStyle = '#000';
    this.ctx.fillStyle = '#000';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'end';
    this.ctx.beginPath();
    for (let i = tickIntervalY; i <= this.canvasSize; i += tickIntervalY) {
      this.ctx.moveTo(4, i);
      this.ctx.lineTo(tickSizeY, i);

      const label = (1 - i / this.canvasSize).toFixed(1);
      this.ctx.fillText(label, tickSizeY + 10, i);
    }
    this.ctx.stroke();

    this.counter = {
      total: 0,
      hint: 0
    };
  }




  plotOnCanvas(x, y, color) {
    color && (this.ctx.fillStyle = color)
    this.ctx.beginPath()
    this.ctx.arc(x, y, 1, 0, 2 * Math.PI)
    this.ctx.fill()
  }
  randerHTML() {
    return `\
      <a>Total: ${this.counter.total.toFixed(0)}</a>
      <a>Hint: ${this.counter.hint.toFixed(0)}</a>
      <a>Pi: ${(this.counter.hint / this.counter.total * 4).toFixed(3)}</a>
    `
  }
  *tick() {
    const anmLength = 300
    const emPI = (Math.PI + (Math.random() - .5) * .02) / 4
    const pseudRandomList = shuffle(
      Array.from(
        { length: anmLength },
        (_, i) => i <= anmLength * emPI ? 1 : 0
      )
    )
    console.log(pseudRandomList)
    for (let i = 0; i < anmLength; i++) {
      let [x, y] = [Math.random(), Math.random()];
      [x, y] = (pseudRandomList[i] == 1 ? xyIn : xyOut)(x, y)
      this.counter.total++
      let color = '#f00'
      if (x * x + y * y <= 1) {
        this.counter.hint++
        color = '#00f'
      }
      this.plotOnCanvas(x * this.canvasSize, (1 - y) * this.canvasSize, color)
      this.mcv.innerHTML = this.randerHTML()
      yield i
    }
  }
  start() {
    const iter = this.tick()
    this.drawBackground()
    this.timer = setInterval(() => {
      if (iter.next().done) {
        this.stop()
      }
    }, 100)
  }
  stop() {
    this.timer && clearInterval(this.timer)
  }
}

function startAim() {
  try {
    new AnmPIM().start()
  } catch (error) {
  
  }
}
document.getElementById("aim-start").addEventListener("click", startAim)