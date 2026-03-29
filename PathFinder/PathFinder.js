import { Renderer } from "./renderer/renderer.js"
import { Grid } from "./grid.js"
import { Astar } from "./Astar.js"
import { DepthFirstSearch } from "./mazegenerators/depthfirstsearch.js"
import { Division } from "./mazegenerators/division.js"

export class Pathfinder {

    constructor({ canvas }) {

        if (!canvas) {

            throw new Error('PathGrid: canvas is required')
        }

        this.canvas = canvas
        this.dpr = window.devicePixelRatio || 1
        this.ctx = null
        this.grid = null
        this.backgroundColor = "ghostwhite"
        this.astar = null
        this.mazegenerator = null
        this.init()

    }

    init() {

        this.canvas.style.backgroundColor = this.backgroundColor
        this.ctx = this.canvas.getContext("2d")

        this.renderer = new Renderer(this.canvas, this.ctx, this)
        this.renderer.render()

    }

    buildGrid(rows, cols, cellsize) {

        if (rows % 2 === 0 || cols % 2 === 0) {

            throw new Error('PathFinder: rows and columns must be odd values')
        }

        this.grid = new Grid(rows, cols, cellsize, this)

        this.grid.create()
    }


    buildGridFromViewport(rows, cols) {

        if (rows % 2 === 0 || cols % 2 === 0) {

            throw new Error('PathFinder: rows and columns must be odd values')
        }

        let cellsize = innerWidth / cols
        this.grid = new Grid(rows, cols, cellsize, this)
        this.grid.create()

    }

    createWall() {

        this.grid.createWall()
    }

    createRandomWalls() {

        this.grid.createRandomWalls()
    }

    shrinkWall(row, col) {

        this.grid.shrinkWall(row, col)
    }

    findPath(startrow, startcol, endrow, endcol) {

        if (!this.grid) throw new Error("PathFinder: Grid not initialized")
        this.astar = new Astar(this.grid, startrow, startcol, endrow, endcol)
        this.astar.find()
    }

    clearWalls() {

        this.grid.clearWalls()

    }

    reset() {

        $("#output").html("")

        if (this.mazegenerator) {
            clearTimeout(this.mazegenerator.timeOut)
            this.mazegenerator.running = false
        }

        if (this.astar) {

            clearTimeout(this.astar.timeOut)
            this.astar.running = false
        }

        this.astar = null
        this.mazegenerator = null

    }

    getRowCount() {
        if (!this.grid) throw new Error("Grid not initialized")
        return this.grid.rows
    }

    getColCount() {
        if (!this.grid) throw new Error("Grid not initialized")
        return this.grid.cols
    }

    createMaze(type) {

        this.reset()
        this.clearWalls()

        switch (type) {

            case "dfs":
                this.mazegenerator = new DepthFirstSearch(this.grid)
                break;
            case "division":
                this.mazegenerator = new Division(this.grid)
                break;
        }

        //this.loadMazeGenerator()
        if (this.mazegenerator !== null) this.mazegenerator.create()

    }

    update() {

        if (this.grid) this.grid.update(this.ctx)
        if (this.astar) this.astar.draw(this.ctx)

    }

}