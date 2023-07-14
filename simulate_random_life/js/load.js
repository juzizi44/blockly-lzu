const workspace1 = Blockly.inject('blocklydiv1', {
  toolbox: document.getElementById('toolbox'),
  media: 'media/',
  trashcan: true,
  maxTrashcanContents: 5
})


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


Blockly.Xml.domToWorkspace(document.getElementById("workspaceBlocks1"), workspace1)



function drawChart() {
  // 在每次执行 drawChart 之前销毁之前的 Chart 实例
  if (window.myChart) {
    window.myChart.destroy();
}
  // 执行 Blockly.JavaScript.workspaceToCode(workspace1) 获取代码结果
  var code = Blockly.JavaScript.workspaceToCode(workspace1);

  // 执行生成的代码
  eval(code);

  // 绘制柱状图
  const ctx = document.getElementById('wealthChart').getContext('2d');
  const labels = result.map((_, index) => `Individual ${index + 1}`);
  const data = result;
  window.myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Wealth Distribution',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // 柱状图背景颜色
        borderColor: 'rgba(54, 162, 235, 1)', // 柱状图边框颜色
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Wealth'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Individual'
          }
        }
      }
  }
  });

}

window.addEventListener('DOMContentLoaded', function () {
  var navItems = document.querySelectorAll('li.nav-item');
  var targetHref = 'simulate_random_life.html';

  navItems.forEach(function (item) {
    var link = item.querySelector('a.nav-link');
    if (link.getAttribute('href') === targetHref) {
      link.classList.add('active');
    }
  });
});


