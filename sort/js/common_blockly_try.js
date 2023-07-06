const workspace = Blockly.inject('blocklydiv', {
    toolbox: document.getElementById('toolbox'),
    media: 'media/',
    trashcan: true,
    maxTrashcanContents: 5
})
if(localStorage && localStorage.getItem(new URL(location).pathname)) { // auto save && recovery
    const xmlData = Blockly.Xml.textToDom(localStorage.getItem(new URL(location).pathname))
    Blockly.Xml.domToWorkspace(xmlData, workspace)
} else {
    Blockly.Xml.domToWorkspace(document.getElementById("workspaceBlocks"), workspace)
}
workspace.addChangeListener((event) => {
    const xmlData = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace))
    localStorage.setItem(new URL(location).pathname,  xmlData)
    // document.getElementById('textarea').value = code
})

// 注入重置按钮
const buttonAddT = document.createElement("button")
buttonAddT.innerHTML = "<br>重置工作区<br><br>"
buttonAddT.style.backgroundColor = "#fff"
buttonAddT.addEventListener('click', () => {
    workspace.clear()
    Blockly.Xml.domToWorkspace(document.getElementById("workspaceBlocks"), workspace)
    localStorage.removeItem(new URL(location).pathname)
})
workspace.toolbox_.contentsDiv_.append(buttonAddT)

let inputArray = Array.from({length: 10}, (_,i) => i + 1)
const input = document.getElementById('sort_input')
const output = document.getElementById('sort_output')
flushInput()
function renderInput() {
    input.innerText = `输入：${inputArray.join(',')}`
}
function renderOutput(array, info) {
    if(!info) {
        output.innerText = `输出：${array.join(',')}`
    } else {
        output.innerText = `输出：${info}`
    }
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
function flushInput() {
    inputArray = shuffle(inputArray)
    renderInput()
    renderOutput(0, "请点击运行代码按钮查看")
}
function cusInput() {
    const temp = prompt('请输入输入数组元素，使用空格分隔', inputArray.join(' ')).trim()
    const tempInput = []
    for (const i of temp.split(' ')) {
        if(i.trim().length) {
            let tempValue
            try {
                tempValue = Number.parseInt(i.trim())
                tempInput.push(tempValue)
            } catch (error) {
                alert(`尝试将 ${i.trim()} 转换为数字失败.`)
                return
            }
            if (isNaN(tempValue) || !isFinite(tempValue)) {
                alert(`尝试将 ${i.trim()} 转换为数字失败.`)
                return
            }
        }
    }
    if(tempInput.length) {
        inputArray = tempInput
        renderInput()
        renderOutput(0, "请点击运行代码按钮查看")
    } else {
        alert(`输入数组不能为空`)
    }
}
function exportCode() {
    alert(Blockly.Python.workspaceToCode(workspace))
}
function runSort() {
    const code = Blockly.JavaScript.workspaceToCode(workspace)
    this.disabled = true
    renderOutput(0, "执行中，请稍等...")
    workerEval(code + `;\
    var inputArray = ${JSON.stringify(inputArray)};
    sort(inputArray) || inputArray;
`).then(result => {
    renderOutput(result)
    this.disabled = false
}).catch(e => {
    renderOutput(0, e)
    this.disabled = false
})
}
// function workerEval(code) {
//     return new Promise((resolve, reject) => {
//         const worker = new Worker("sort/js/worker.js")
//         const timer = setTimeout(() => {
//             worker.terminate()
//             reject("执行超时，请检查是否有死循环出现")
//         }, 6000)
//         worker.onmessage = e => {
//             clearTimeout(timer)
//             worker.terminate()
//             if (e.data.err) {
//                 reject(e.data.err)
//             } else {
//                 resolve(e.data.result)
//             }
//         }
//         worker.postMessage(code)
//     })
// }
function workerEval(code) {
    return new Promise((resolve, reject) => {
        const workerCode = `
            onmessage = function (e) {
                const code = e.data;
                try {
                    const result = eval(code);
                    postMessage({ err: 0, result });
                } catch (error) {
                    console.log(error);
                    postMessage({ err: "执行失败，请检查代码是否正确", result: null });
                }
            };

            const code = ${JSON.stringify(code)};
            onmessage({ data: code });
        `;

        const blob = new Blob([workerCode], { type: "application/javascript" });
        const worker = new Worker(URL.createObjectURL(blob));

        const timer = setTimeout(() => {
            worker.terminate();
            reject("执行超时，请检查是否有死循环出现");
        }, 6000);

        worker.onmessage = e => {
            clearTimeout(timer);
            worker.terminate();
            if (e.data.err) {
                reject(e.data.err);
            } else {
                resolve(e.data.result);
            }
        };
    });
}