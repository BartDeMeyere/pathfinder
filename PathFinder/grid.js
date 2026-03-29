import { Cell } from "./cell.js"
import { Mouse } from "../PathFinder/mouse/mouse.js"

export class Grid {

    constructor(rows, cols, cellsize, engine) {

        this.rows = rows
        this.cols = cols
        this.cellsize = cellsize
        this.cells = []
        this.engine = engine
        this.mouse = new Mouse(this.engine.canvas, this.engine.dpr)

    }

    create() {


        this.engine.canvas.width = this.cols * this.cellsize * this.engine.dpr
        this.engine.canvas.height = this.rows * this.cellsize * this.engine.dpr
        this.engine.canvas.style.width = this.cols * this.cellsize + "px"
        this.engine.canvas.style.height = this.rows * this.cellsize + "px"

        this.engine.ctx.scale(this.engine.dpr, this.engine.dpr)

        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = []
            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j] = new Cell(j * this.cellsize, i * this.cellsize, this.cellsize, i, j)
            }
        }

    }

    createRandomWalls() {

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let cell = this.cells[i][j]
                if (cell) cell.isWall = false
            }
        }

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let cell = this.cells[i][j]
                if (Math.random() < .1) cell.isWall = true
            }
        }
    }

    clearWalls() {

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j].isWall = false
            }
        }
    }

    shrinkWall(row, col) {

        this.cells[row][col].isWall = false
    }

    createWall() {

        if (!this.mouse.isDown) return

        const rect = this.engine.canvas.getBoundingClientRect()
        const x = (this.mouse.position.x / this.engine.dpr) - rect.left
        const y = (this.mouse.position.y / this.engine.dpr) - rect.top
        const col = Math.floor(x / this.cellsize)
        const row = Math.floor(y / this.cellsize)
        this.cells[row][col].isWall = true

    }

    update() {

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j].draw(this.engine.ctx)
            }
        }

    }
}