class ChoosePanel {
    constructor() {
        // 初始化画布
        this._width = document.querySelector("#graph").clientWidth
        this._height = 400
        this._svg = d3.select("#graph").append("svg")
        this._svg
            .attr("width", this._width)
            .attr("height", this._height)

        this._selectedid = []
        this.onchoose = null
    }
    draw(data) {
        const that = this
        const nodeIDList = Array.from({length:data.length}, (_, i) => i)
        const nodeLink = d3.cross(nodeIDList, nodeIDList) // 笛卡尔积生成完全图连接
            .filter(e => e[0] != e[1])
            .map(e => ({source: e[0], target: e[1]}))

        // 清空画布
        this._svg.selectAll("g")
            .remove()
        // 添加SVG元素
        const links = this._svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(nodeLink)
            .enter()
            .append("line")
            .attr("stroke", "blue")
        const nodes = this._svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(data)
            .enter().append("circle")
            .attr("cx", this._width / 2)
            .attr("cy", (data, i) => (i+1)*90)
            .attr("r", "25")
            .attr("fill", "orange")
            .on("click",function(d) {
                if(d3.select(this).attr("fill") != "red") {
                    that._selectedid.push({id: d.id, name: d.name}) //把被点击的球的id记录下来
                    // 添加被点击后的动画
                    d3.select(this)
                        .attr("fill","red"); //把被点击的球涂成红色
                } else {
                    that._selectedid = that._selectedid.filter(e => e.id != d.id)
                    d3.select(this)
                        .attr("fill","orange")
                }
                that.onchoose && that.onchoose(that._selectedid)
            })
        const texts = this._svg.append("g")
            .selectAll(".MyText")
            .data(data)
            .enter()
            .append("text")
            .attr("class","MyText")
            .attr("x", this._width / 2)
            .attr("y", (data, i) => (i+1)*90)
            .attr("fill", "white")
            .attr("pointer-events", "none")
            .text(d => d.name)

        // 力学模拟
        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(d => d.index))
            .force("charge", d3.forceManyBody().strength(d => -3000))
            .force("center", d3.forceCenter(this._width / 2, this._height / 2))

        simulation
            .nodes(data)
            .on("tick", () => {
                links
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y)
                nodes
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
                texts
                    .attr("x", d => d.x - 6)
                    .attr("y", d => d.y + 5)
            })
        simulation.force("link")
            .links(nodeLink)
        // 拖拽处理
        nodes.call(d3.drag()
            .on("start", (d) => {
                if (!d3.event.active) simulation.alphaTarget(0.7).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (d) => {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            })
            .on("end", (d) => {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }));
    }
}
