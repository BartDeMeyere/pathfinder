export class Division {

    constructor(grid) {

        this.grid = grid
        this.timeOut = null
        this.outerWallfinished = false
        this.steps = []
        this.running = false
    }

    create() {

        this.drawOuterWalls()

    }

    drawOuterWalls() {

        let row_count = 0
        let col_count = 0
        this.running = true

        let loop = () => {

            if (!this.running) return

            this.getCell(row_count, col_count).isWall = true

            if (col_count < this.grid.cells[0].length - 1 && row_count === 0) {

                col_count++

            } else if (col_count === this.grid.cells[0].length - 1 && row_count < this.grid.cells.length - 1) {

                row_count++

            } else if (row_count === this.grid.cells.length - 1 && col_count > 0) {

                col_count--

            } else if (row_count > 0 && col_count === 0) {

                row_count--
            }

            if (row_count === 0 && col_count === 0) {

                this.division("vertical", row_count, col_count, this.grid.cells.length - 1, this.grid.cells[0].length - 1)
                this.animate()
                return

            }

            this.timeOut = setTimeout(loop, 5)

        }

        loop()
    }

    getCell(row, col) {

        if (this.grid.cells[row] === undefined) return false
        if (this.grid.cells[row][col] === undefined) return false
        return this.grid.cells[row][col]
    }

    division(orientation, startrow, startcol, endrow, endcol) {

        if (endrow - startrow <= 2 || endcol - startcol <= 2) return

        if (orientation === "vertical") {

            let col = this.randomEvenNumber(startcol, endcol)
            let hole = this.randomOddNumber(startrow, endrow)

            for (let i = startrow + 1; i < endrow; i++) {

                if (i !== hole) {

                    //this.getCell(i, col).isWall = true
                    this.steps.push({ row: i, col: col })
                }
            }

            this.division("horizontal", startrow, startcol, endrow, col)
            this.division("horizontal", startrow, col, endrow, endcol)


        } else {

            let row = this.randomEvenNumber(startrow, endrow)
            let hole = this.randomOddNumber(startcol, endcol)

            for (let i = startcol + 1; i < endcol; i++) {

                if (i !== hole) {

                    //this.getCell(row, i).isWall = true
                    this.steps.push({ row: row, col: i })
                }
            }

            this.division("vertical", startrow, startcol, row, endcol)
            this.division("vertical", row, startcol, endrow, endcol)

        }

    }

    randomOddNumber(start, end) {

        let n = []

        for (let i = start + 1; i < end; i++) {

            if (i % 2 > 0) n.push(i)
        }

        return n[Math.floor(Math.random() * n.length)]
    }

    randomEvenNumber(start, end) {

        let n = []

        for (let i = start + 1; i < end; i++) {

            if (i % 2 === 0) n.push(i)
        }

        return n[Math.floor(Math.random() * n.length)]
    }

    animate() {

        let i = 0

        let loop = () => {

            if (!this.running) return

            if (i > this.steps.length - 1) return

            let step = this.steps[i]
            let cell = this.getCell(step.row, step.col)

            if (cell) cell.isWall = true

            i++

            setTimeout(loop, 5)
        }

        loop()
    }
}