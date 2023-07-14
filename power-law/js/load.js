
const workspace1 = Blockly.inject('blocklydiv1', {
  toolbox: document.getElementById('toolbox'),
  media: 'media/',
  trashcan: true,
  maxTrashcanContents: 5
})
const workspace2 = Blockly.inject('blocklydiv2', {
  toolbox: document.getElementById('toolbox'),
  media: 'media/',
  trashcan: true,
  maxTrashcanContents: 5
})
// 做了改动
if (document.getElementById("workspaceBlocks1")) {
  Blockly.Xml.domToWorkspace(document.getElementById("workspaceBlocks1"), workspace1)
}
if (document.getElementById("workspaceBlocks2")) {
  Blockly.Xml.domToWorkspace(document.getElementById("workspaceBlocks2"), workspace2)
}

function exportCode() {
  alert(`${Blockly.JavaScript.workspaceToCode(workspace1)}\n${Blockly.JavaScript.workspaceToCode(workspace2)}`)
}

// function evalAndCheck(funcName) { // 是否未更新: true未更新 false更新 -1未找到 其他error
//   const code1 = Blockly.JavaScript.workspaceToCode(workspace1)
//   const code2 = Blockly.JavaScript.workspaceToCode(workspace2)
//   let oldFuncSrc = ""
//   if(window.hasOwnProperty(funcName)) { // 已有该函数
//     oldFuncSrc = window[funcName].toString()
//   }
//   try {
//     window.eval(code1)
//     window.eval(code2)
//   } catch (error) {
//     return error
//   }
//   if(window.hasOwnProperty(funcName)) {
//     return oldFuncSrc == window[funcName].toString()
//   } else {
//     return -1
//   }
// }

function evalAndCheck1(funcName) { // 是否未更新: true未更新 false更新 -1未找到 其他error
  const code1 = Blockly.JavaScript.workspaceToCode(workspace1)
  let oldFuncSrc = ""
  if (window.hasOwnProperty(funcName)) { // 已有该函数
    oldFuncSrc = window[funcName].toString()
  }
  try {
    window.eval(code1)
  } catch (error) {
    return error
  }
  if (window.hasOwnProperty(funcName)) {
    return oldFuncSrc == window[funcName].toString()
  } else {
    return -1
  }
}
function evalAndCheck2(funcName) { // 是否未更新: true未更新 false更新 -1未找到 其他error
  const code2 = Blockly.JavaScript.workspaceToCode(workspace2)
  let oldFuncSrc = ""
  if (window.hasOwnProperty(funcName)) { // 已有该函数
    oldFuncSrc = window[funcName].toString()
  }
  try {
    window.eval(code2)
  } catch (error) {
    return error
  }
  if (window.hasOwnProperty(funcName)) {
    return oldFuncSrc == window[funcName].toString()
  } else {
    return -1
  }
}

function prepareWord(text) {
  return text.toLowerCase().replace(/[^a-z]+/g, " ").replace(/\s+/g, " ")
}
function prepareLetter(text) {
  return text.toLowerCase().replace(/[^a-z]+/g, "")
}

function countWord() {
  const isNotUpdated = evalAndCheck1("WordCount")
  if (isNotUpdated === false || isNotUpdated === true) {
    // 新增代码段：检查文本区域是否为空
    if (textarea.value.trim() === '') {
      alert("请输入一些文本以计算单词数。")
      return;
    }
    // 正常
    let listData = window["WordCount"](prepareWord(textarea.value))
    listData = [["Word", "Count"]].concat(listData)
    if (listData.length > 1) {
      drawChart(listData)
    } else {
      alert("WordCount函数输出为空，请检查代码和输入文本是否正确")
    }
  } else if (isNotUpdated === -1) {
    // 函数未找到
    alert("未找到WordCount函数，请检查代码")
  } else {
    // 异常
    alert("代码执行出错，请检查代码\n" + e)
  }
  try {
    delete window["WordCount"]
  } catch (error) {
    console.error(error)
  }
}

function countLetter() {
  const isNotUpdated = evalAndCheck2("LetterCount")
  if (isNotUpdated === false || isNotUpdated === true) {
    // 新增代码段：检查文本区域是否为空
    if (textarea.value.trim() === '') {
      alert("请输入一些文本以计算字母数。")
      return;
    }
    // 正常
    let listData = window["LetterCount"](prepareLetter(textarea.value))
    listData = [["Letter", "Count"]].concat(listData)
    if (listData.length > 1) {
      drawChart(listData)
    } else {
      alert("LetterCount函数输出为空，请检查代码和输入文本是否正确")
    }
  } else if (isNotUpdated === -1) {
    // 函数未找到
    alert("未找到LetterCount函数，请检查代码")
  } else {
    // 异常
    alert("代码执行出错，请检查代码\n" + e)
  }
  try {
    delete window["LetterCount"]
  } catch (error) {
    console.error(error)
  }
}


