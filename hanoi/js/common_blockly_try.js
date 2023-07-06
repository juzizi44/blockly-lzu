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


const app = Vue.createApp(HanoiActionList)
               .component('hanoi-action', HanoiActionComponent)
window.vm = app.mount('#hanoi-action-list')

const plateNumInput = document.getElementById('plate-num')
plateNumInput.addEventListener('change', function (event) {
  console.log(this.valueAsNumber)
  if(!this.checkValidity()) {
    alert(this.validationMessage)
    return
  }
  changeHanoi(this.valueAsNumber)
})

function changeHanoi(plateNum = 3) {
  const hanoiUI = new Hanoi(plateNum)
  app.config.globalProperties.$hanoi = hanoiUI
  hanoiUI.handleModified = () => {
    vm.$data.isModified = true
  }
  vm.$data.isModified = true
}

changeHanoi()

function runCode() {
  const code = 'let listOfAction = [];\n\
                function move(plate, src, dst) {\n\
                  listOfAction.push([plate - 1, src - 1, dst - 1])\n\
                };\n' + Blockly.JavaScript.workspaceToCode(workspace) + 
                ';\nwindow.vm.$data.actionList= listOfAction;'
  window.eval(code)
}