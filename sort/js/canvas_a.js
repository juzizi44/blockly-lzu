function bubbleSort(array) {
    let i, j, len = array.length
    for (let i = 0; i < len; i++) {
        array.highlightValue(array[i])
    }
    for (let i = len; i >= 0; i--) {
        for (let j = 0; j < i-1; j++) {
            array.compare(j, j + 1)
            if (array.get(j) > array.get(j + 1)) {
                array.swap(j, j + 1)
            }
        }
        array.cancelValueHighlight(array[i-1])
    }
}

function quickSort(arr, low = 0, high = arr.length - 1) {
    const key = arr[low]
    let start = low
    let end = high
    arr.setValueLabel(key, "SPEC_LINE_LABEL")
    for (let i = low; i <= high; i++) {
        arr.highlightValue(arr[i])
    }
    while (end > start) {
        while (end > start && arr[end] >= key) {
            arr.compare(end, low)
            end--
        }
        arr.swap(start, end)
        while (end > start && arr[start] <= key) {
            arr.compare(start, low)
            start++
        }
        arr.swap(start, end)
    }
    for (let i = low; i <= high; i++) {
        arr.cancelValueHighlight(arr[i])
    }
    arr.removeValueLabel(key, "SPEC_LINE_LABEL")
    if (start > low) quickSort(arr, low, start - 1)
    if (end < high) quickSort(arr, end + 1, high)
    return arr
}

function insertSort(array) {
    const n = array.length;
    for (let k = 0; k < n; k++) {
        array.highlightValue(array[k])
    }
    for (let i = 0; i < n; i++) {
       for(let j = i ; j > 0 ; j -- ) {
           array.compare(j, j-1)
           if( array[j] < array[j-1] ) {
               array.swap(j, j-1 )
           }
           else {
               break
           }
       }
    }
    for (let k = 0; k < n; k++) {
        array.cancelValueHighlight(array[k])
    }
}

function timeout(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), time)
    })
}

async function testDrawBubbleSort() {
    const testArray = new ObserveredArray(...Array.from({
        length: 30
    }, (_, i) => i))
    testArray.shuffle()
    bubbleSort(testArray)
    const sortAnimation = new SortAnimation(testArray)
    // sortAnimation.tickedOp = [Operation.OP_SWAP]
    // sortAnimation.retickAfterWriteList = []
    const canvas = document.getElementById("canvas")
    const render = new CanvasRender()
    // render.colorTable[Operation.OP_SWAP] = render.colorTable[Operation.OP_COMPARE]
    for (const tick of sortAnimation.tickArray()) {
        render.drawTickToCanvas(canvas, tick)
        await timeout(400)
    }
    render.drawTickToCanvas(canvas, {
        array: testArray,
        color: sortAnimation.mapElementColor(testArray)
    })
}
// testDrawBubbleSort().then()
async function testDrawQuickSort() {
    const testArray = new ObserveredArray(...Array.from({
        length: 30
    }, (_, i) => i))
    testArray.shuffle()
    quickSort(testArray)
    const sortAnimation = new SortAnimation(testArray)
    sortAnimation.tickedOp = [Operation.OP_SWAP]
    const canvas = document.getElementById("canvas")
    const render = new CanvasRender()
    for (const tick of sortAnimation.tickArray()) {
        render.drawTickToCanvas(canvas, tick)
        await timeout(400)
    }
    render.drawTickToCanvas(canvas, {
        array: testArray,
        color: sortAnimation.mapElementColor(testArray)
    })
}
// testDrawQuickSort().then()
async function testDrawInsertSort() {
    const testArray = new ObserveredArray(...Array.from({
        length: 30
    }, (_, i) => i))
    testArray.shuffle()
    insertSort(testArray)
    const sortAnimation = new SortAnimation(testArray)
    sortAnimation.tickedOp = [Operation.OP_SWAP]
    const canvas = document.getElementById("canvas")
    const render = new CanvasRender()
    for (const tick of sortAnimation.tickArray()) {
        render.drawTickToCanvas(canvas, tick)
        await timeout(400)
    }
    render.drawTickToCanvas(canvas, {
        array: testArray,
        color: sortAnimation.mapElementColor(testArray)
    })
}
// testDrawInsertSort().then()