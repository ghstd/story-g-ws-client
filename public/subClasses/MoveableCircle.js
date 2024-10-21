import Circle from "../classes/Circle.js"
import { canvas, c } from "../utils/canvas.js"

export default class MoveableCircle extends Circle {
	constructor(options) {
		super(options)

		this.vx = options.vx
		this.vy = options.vy

	}

	update(correction) {
		this.x = this.x + this.vx * correction
		this.y = this.y + this.vy * correction
	}


}