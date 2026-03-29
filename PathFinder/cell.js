export class Cell {

    constructor(x, y, size, row, col) {

        this.x = x
        this.y = y
        this.size = size
        this.row = row
        this.col = col

        this.isWall = false
        this.color = null

        this.h = 0
        this.g = 0
        this.f = 0

        this.scale = 0
        this.parent = null
        this.visited = false
        this.isDoorway = false
    }


    update() {

        let target = this.isWall ? this.size : 0
        let easing = 0.08

        this.scale += (target - this.scale) * easing

        if (Math.abs(this.scale - target) < 0.1) {
            this.scale = target
        }
    }

    draw(ctx) {

        this.update()
        if (this.scale > 0) {


            ctx.save()
            ctx.translate(this.x + this.size / 2, this.y + this.size / 2)
            ctx.beginPath()
            ctx.fillStyle = "#777"
            ctx.rect(-this.scale / 2, -this.scale / 2, this.scale, this.scale)
            ctx.fill()
            ctx.closePath()
            ctx.restore()
        }

        ctx.beginPath()
        ctx.strokeStyle = "#888"
        ctx.lineWidth = .5
        ctx.rect(this.x, this.y, this.size, this.size)
        ctx.stroke()
        ctx.closePath()


    }

}