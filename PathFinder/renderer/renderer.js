export class Renderer {

    constructor(canvas, ctx, engine) {

        this.canvas = canvas
        this.ctx = ctx
        this.engine = engine
    }

    render() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.engine.update()
        requestAnimationFrame(() => this.render())
    }
}