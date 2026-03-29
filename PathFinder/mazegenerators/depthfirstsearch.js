export class DepthFirstSearch {

    constructor(grid) {

        this.grid = grid
        this.stack = []
        this.running = false 
        this.timeOut = null
        this.current = this.pickrandomCell()
    }

    pickrandomCell() {

        let row, col

        do {

            row = Math.floor(Math.random() * this.grid.cells.length)
            col = Math.floor(Math.random() * this.grid.cells[row].length)

        } while (row % 2 === 0 || col % 2 === 0)

        return this.grid.cells[row][col]
    }

    getCell(row, col) {

        if (this.grid.cells[row] === undefined) return false
        if (this.grid.cells[row][col] === undefined) return false
        return this.grid.cells[row][col]
    }

    createWalls(row, col) {

        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i !== 0 || j !== 0) {
                    if (this.getCell(row + i, col + j) && !this.getCell(row + i, col + j).isDoorway) {
                        this.getCell(row + i, col + j).isWall = true
                    }

                }

            }
        }
    }

    getneighbors(row, col) {

        let neighbors = []

        let indexes = [

            [-2, 0], [0, 2], [2, 0], [0, -2]
        ]

        for (let i = 0; i < indexes.length; i++) {

            let cell = this.getCell(row + indexes[i][0], col + indexes[i][1])

            if (cell && !cell.visited) {

                neighbors.push(cell)
            }

        }

        return neighbors[Math.floor(Math.random() * neighbors.length)]
    }

    createDoorway(cellA, cellB) {

        if (cellB.row === cellA.row + 2) {

            this.getCell(cellA.row + 1, cellA.col).isWall = false
            this.getCell(cellA.row + 1, cellA.col).isDoorway = true
        }

        if (cellB.row === cellA.row - 2) {

            this.getCell(cellA.row - 1, cellA.col).isWall = false
            this.getCell(cellA.row - 1, cellA.col).isDoorway = true
        }

        if (cellB.col === cellA.col + 2) {

            this.getCell(cellA.row, cellA.col + 1).isWall = false
            this.getCell(cellA.row, cellA.col + 1).isDoorway = true
        }

        if (cellB.col === cellA.col - 2) {

            this.getCell(cellA.row, cellA.col - 1).isWall = false
            this.getCell(cellA.row, cellA.col - 1).isDoorway = true

        }
    }

    create() {

        this.reset()

        if(this.running)return
        this.running = true

        let loop = () => {

            let nextcell = this.getneighbors(this.current.row, this.current.col)

            if (nextcell) {

                this.createWalls(this.current.row, this.current.col)
                this.createWalls(nextcell.row, nextcell.col)
                this.createDoorway(this.current, nextcell)
                nextcell.visited = true
                this.stack.push(nextcell)
                this.current = nextcell
                
            }else{

                if(this.stack.length > 0) {

                    this.current = this.stack.pop()

                }else{

                    $("#output").html("maze is created!")
                    this.running = false
                    return
                }
            }

            this.timeOut = setTimeout(loop, 0)
        }

        loop()
    }

    reset(){

        this.grid.cells.forEach(row => {
            row.forEach(cell => {

                cell.visited = false 
                cell.isDoorway = false
            })
        })
    }
}