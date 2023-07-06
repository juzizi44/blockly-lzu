class Scoreboard {
    constructor(arbitration) {
        const beginButton = document.getElementById("begin-play")
        const returnButton = document.getElementById("return-init")
        beginButton.addEventListener("click", () => {
            this.initToCalc().then()
        })
        returnButton.addEventListener("click", () => {
            this.transitionWithShade("result", "0", "init-panel").then()
        })
        this._list = []
        this._arbitration = arbitration
    }
    async initToCalc() {
        const beginButton = document.getElementById("begin-play")
        const progress = document.getElementById("prgr")
        beginButton.attributes.setNamedItem(document.createAttribute("disabled"))
        await this.transitionWithShade("init-panel", "10", "progress")
        beginButton.attributes.removeNamedItem("disabled")
        try {
            const result = await this.calc(1e7) // TODO: round
            this.resultRender(result, 1e7)
            await this.transitionWithShade("progress", "5", "result")
        } catch (error) {
            const alertP = document.createElement("p")
            const returnB = document.createElement("button")
            alertP.style.color = "red"
            alertP.innerText = "策略执行出错，请检查策略定义"
            returnB.innerText = "返回"
            returnB.addEventListener("click", () => {
                this.transitionWithShade("progress", "5", "init-panel").then(() => {
                    document.getElementById("progress").removeChild(alertP)
                    document.getElementById("progress").removeChild(returnB)
                })
            })
            document.getElementById("progress").appendChild(alertP)
            document.getElementById("progress").appendChild(returnB)
        }
        progress.value = "0"
    }
    async calc(round) {
        const progress = document.getElementById("prgr")
        progress.value = 0
        const result = await this._arbitration.startCompetition(round, this._list.map(e => e.id), (p) => {
            progress.value = Math.floor(p * 100)
        })
        progress.value = 100
        return result
    }
    resultRender(result, round) {
        const resultTable = document.getElementById("result-table")
        console.log('比赛结果(每轮平均分)', result, round)
        let innerHTML = '<tr><th>策略</th><th>'+this._list.map(e => e.name).join('</th><th>')+'</th><th>总分</th><th>排名</th></tr>'
        let tempSumIndex = this._list.map((e, i) => ({
            name: e.name,
            score: result[i].reduce((a, b) => a + b)
        })).sort((a, b) => {
            return b.score - a.score
        }).map(e => {
            return this._list.findIndex(el => e.name == el.name)
        })
        let rank = 1
        for(const i of tempSumIndex) {
            innerHTML += `<tr><td><b>${this._list[i].name}</b></td><td>${result[i].map(e => (e/round).toFixed(2)).join('</td><td>')}</td><td>${(result[i].reduce((a, b) => a + b)/round).toFixed(4)}</td><td>${rank}</td></tr>`
            rank+=1
        }
        resultTable.innerHTML = innerHTML
    }
    updateSelected(list) {
        const tacticList = document.getElementById("tactic-list")
        const beginButton = document.getElementById("begin-play")
        this._list = list
        if (list.length >= 2) {
            try {
                beginButton.attributes.removeNamedItem("disabled")
            } catch (error) {
                //Not error
            }
        } else {
            beginButton.attributes.setNamedItem(document.createAttribute("disabled"))
        }
        if (list.length) {
            tacticList.innerHTML = ""
            for (const tactic of list) {
                const newDiv = document.createElement("div")
                newDiv.className = "tactic"
                newDiv.innerText = tactic.name
                tacticList.appendChild(newDiv)
            }
        } else {
            tacticList.innerHTML = '<div class="tactic">请选择至少两个策略</div>'
        }
    }
    transitionWithShade(before, z, after) {
        return new Promise((resolve, reject) => {
            const panelShade = document.getElementById("panel-shade")
            let isFirst = true
            const callback = () => {
                if (isFirst) {
                    isFirst = false
                    document.getElementById(before).style.zIndex = z
                    document.getElementById(after).style.zIndex = "15"
                    panelShade.style.backgroundColor = "rgba(241, 241, 241, 0)"
                } else {
                    panelShade.removeEventListener("transitionend", callback)
                    resolve()
                }
            }
            panelShade.style.backgroundColor = "rgba(241, 241, 241, 1)"
            panelShade.addEventListener("transitionend", callback)
        })
    }
    timeout(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(), time)
        })
    }
}