import { canvas, c } from '../utils/canvas.js'

export default class Circle {
	constructor({ x, y, radius, color = 'white', type = 'fill', form = 2 * Math.PI, startForm = 0, img = '', direction = false }) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = color
		this.type = type
		this.form = form
		this.startForm = startForm
		this.direction = direction
		this.hasImg = false
		if (img) {
			this.hasImg = true
			this.img = new Image()
			this.img.src = img
		}
	}

	display(x, y) {
		x = x || this.x
		y = y || this.y

		if (this.type === 'fill') {
			c.fillStyle = this.color

			c.beginPath()
			c.arc(x, y, this.radius, this.startForm, this.form)
			c.closePath()
			c.fill()
		}

		if (this.type === 'stroke') {

			if (this.direction) {
				c.strokeStyle = this.color
				c.lineWidth = 8

				c.beginPath()
				c.arc(this.x, this.y, this.radius, this.startForm, this.form, true)
				c.stroke()
			} else {
				c.strokeStyle = this.color
				c.lineWidth = 2

				c.beginPath()
				c.arc(this.x, this.y, this.radius, this.startForm, this.form)
				c.stroke()
			}


		}

		if (this.hasImg) {
			c.drawImage(this.img, 0, 0, 16, 16,
				this.x - this.radius,
				this.y - this.radius,
				this.radius * 2,
				this.radius * 2)
		}
	}
}

























