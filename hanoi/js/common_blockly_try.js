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
