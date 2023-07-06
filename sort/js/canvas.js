class SortAnimation {
    constructor(observeredArray, tickedOp = [Operation.OP_COMPARE, Operation.OP_SWAP]) {
            this.observeredArray = observeredArray
            /* 生成帧的操作列表 */
            this.tickedOp = tickedOp
            /* 在写列表后重新生成帧的操作列表 */
            this.retickAfterWriteList = [Operation.OP_SET, Operation.OP_SWAP]
            /* prop colored */
            this.propColored = [Operation.OP_GET, Operation.OP_SET, Operation.OP_COMPARE, Operation.OP_SWAP]
            /* value colored */
            this.valueColored = [Operation.OP_COMPARE, Operation.OP_SWAP]
        }
        * tickArray() { // 生成动画帧
            const nowArray = [...this.observeredArray._array]
            const iter = this.observeredArray._propHistory
            const labelList = this.observeredArray._labelList
            let highlightList = []
            let valueLabelList = []
            for (const op of iter) {
                const {
                    type,
                    prop,
                    value
                } = op
                /* 前处理操作 */
                if (type === Operation.OUTLOOK_LABEL_VALUE) {
                    valueLabelList.push({
                        value: prop,
                        label: labelList[value]
                    })
                } else if (type === Operation.OUTLOOK_UNLABEL_VALUE) {
                    const label = labelList[value]
                    valueLabelList = valueLabelList.filter(e => e.value !== value && e.label != label)
                }
                /* 帧生成 */
                const isOpTicked = this.tickedOp.includes(type)
                if (isOpTicked) {
                    yield {
                        array: nowArray,
                        color: this.mapElementColor(nowArray, op, highlightList),
                        valueLabelList,
                        animation: null
                    }
                }
                /* 后处理操作 */
                if (type === Operation.OP_SET) {
                    Reflect.set(nowArray, prop, value)
                } else if (type === Operation.OP_SWAP) {
                    const temp = Reflect.get(nowArray, prop)
                    Reflect.set(nowArray, prop, Reflect.get(nowArray, value))
                    Reflect.set(nowArray, value, temp)
                } else if (type === Operation.OUTLOOK_HIGHLIGHT_VALUE) {
                    highlightList.push(prop)
                } else if (type === Operation.OUTLOOK_NORMAL_VALUE) {
                    highlightList = highlightList.filter(e => e !== prop)
                }
                /* 根据后处理结果重新生成帧 */
                if (isOpTicked && this.retickAfterWriteList.includes(type)) {
                    yield {
                        array: nowArray,
                        color: this.mapElementColor(nowArray, op, highlightList),
                        valueLabelList,
                        animation: null
                    }
                }
            }
        }
    mapElementColor(array, {
        type,
        prop,
        value
    } = new Operation(), highlightList = []) { // 根据操作和高亮列表生成颜色表
        /* normal && highlight */
        const temp = array.map(e => highlightList.includes(e) ? "highlight" : "normal")
        /* prop */
        if (this.propColored.includes(type)) {
            temp[prop] = type
        }
        /* value */
        if (this.valueColored.includes(type)) {
            temp[value] = type
        }
        return temp
    }
}
class CanvasRender {
    constructor() {
        this.colorTable = { // 颜色表
            "normal": "#ADD6E6",
            "highlight": "#BFEFFF",
            [Operation.OP_GET]: "#f00",
            [Operation.OP_SET]: "#ff0",
            [Operation.OP_COMPARE]: "#30DFF3",
            [Operation.OP_SWAP]: "#8DEEBA"
        }
    }
    drawTickToCanvas(canvas, {
        array,
        color: colorList,
        valueLabelList = [],
        animation
    }) {
        /* const && init */
        const colorTable = this.colorTable
        const cWidth = canvas.width
        const cHeight = canvas.height
        const aNum = array.length
        const cellWidth = cWidth / aNum
        const cellHeight = cHeight / aNum
        const xOffset = cellWidth / 2
        const yOffset = cHeight
        const context = canvas.getContext("2d")
        context.textAlign = "right"
        context.font = "15px serif"
        /* pick special label */
        const specLabel = valueLabelList.find(e => e.label === "SPEC_LINE_LABEL")
        const normalLabel = valueLabelList.filter(e => e.label !== "SPEC_LINE_LABEL")
        context.clearRect(0, 0, cWidth, cHeight)
        for (let i = 0; i < aNum; i++) {
            const labelList = normalLabel.filter(e => e.value === array[i])
            const x = i * cellWidth
            const y = yOffset - Math.floor(array[i]+1) * cellHeight
            /* draw rect*/
            context.fillStyle = colorTable[colorList[i]]
            context.fillRect(x, y, cellWidth * .8, (cHeight - y))
            if(specLabel && (colorList[i] === "highlight" || colorList[i] === Operation.OP_SWAP || colorList[i] === Operation.OP_COMPARE)) {
                const lineY = yOffset - Math.floor(specLabel.value+1) * cellHeight
                context.beginPath()
                context.moveTo(x, lineY)
                context.lineTo(x + cellWidth, lineY)
                context.stroke()
            }
            if(specLabel && specLabel.value === array[i]) {
                context.beginPath()
                context.moveTo(x + cellWidth * .8 / 2, y - 3)
                context.lineTo(x + cellWidth * .8 / 2, y+3)
                context.stroke()
            }
            /* draw normal label */
            if(labelList.length) {
                for (const label of labelList) {
                    context.strokeText(label.label, x, y)
                }
            }
        }
    }
}