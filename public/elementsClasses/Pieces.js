import { canvas, c } from "../utils/canvas.js"
import MoveableCircle from "../subClasses/MoveableCircle.js"

export default class Pieces extends MoveableCircle {
	constructor(options) {
		super(options)

		this.slowdown = 0.99
		this.alpha = 1
	}

	update(correction) {
		super.update(correction)

		this.vx = this.vx * this.slowdown
		this.vy = this.vy * this.slowdown
		this.alpha = this.alpha - 0.01
	}

	display() {

		c.save()
		c.globalAlpha = this.alpha
		super.display()
		c.restore()

	}
}