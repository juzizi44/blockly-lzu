const workspace1 = Blockly.inject('blocklydiv1', {
  toolbox: document.getElementById('toolbox'),
  media: 'media/',
  trashcan: true,
  maxTrashcanContents: 5
})
Blockly.Xml.domToWorkspace(document.getElementById("workspaceBlocks1"), workspace1)

function exportCode() {
  const code = Blockly.JavaScript.workspaceToCode(workspace1);

  // 创建一个包含多行文本的文本区域
  const textArea = document.createElement("textarea");
  textArea.value = code;
  textArea.style.width = "400px";
  textArea.style.height = "400px";
  textArea.style.padding = '10px';

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

const code = Blockly.JavaScript.workspaceToCode(workspace1);
eval(code);
document.getElementById("visualization").innerHTML = `
  <div>试验次数：${experiment_times}</div>
  <div>不换门，猜中次数为：${notchange_win}，概率是：${notchange_win / experiment_times}</div>
  <div>换门，猜中次数为：${change_win}，概率是：${change_win / experiment_times}</div>
`;

function result() {
  const code = Blockly.JavaScript.workspaceToCode(workspace1);
  eval(code);
  document.getElementById("visualization").innerHTML = `
  <div>试验次数：${experiment_times}</div>
  <div>不换门，猜中次数为：${notchange_win}，概率是：${notchange_win / experiment_times}</div>
  <div>换门，猜中次数为：${change_win}，概率是：${change_win / experiment_times}</div>
`;
}







