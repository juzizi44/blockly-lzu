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
  const code = 'let listOfAction = [];\n' +
    'function move(plate, src, dst) {\n' +
    '  const srcIndex = Number(src.replace("柱子", "")) - 1;\n' +
    '  const dstIndex = Number(dst.replace("柱子", "")) - 1;\n' +
    '  listOfAction.push([plate - 1, srcIndex, dstIndex]);\n' +
    '};\n' +
    Blockly.JavaScript.workspaceToCode(workspace) +
    ';\nwindow.vm.$data.actionList = listOfAction;';

  console.log(code);
  window.eval(code);
}
