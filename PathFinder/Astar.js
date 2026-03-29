export class Astar {

    constructor(grid, startrow, startcol, endrow, endcol) {

        if (
            typeof startrow !== 'number' ||
            typeof startcol !== 'number' ||
            typeof endrow !== 'number' ||
            typeof endcol !== 'number'
        ) {
            throw new Error('PathFinder: startnode and endnode must be numbers')
        }



        this.grid = grid
        this.startrow = startrow
        this.startcol = startcol
        this.endrow = endrow
        this.endcol = endcol
        this.start = this.getCell(this.startrow, this.startcol)
        this.end = this.getCell(this.endrow, this.endcol)
        this.openset = []
        this.closedset = []
        this.path = []
        this.timeOut = null
        this.running = false

        if (

            this.getCell(this.startrow, this.startcol).isWall ||
            this.getCell(this.endrow, this.endcol).isWall
        ) {

            throw new Error('PathFinder: startnode and endnode cannot be walls')
        }

    }

    getCell(row, col) {

        if (this.grid.cells[row] === undefined) return false
        if (this.grid.cells[row][col] === undefined) return false
        return this.grid.cells[row][col]
    }

    getneighbors(row, col) {

        let neighbors = []

        let indexes = [

            [-1, 0], [0, 1], [1, 0], [0, -1]
        ]

        for (let i = 0; i < indexes.length; i++) {

            let cell = this.getCell(row + indexes[i][0], col + indexes[i][1])

            if (cell && !cell.isWall) {

                neighbors.push(cell)
            }

        }

        return neighbors
    }

    heuristic(cellA, cellB) {

        return Math.abs(cellB.x - cellA.x) + Math.abs(cellB.y - cellA.y)
    }


    find() {

        $("#output").html("")

        if(this.running)return
        this.running = true

        //hier komt het algoritme
        this.openset.push(this.start)
        let current = null

        let loop = () => {

            if (this.openset.length > 0) {

                let winner = 0
                for (let i = 0; i < this.openset.length; i++) {

                    if (this.openset[i].f < this.openset[winner].f) {

                        winner = i
                    }
                }

                current = this.openset[winner]

                this.path = this.reconstructPath(current)

                if (current === this.end) {

                    $("#output").html(this.path.length + " nodes for the shortest route from startpoint to endpoint.")
                    return
                }


                this.closedset.push(current)
                this.openset.splice(winner, 1)

                let neighbors = this.getneighbors(current.row, current.col)

                for (let i = 0; i < neighbors.length; i++) {

                    let neighbor = neighbors[i]

                    if (this.closedset.includes(neighbor)) continue

                    let tempG = current.g + 1

                    if (!this.openset.includes(neighbor) || tempG < neighbor.g) {

                        neighbor.g = tempG
                        neighbor.h = this.heuristic(neighbor, this.end)
                        neighbor.f = neighbor.g + neighbor.h
                        neighbor.parent = current

                        if (!this.openset.includes(neighbor)) this.openset.push(neighbor);

                    }
                }

            } else {

                $("#output").html("No path is found!")
                this.path = []
                return
            }


            this.timeOut = setTimeout(loop, 10)
    
        }

        loop()
    }

    reconstructPath(current) {

        if (!current) return

        let path = []
        let temp = current
        path.push(temp)
        while (temp.parent) {
            path.push(temp.parent)
            temp = temp.parent
        }

        return path.reverse()
    }



    draw(ctx) {

        for (let i = 0; i < this.openset.length; i++) {

            ctx.beginPath()
            ctx.fillStyle = "dodgerblue"
            ctx.rect(this.openset[i].x + .5, this.openset[i].y + .5, this.openset[i].size - 1, this.openset[i].size - 1)
            ctx.fill()
            ctx.closePath()
        }

        for (let i = 0; i < this.closedset.length; i++) {

            ctx.beginPath()
            ctx.fillStyle = "#BBF2FA"
            ctx.rect(this.closedset[i].x + .5, this.closedset[i].y + .5, this.closedset[i].size - 1, this.closedset[i].size - 1)
            ctx.fill()
            ctx.closePath()
        }

        for (let i = 0; i < this.path.length; i++) {

            ctx.beginPath()
            ctx.fillStyle = "#FFD700"
            ctx.rect(this.path[i].x + .5, this.path[i].y + .5, this.path[i].size - 1, this.path[i].size - 1)
            ctx.fill()
            ctx.closePath()
        }

        if (this.start && !this.start.isWall) {

            ctx.beginPath()
            ctx.fillStyle = "green"
            ctx.rect(this.start.x + .5, this.start.y + .5, this.start.size - 1, this.start.size - 1)
            ctx.fill()
            ctx.closePath()
        }

        if (this.end && !this.end.isWall) {

            ctx.beginPath()
            ctx.fillStyle = "red"
            ctx.rect(this.end.x + .5, this.end.y + .5, this.end.size - 1, this.end.size - 1)
            ctx.fill()
            ctx.closePath()
        }
    }
}