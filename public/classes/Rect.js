import { canvas, c } from '../utils/canvas.js'

export default class Rect {
	constructor(x, y, w, h, color = 'green') {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.color = color
	}

	display() {
		c.fillStyle = this.color
		c.fillRect(this.x, this.y, this.w, this.h)
	}
}