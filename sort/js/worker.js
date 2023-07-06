onmessage = function (e) {
    const code = e.data
    try {
        const result = eval(code)
        postMessage({ err: 0, result })
    } catch (error) {
        console.log(error)
        postMessage({ err: "执行失败，请检查代码是否正确", result: null })
    }
}