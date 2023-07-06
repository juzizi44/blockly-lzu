function play(t, A, B, Income) { //演算
    const round = t | 0       //回合数
    const aHistory = new Uint8Array(round) //历史选择
    const bHistory = new Uint8Array(round)
    let aScore = 0, bScore = 0
    for (let i = 0; i < round; i++) {
        /* 做出选择 */
        const aChoice = A(i, bHistory, aHistory) | 0
        const bChoice = B(i, aHistory, bHistory) | 0
        aHistory[i] = aChoice
        bHistory[i] = bChoice
        /* 得出收益 */
        const aIncome = Income[aChoice << 1 | bChoice]
        const bIncome = Income[bChoice << 1 | aChoice]
        aScore += aIncome
        bScore += bIncome
    }
    return {
        history: {
            a: aHistory,
            b: bHistory
        },
        score: {
            a: aScore,
            b: bScore
        }
    }
}

const Income = [1, 5, 0, 3]
onmessage = function (e) {
    const [round, aCode, bCode] = e.data
    try {
        const A = eval(aCode)
        const B = eval(bCode)
        const result = play(round, A, B, Income).score
        postMessage({ err: 0, result })
    } catch (error) {
        console.log(error)
        postMessage({ err: "eval failed", result: null })
    }
}

/* 预置策略 */
function TFT(i, another, self) { //以牙还牙
    if (i === 0) {
        return 1
    } else {
        return another[i - 1]
    }
}

function TF2T(i, another, self) { //宽容的TFT, 连续背叛两次才报复(GTFT)
    if (i < 2) {
        return 1
    } else {
        return another[i - 1] | another[i - 2]
    }
}

function ALLD(i, another, self) { //总是背叛
    return 0
}

function ALLC(i, another, self) { //总是合作
    return 1
}

function FRIEDMAN(i, another, self) { //对方背叛, 就永远背叛(GRIM)
    if (i === 0) {
        return 1
    } else {
        if (another[i - 1] === 0) {
            return 0
        } else {
            return self[i - 1] ? 1 : 0
        }
    }
}

function JOSS(i, another, self) { //TFT, 偶尔尝试背叛
    if (i === 0) {
        return 1
    } else {
        if (another[i - 1] === 0) {
            return 0
        } else {
            return Math.random() < .10 ? 0 : 1
        }
    }
}

function TESTER(i, another, self) { //在开始尝试背叛（合作的进化PDF Page 30）
    if (i === 0) { //第一步尝试背叛
        return 0
    } else if (i === 1) {
        return 1 //对方第一步背叛，就在第二步合作；对方第一步合作，就在第二和三步合作
    } else {
        if(another[0] === 0) { //对方第一步背叛，第二歩之后采取一报还一报
            return another[i-1]
        } else {
            return (i & 1) ^ 1 //对方第一步合作，第二步之后隔一步背叛一次
        }
    }
}

function RANDOM(i, another, self) { //随机策略
    return Math.random() < .5 ? 0 : 1
}