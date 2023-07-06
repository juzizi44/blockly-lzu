
function uuidv4() {
    //from stackoverflow 105034
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0
        const v = ((c == 'x') ? r : (r & 0x3 | 0x8))
        return v.toString(16)
    })
}

function* permutations(pool) {
    for (let i = 0; i < pool.length; i++) {
        const a = pool[i]
        for (let j = i; j < pool.length; j++) {
            const b = pool[j]
            yield [a, b]
        }
    }
}

class Tactic {
    constructor(id, name, code) {
        this.id = id
        this.name = name || id
        this.code = code || id
    }
}

class Arbitration {
    constructor() {
        this._tacticList = ["TFT", "TF2T", "ALLD", "ALLC", "FRIEDMAN", "JOSS", "TESTER", "RANDOM"].map(id => new Tactic(id))
    }
    listTactic() {
        return this._tacticList
    }
    getTacticFromID(id) {
        return this._tacticList.find(e => e.id === id)
    }
    getBlocklyTactic(workspace) {
        const id = uuidv4()
        const name = workspace.getBlockById("init-func").getFieldValue("name")
        if (this._tacticList.find(e => e.name == name)) {
            alert("策略" + name + "已存在")
            const url = new URL(document.URL)
            url.hash = "#storage"
            document.location.href = url
        } else {
            const code = Blockly.JavaScript.workspaceToCode(workspace)
            const tactic = new Tactic(id, name, code)
            this._tacticList.push(tactic)
            return tactic
        }
    }
    getPVPResult(round, aID, bID) {
        const a = this.getTacticFromID(aID)
        const b = this.getTacticFromID(bID)
        if (a && b) {
            return play(round, eval(a.code), eval(b.code), Income)
        } else {
            throw new Error("id not found")
        }
    }
    PVP(round, aID, bID) {
        return new Promise((resolve, reject) => {
            const a = this.getTacticFromID(aID)
            const b = this.getTacticFromID(bID)
            if (a && b) {
                const worker = new Worker("js/playground.js")
                const timer = setTimeout(() => {
                    worker.terminate()
                    reject("timeout")
                }, 1e6)
                worker.onmessage = e => {
                    clearTimeout(timer)
                    worker.terminate()
                    if (e.data.err) {
                        reject(e.data.err)
                    } else {
                        resolve(e.data.result)
                    }
                }
                worker.postMessage([round, a.code, b.code])
            } else {
                reject("id not found")
            }
        })
    }
    async startCompetition(round, tacticList, progress) {
        const scoreBoard = tacticList.map(_ => tacticList.map(_ => 0))
        const index = tacticList.map((_, i) => i)
        let timer = 0
        let n = (tacticList.length) * (tacticList.length - 1) / 2
        for (const [aIDI, bIDI] of permutations(index)) {
            const a = this.getTacticFromID(tacticList[aIDI])
            const b = this.getTacticFromID(tacticList[bIDI])
            const { a: aScore, b: bScore } = await this.PVP(round, a.id, b.id)
            scoreBoard[aIDI][bIDI] = aScore
            scoreBoard[bIDI][aIDI] = bScore
            timer++
            progress && progress(timer / n)
        }
        return scoreBoard
    }
    deleteTactic(id) {
        this._tacticList = this._tacticList.filter(e => e.id !== id)
    }
}