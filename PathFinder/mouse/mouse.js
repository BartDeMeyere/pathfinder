export class Mouse {

    constructor(element, dpr) {

        this.element = element
        this.dpr = dpr || 1
        this.position = { x: 0, y: 0 }
        this.isDown = false
        this.init()
    }

    init() {

        this.element.addEventListener("mousemove", (e) => {

            this.position.x = e.clientX * this.dpr 
            this.position.y = e.clientY * this.dpr 

        })

        this.element.addEventListener("mousedown", (e) => {

            this.isDown = true
            this.position.x = e.clientX * this.dpr
            this.position.y = e.clientY * this.dpr

        })

        this.element.addEventListener("mouseup", (e) => {

            this.isDown = false

        })

        this.element.addEventListener("touchstart", (e) => {

            console.log("touching screen")
            this.isDown = true
        })

        this.element.addEventListener("touchmove", (e) => {

            let touch = e.touches[0]
            
            if (this.isDown) {

                this.position.x = touch.clientX * this.dpr
                this.position.y = touch.clientY * this.dpr
            }
        })

        this.element.addEventListener("touchend", (e) => {

            console.log("end of touching")
            this.isDown = false
        })
    }
}