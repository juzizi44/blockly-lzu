class MainRenderer {
    constructor(canvas, range) {
        this.range = range
        this.colors = {
            normal: "#000",
            asymptomatic: "#f4e037",
            symptomatic: "#f00",
            vaccinated: "#0f0",
            immune: "#0f0",
            dead: "#fff"
        } // double in main.css
        this.canvas = canvas
        this.canvas.height = this.range
        this.canvas.width = this.range
        this.ctx = this.canvas.getContext("2d")
    }
    draw(population) {
        this.ctx.fillStyle = "#eee"
        this.ctx.fillRect(0, 0, this.range, this.range)
        for(const person of population) {
            const {x, y} = person
            this.ctx.fillStyle = this.colors[person.healthState]
            this.ctx.beginPath()
            this.ctx.arc(x, y, 2, 0, circle)
            this.ctx.fill()
        }
    }
}

function tipRenderer(healthStatus) {
    return `
    <a class="tip-normal">正常:${healthStatus.normal}</a>
    <a class="tip-asymptomatic">感染(无症状):${healthStatus.asymptomatic}</a>
    <a class="tip-symptomatic">感染(有症状):${healthStatus.symptomatic}</a>
    <a class="tip-vaccinated">免疫:${healthStatus.vaccinated}</a>
    <a class="tip-immune">治愈:${healthStatus.immune}</a>
    <a class="tip-dead">死亡:${healthStatus.dead}</a>
    `
}
