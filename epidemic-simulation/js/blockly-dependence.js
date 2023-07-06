/*/
 * 依赖 util & entities
/*/
/*********************************************
*                 世界部分                     *
 *********************************************/

function addPersonToWorld(world, num, distribution, config, action) {
    const personNum = num | 0 //Number
    for(let i=0; i<personNum; i++) {
        world.cdc.audit(
            new Person(
                randomPosition(CanvasRange, distribution),
                config,
                action
            )
        )
    }
}

/*********************************************
*                 位置部分                     *
 *********************************************/

/**
 * @abstract 移动到
 * @param {Person} p person对象
 * @param {Position} dst 目标坐标[x, y]
 * @param {Number} time 总时间(ms)
 */
const cubicBezier = new Bezier(.46,.03,.52,.96)
async function moveTo(p, dst, time) {
    const {x:srcX, y:srcY} = p
    const {x:dstX, y:dstY} = dst
    const k = time / 20
    for(let i=0; i<k; i++) {
        const z = cubicBezier.solve(i / k)
        p.x = (dstX - srcX) * z + srcX
        p.y = (dstY - srcY) * z + srcY
        await timeout(20)
    }
}

/**
 * @abstract 随机位置生成
 * @param {Number} range 位置最大值
 * @param {String} distribution 随机分布
 */
function randomPosition(range, distribution='uniform') {
    if(distribution=='uniform') {
        return {
            x: random(0, range),
            y: random(0, range)
        }
    } else if(distribution=='gaussian') {
        return {
            x: Math.floor(gaussianSample(0, range)),
            y: Math.floor(gaussianSample(0, range))
        }
    } else {
        return {
            x: 0,
            y: 0
        }
    }
}

/**
 * @abstract 周围位置
 * @param {Number} range 位置最大值
 * @param {Number} shifting 最大偏移量
 * @param {Person} person person对象
 */
function aroundPosition(range, shifting, person) {
    let dx = (Math.random() - .5) * shifting
    let dy = (Math.random() - .5) * shifting
    let x = person.x + dx
    let y = person.y + dy
    if(x < 0 || x > range) {
        x = person.x - dx
    }
    if(y < 0 || y > range) {
        y = person.y - dy
    }
    return { x, y }
}

/**
 * @abstract 使对象免疫
 * @param {World} world 世界对象
 * @param {Person} person 改变对象
 * @param {Number} rate 改变几率
 */
function changeStateToImmune(world, person, rate = 1) {
    if(Math.random() < rate) {
        world.cdc.emit(person, 'VACCINATED')
    }
}

/**
 * @abstract 核酸检测
 * @param {Person} person 对象
 * @param {Number} fack_n 假阴性率（患病却为阴性）
 * @param {Number} fack_e 假阳性率（未患病却为阳性）
 */
function getIsAsymptomaticOrSymptomatic(person, fack_n = 0, fack_e = 0) {
    if(['asymptomatic', 'symptomatic'].includes(person.healthState)) {
        return (Math.random() < fack_n) ? false : true
    } else {
        return (Math.random() < fack_e) ? true : false
    }
}