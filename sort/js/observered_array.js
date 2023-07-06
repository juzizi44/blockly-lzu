class Operation {
    static OP_SET = "set"
    static OP_GET = "get"
    static OP_COMPARE = "compare"
    static OP_SWAP = "swap"
    static OUTLOOK_HIGHLIGHT_VALUE = "highlight_value"
    static OUTLOOK_NORMAL_VALUE = "normal_value"
    static OUTLOOK_LABEL_VALUE = "label_value"
    static OUTLOOK_UNLABEL_VALUE = "unlabel_value"
    constructor(type, prop, value) {
        this.type = type
        this.prop = prop
        this.value = value
    }
}
class ObserveredArray extends Array {
    constructor(...args) {
        super(...args)
        this._array = [...this]
        this._propHistory = []
        this._labelList = []
    }
    get(prop) {
        this._propHistory.push(new Operation(Operation.OP_GET, prop))
        return Reflect.get(this, prop)
    }
    set(prop, value) {
        this._propHistory.push(new Operation(Operation.OP_SET, prop, value))
        return Reflect.set(this, prop, value)
    }
    swap(prop, value) {
        this._propHistory.push(new Operation(Operation.OP_SWAP, prop, value))
        const temp = Reflect.get(this, prop)
        Reflect.set(this, prop, Reflect.get(this, value))
        Reflect.set(this, value, temp)
    }
    compare(prop, value) {
        this._propHistory.push(new Operation(Operation.OP_COMPARE, prop, value))
    }
    highlightValue(prop) {
        this._propHistory.push(new Operation(Operation.OUTLOOK_HIGHLIGHT_VALUE, prop))
    }
    cancelValueHighlight(prop) {
        this._propHistory.push(new Operation(Operation.OUTLOOK_NORMAL_VALUE, prop))
    }
    setValueLabel(prop, label) {
        let value = this._labelList.indexOf(label)
        if (value === -1) {
            value = this._labelList.push(label) - 1
        }
        this._propHistory.push(new Operation(Operation.OUTLOOK_LABEL_VALUE, prop, value))
    }
    removeValueLabel(prop, label) {
        const value = this._labelList.indexOf(label)
        this._propHistory.push(new Operation(Operation.OUTLOOK_UNLABEL_VALUE, prop, value))
    }
    shuffle() {
        let m = this.length
        let i
        while (m) {
            i = (Math.random() * m--) >>> 0;
            [this[m], this[i]] = [this[i], this[m]];
        }
        this._array = [...this]
        this._propHistory = []
        this._labelList = []
        return this
    }
}