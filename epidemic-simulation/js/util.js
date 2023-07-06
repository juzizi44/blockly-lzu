/**
 * @abstract AsyncFunction
 */
const AsyncFunction = (async()=>{}).constructor
/**
 * @abstract 常量 圆周角 2π
 */
const circle = 2 * Math.PI

/**
 * @abstract 随机整数 封装
 * @param {Number} start 起始值
 * @param {Number} end 结束值(不包含)
 */
function random(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
}

/**
 * @abstract 生成服从高斯分布的随机数
 * @param {Number} mu 均值
 * @param {Number} sigma 标准差
 */
function randomGaussian(mu = 0, sigma = 1) {
    // box-muller method
    const u = 1.0 - Math.random() // avoid log(0)
    const v = Math.random()
    return mu + Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * sigma
}

/**
 * @abstract 在有限区间内生成近似服从高斯分布的随机数
 * @param {Number} start 起始值
 * @param {Number} end 结束值
 */
function gaussianSample(start, end) {
    const g = randomGaussian(.5, .166666) % 1 // 3*sigma = .5
    return g * (end - start) + start
}

/**
 * @abstract setTimeout Promisify
 * @param {Number} time 等待时间
 */
function timeout(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

/**
 * @abstract 页面可见性 封装
 */
class PageVisibility {
    constructor() {
        this.hidden = false
        this._waitList = []
        document.addEventListener('visibilitychange', this._handler.bind(this))
    }
    _handler() {
        this.hidden = document.hidden
        console.log(this.hidden)
        if(!this.hidden) {
            for(const resolve of this._waitList) {
                resolve()
            }
            this._waitList = []
        }
    }
    waitForVisibility() {
        return new Promise((resolve, reject) => {
            if(this.hidden) {
                this._waitList.push(resolve)
            } else {
                resolve()
            }
        })
    }
}

/**
 * @abstract cubic-bezier 实现
 * @from stackoverflow
 */
class Bezier {
    static epsilon = 1e-6
    constructor(p1x, p1y, p2x, p2y) {
        this.cx = 3.0 * p1x
        this.bx = 3.0 * (p2x - p1x) - this.cx
        this.ax = 1.0 - this.cx -this.bx

        this.cy = 3.0 * p1y
        this.by = 3.0 * (p2y - p1y) - this.cy
        this.ay = 1.0 - this.cy - this.by
    }
    sampleCurveX(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t
    }
    sampleCurveY(t) {
        return ((this.ay * t + this.by) * t + this.cy) * t
    }
    sampleCurveDerivativeX(t) {
        return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx
    }
    solveCurveX(x, epsilon) {
        let t0, t1, t2, x2, d2, i
        // First try a few iterations of Newton's method -- normally very fast.
        for(t2 = x, i = 0; i < 8; i++) {
            x2 = this.sampleCurveX(t2) - x
            if(Math.abs (x2) < epsilon) {
                return t2
            }
            d2 = this.sampleCurveDerivativeX(t2)
            if(Math.abs(d2) < epsilon) {
                break
            }
            t2 = t2 - x2 / d2
        }
        // No solution found - use bi-section
        t0 = 0.0
        t1 = 1.0
        t2 = x

        if(t2 < t0) return t0
        if(t2 > t1) return t1

        while(t0 < t1) {
            x2 = this.sampleCurveX(t2)
            if(Math.abs(x2 - x) < epsilon) {
                return t2
            }
            if(x > x2){
                t0 = t2
            } else {
                t1 = t2
            }
            t2 = (t1 - t0) * .5 + t0
        }
        // Give up
        return t2
    }
    solve(x, epsilon=1e-6) {
        return this.sampleCurveY( this.solveCurveX(x, epsilon))
    }
}