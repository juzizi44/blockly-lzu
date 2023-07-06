/**
 * @abstract 每个人, 有自己的行为、位置和健康状态
 */
class Person {
    constructor({x, y}, config, behaviour) {
        this.x = x | 0
        this.y = y | 0
        this.healthState = 'normal'
        this.behaviour = behaviour || (async (environment) => {})
        this.isBehaviourHandling = false

        this.symptomaticRate = 1 - config.asymptomaticRate //有症状率
        this.incubation = config.incubationPeriod //潜伏期
        this.duration = config.numberDuration //持续时间
        this.mortality = config.fatalityRate //致死率
    }
    doSometing(environment) {
        if(!this.isBehaviourHandling) {
            this.isBehaviourHandling = true
            this.behaviour({
                person: this,
                ...environment
            }).then(() => {
                this.isBehaviourHandling = false
            })
        }
    }
}

/**
 * @abstract CDC, 处理、统计人们状态的变化
 */
class CDC {
    constructor() {
        this.auditedPopulation = []
        this.healthStatus = { //状态统计
            normal: 0,
            asymptomatic: 0,
            symptomatic: 0,
            vaccinated: 0,
            immune: 0,
            dead: 0
        }
        this.healthFSM = { //健康状态机
            normal: { //正常人
                INFECTED(person) { //密切接触
                    if(Math.random() < person.symptomaticRate) {
                        return 'symptomatic'
                    } else {
                        return 'asymptomatic'
                    }
                },
                VACCINATED(person) { //接种疫苗
                    return 'vaccinated'
                }
            },
            asymptomatic: { //无症状&&潜伏期
                CHANGE(person) { //变化
                    if(person.incubation) {
                        person.incubation--
                        if(!person.incubation) {
                            return 'symptomatic'
                        }
                    } else {
                        person.duration--
                        if(!person.duration) {
                            return 'immune'
                        }
                    }
                    return
                },
            },
            symptomatic: { //有症状
                CHANGE(person) { //变化
                    person.duration--
                    if(!person.duration) {
                        return Math.random() < person.mortality ? 'dead' : 'immune'
                    }
                }
            },
            vaccinated: {}, //无敌了
            immune: {}, //痊愈, 有免疫力
            dead: {} //挂了
        }
    }
    emit(person, event) {
        const lastState = person.healthState
        const next = this.healthFSM[lastState][event]
        if(next) {
            const nextState = next(person)
            if(nextState) {
                person.healthState = nextState
                this.healthStatus[lastState]--
                this.healthStatus[nextState]++
                return nextState
            }
        }
    }
    audit(person) {
        this.auditedPopulation.push(person)
        this.healthStatus[person.healthState]++
    }
}

/**
 * @abstract 模拟世界, 每时每刻都在变化
 */
class World {
    constructor(level) {
        this.cdc = new CDC()
        this.population = this.cdc.auditedPopulation
        this.rate = ({
            'VERY_LOW': 0.012,
            'LOW': 0.05,
            'MED': 0.1,
            'HIGH': 0.2,
            'VERY_HIGH': 0.3,
        })[level]
    }
    tick() {
        for(const personA of this.population) {
            for(const personB of this.population) { //normal 密切接触
                if(personA.healthState != 'normal') continue
                if(Math.abs(personA.x - personB.x) + Math.abs(personA.y - personB.y) > 12) continue
                if(personA == personB) continue
                if(personB.healthState == 'asymptomatic' || personB.healthState == 'symptomatic') {
                    if(Math.random() < this.rate) this.cdc.emit(personA, 'INFECTED')
                }
            }
            this.cdc.emit(personA, 'CHANGE')
            personA.doSometing({
                world: this
            })
        }
    }
}

class StaticRender {
    constructor(dom, colorMap) {
        this.dom = dom
        this.zrStatis = zrender.init(document.getElementById("statis-canvas"), {
            height: 300,
            width: 1200,
            renderer: 'canvas'
        })
        this.group = new zrender.Group()
        this.reset()
        this.drawer = {}
        for (const name in this.points) {
            if (Object.hasOwnProperty.call(this.points, name)) {
                this.drawer[name] = new zrender.Polyline({
                    style: {
                        stroke: colorMap[name]
                    },
                    shape: {
                        points: this.points[name]
                    }
                })
                this.group.add(this.drawer[name])
            }
        }
        this.zrStatis.add(this.group)
        this.zrStatis.on('mousewheel', (event) => {
            this.isMoveWithTick = false
            this.transOffset += event.wheelDelta
            this.group.animateTo({
                position:[this.transOffset * 10, 0]
            })
            if(!this.canTransform || this.transOffset > 0) {
                setTimeout(() => {
                    this.transOffset = 0
                    this.group.animateTo({
                        position:[this.transOffset * 10, 0]
                    })
                }, 200)
            }
            event.stop()
        })
    }
    reset() {
        this.points = {
            normal: [],
            asymptomatic: [],
            symptomatic: [],
            vaccinated: [],
            immune: [],
            dead: []
        }
        this.offset = 0
        this.canTransform = false
        this.isMoveWithTick = true
        this.transOffset = 0
        this.group.animateTo({
            position:[this.offset * 0, 0]
        })
    }
    update(data, population) {
        for (const name in this.points) {
            if (Object.hasOwnProperty.call(this.points, name) && this.offset % 10 == 0) {
                const W = 1200
                const H = 300
                const y = H - data[name] / population.length * H
                if(this.offset > W * 10) {
                    this.canTransform = true
                    if(Math.abs(this.points[name].length + this.transOffset * 10 - W) < 10 ) {
                        this.isMoveWithTick = true
                    }
                    if(this.isMoveWithTick) {
                        this.transOffset = (W - this.points[name].length) / 10
                        this.group.animateTo({
                            position:[this.transOffset * 10, 0]
                        })
                    }
                }
                this.points[name].push([this.offset / 10, y])
                this.drawer[name].attr({
                    shape: {
                        points: this.points[name]
                    }
                })
            }
        }
        this.offset++
    }
}