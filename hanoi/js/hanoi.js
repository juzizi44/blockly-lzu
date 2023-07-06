class Hanoi {
    hanoiState = []
    contextOfClick = {
        isSelected: false,
        selectedID: -1,
        getPlatePosition: this.getPlatePosition.bind(this),
        findFromPillarOfPlateId: this.findFromPillarOfPlateId.bind(this),
        tryToMove: this.tryToMove.bind(this),
        applyState: this.applyState.bind(this),
        hanoi: this
    }
    colorMap = (i, total) => `hsl(${Math.floor(i / total * 319)}, 80%, 60%)`
    constructor(plateNum = 3) {
        this.CanvasWidth = 450
        this.CanvasHeight = 200
        this.PillarNum = 3
        this.PillarWidth = 15
        this.PillarSpace = (this.CanvasWidth / this.PillarNum) - this.PillarWidth
        this.PillarHeight = this.CanvasHeight * 0.6
        this.PillarBaseHeight = this.PillarWidth / 0.618
        this.PillarBaseWidth = this.PillarNum * this.PillarSpace
        this.PillarPosition = [this.PillarSpace / 2, (this.CanvasHeight - this.PillarBaseHeight) * 0.2]
        this.PlateNum = plateNum
        this.PlateHeight = this.PlateNum > 1 ? this.PillarHeight * 0.6 / this.PlateNum : this.PillarHeight * 0.3
        this.PlateMinWidth = this.PlateNum > 1 ? this.PillarWidth * 3 : this.PillarWidth * 5
        this.PlateMaxWidth = (this.PillarSpace - this.PillarWidth) * 0.85
        this.PlateWidthIn = (this.PlateMaxWidth - this.PlateMinWidth) / (this.PlateNum - 0.99)

        this.zrender = zrender.init(
            document.getElementById('hanoi-ui'),
            {
                renderer: 'canvas',
                devicePixelRatio: window.devicePixelRatio || 2,
                width: this.CanvasWidth,
                height: this.CanvasHeight
            }
        )
        this.pillarGroup = new zrender.Group()
        for (let i = 0; i < this.PillarNum; i++) {
            this.pillarGroup.add(new zrender.Rect({
                zlevel: 0,
                style: {
                    fill: '#fff',
                    stroke: '#000'
                },
                shape: {
                    r: 0,
                    x: this.PillarSpace * i,
                    y: 0,
                    width: this.PillarWidth,
                    height: this.PillarHeight
                },
                pillarId: i
            }))
            this.hanoiState.push([])
        }
        this.pillarGroup.position = this.PillarPosition
        this.pillarBase = new zrender.Rect({
            zlevel: 1,
            style: {
                fill: '#fff',
                stroke: '#000'
            },
            shape: {
                r: 0,
                x: this.PillarWidth,
                y: this.PillarPosition[1] + this.PillarHeight,
                width: this.PillarBaseWidth,
                height: this.PillarBaseHeight
            }
        })
        this.plateGroup = new zrender.Group()
        for (let i = 0; i < this.PlateNum; i++) {
            const position = this.getPlatePosition(i, 0, this.PlateNum - i)
            this.plateGroup.add(new zrender.Rect({
                zlevel: 2,
                style: {
                    fill: this.colorMap(i, this.PlateNum),
                    stroke: '#000'
                },
                shape: {
                    r: 0,
                    x: position[0],
                    y: position[1],
                    width: this.PlateMinWidth + this.PlateWidthIn * i,
                    height: this.PlateHeight
                },
                plateId: i,
                originColor: this.colorMap(i, this.PlateNum)
            }))
            this.hanoiState[0].push(i)
        }
        this.initState = this.deepCopy(this.hanoiState)

        this.plateGroup.on('click', function (event) {
            if (!this.isSelected) {
                this.isSelected = true
                this.selectedID = event.target.plateId
                this.hanoi.plateGroup.childAt(this.selectedID).attr({
                    style: {
                        fill: '#eec400'
                    }
                })
            } else {
                this.hanoi.plateGroup.childAt(this.selectedID).attr({
                    style: {
                        fill: this.hanoi.plateGroup.childAt(this.selectedID).originColor
                    }
                })
                if (this.selectedID != event.target.plateId) {
                    this.selectedID = event.target.plateId
                    this.hanoi.plateGroup.childAt(this.selectedID).attr({
                        style: {
                            fill: '#eec400'
                        }
                    })
                } else {
                    this.isSelected = false
                    this.selectedID = -1
                }
            }
        }, this.contextOfClick)
        this.pillarGroup.on('click', function (event) {
            if(this.isSelected) {
                try {
                    const fromPillar = this.findFromPillarOfPlateId(this.selectedID)
                    this.tryToMove(this.selectedID, fromPillar, event.target.pillarId)
                    this.applyState()
                    this.hanoi.handleModified && this.hanoi.handleModified()
                } catch (error) {
                    alert(error)
                }
            }
        }, this.contextOfClick)

        this.zrender.add(this.pillarGroup)
        this.zrender.add(this.pillarBase)
        this.zrender.add(this.plateGroup)
    }
    handleModified() {}
    deepCopy(src) {
        return JSON.parse(JSON.stringify(src))
    }
    silent(isSilent = true) {
        this.plateGroup.silent = this.pillarGroup.silent = isSilent
    }
    getPlatePosition(plateId, pillarId, position) {
        const x = this.PillarPosition[0] - (this.PlateMinWidth + this.PlateWidthIn * plateId - this.PillarWidth) / 2 + this.PillarSpace * pillarId
        const y = this.PillarPosition[1] + this.PillarHeight - this.PlateHeight * position
        return [x, y]
    }
    findFromPillarOfPlateId(plateId) {
        if (plateId < 0 || plateId >= this.PlateNum) {
            throw new Error('没有对应ID的盘子')
        }
        for (let i = 0; i < this.PillarNum; i++) {
            if(~this.hanoiState[i].indexOf(plateId)) {
                return i
            }
        }
        throw new Error('没有找到该盘子')
    }
    tryToMove(plateId, fromPillar, toPillar) {
        if (plateId < 0 || plateId >= this.PlateNum) {
            throw new Error('没有对应ID的盘子')
        }
        if (fromPillar < 0 || fromPillar >= this.PillarNum) {
            throw new Error('起始柱子不存在')
        }
        if (toPillar < 0 || toPillar >= this.PillarNum) {
            throw new Error('目标柱子不存在')
        }
        if (this.hanoiState[fromPillar].length == 0 || this.hanoiState[fromPillar][0] != plateId) {
            throw new Error('盘子不在起始柱子的顶端')
        }
        if (this.hanoiState[toPillar].length) {
            if (this.hanoiState[toPillar][0] < plateId) {
                throw new Error('目标柱子顶端的盘子比该盘子小')
            }
        }
        this.hanoiState[toPillar].unshift(
            this.hanoiState[fromPillar].shift()
        )
    }
    applyState() {
        for (let pillarId = 0; pillarId < this.hanoiState.length; pillarId++) {
            for (let position = 0; position < this.hanoiState[pillarId].length; position++) {
                const plateId = this.hanoiState[pillarId][position]
                const newPosition = this.getPlatePosition(plateId, pillarId, this.hanoiState[pillarId].length - position)
                this.plateGroup.childAt(plateId).animateTo({
                    shape: {
                        x: newPosition[0],
                        y: newPosition[1]
                    }
                })
            }
        }
    }
}