function drawChart(listData) {
  var data = google.visualization.arrayToDataTable(listData);
  console.log(listData);
  var view = new google.visualization.DataView(data);
  var chart = new google.visualization.ColumnChart(document.getElementById("visualization"));

  var options = {
    chartArea: {
      width: '80%',  // 设置图表区域宽度
      height: '80%', // 设置图表区域高度
      left: '10%',   // 设置图表区域左边距
      top: '2%',    // 设置图表区域上边距
    },
    hAxis: {
      slantedText: true,   // 斜体显示横轴标签
      slantedTextAngle: 60, // 设置斜体角度
      format: 'none',      // 禁用自动格式化横轴标签
      maxAlternation: 1,
    },

    legend: {
      position: 'top', // 设置图例位置在顶部
    },
    width: '100%',       // 设置整个图表宽度
    height: 210,         // 设置整个图表高度

  };

  chart.draw(view, options);
  document.getElementById("visualization").scrollIntoView();
}

google.charts.load('current', { packages: ['corechart', 'bar'] });




function updateButtonVisibility() {
  // 获取按钮元素
  var countWordBtn = document.querySelector('#panel button:nth-child(2)');
  var countLetterBtn = document.querySelector('#panel button:nth-child(3)');

  // 获取当前活动的导航项
  var activeTab = document.querySelector('#myTab .active').getAttribute('data-target');

  // 根据当前导航项显示或隐藏按钮
  if (activeTab === '#home') {
    countWordBtn.style.display = 'inline-block';
    countLetterBtn.style.display = 'none';
  } else if (activeTab === '#profile') {
    countWordBtn.style.display = 'none';
    countLetterBtn.style.display = 'inline-block';
  }
}

// 在页面加载完成后执行一次更新按钮可见性
window.addEventListener('DOMContentLoaded', function () {
  updateButtonVisibility();

  // 模拟点击导航栏的统计字母频率按钮
  var countLetterNav = document.querySelector('#profile-tab');
  countLetterNav.click();

});


const textarea = document.getElementById("textarea")
const file = document.getElementById("file")
const notice = document.getElementById("notice")
function fileInput() {
    const event = new MouseEvent("click")
    file.dispatchEvent(event)
}
function preventEvent(event) {
    event.stopPropagation()
    event.preventDefault()
}
function fileListHander(list) {
    if(list.length == 0) {
        return false
    }
    if(list[0].type != "text/plain") {
        alert('只接受TXT文件')
        return false
    }
    const reader = new FileReader()
    const f = list[0]
    reader.addEventListener('load', event => {
        const text = event.target.result
        textarea.value = text
        inputHander()
    })
    reader.readAsText(f)
}
function checkText(text) {
    const checkList = [
        [/[\u2010-\u201F\u3001-\u301F\uFF01-\uFF1F]/, "中文标点符号"],
        [/[\u4E00-\u9FA5]/, "中文字符"],
        [/./, "非英文字符"]
    ]
    if(text.match(/^[\s!-~]*$/g)) {
        return null
    }
    for(const [check, notice] of checkList) {
        if(text.match(check)) {
            return `输入中包含“${notice}”`
        }
    }
    return "非法字符"
}
function inputHander(event) {
    const text = textarea.value
    console.log(text)
    const check = checkText(text)
    if(check) {
        notice.innerText = check
    } else {
        notice.innerText = ""
    }
}
file.addEventListener("change", () => {
    fileListHander(file.files)
})
document.addEventListener("dragenter", preventEvent)
document.addEventListener("dragover", preventEvent)
document.addEventListener("drop", event => {
    preventEvent(event)
    fileListHander(event.dataTransfer.files)
})
textarea.addEventListener("input", inputHander)

window.addEventListener('DOMContentLoaded', function () {
  var navItems = document.querySelectorAll('li.nav-item');
  var targetHref = 'power_law.html';

  navItems.forEach(function (item) {
    var link = item.querySelector('a.nav-link');
    if (link.getAttribute('href') === targetHref) {
      link.classList.add('active');
    }
  });
});
