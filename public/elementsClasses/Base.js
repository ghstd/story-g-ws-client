import animateControls from "../animate.js"
import Circle from "../classes/Circle.js"
import { canvas, c } from "../utils/canvas.js"

export default class Base extends Circle {
	constructor(options) {
		super(options)

		this.name = 'base'
		this.role = 'base'

		this.hitPoint = new Circle({
			x: this.x,
			y: this.y,
			radius: this.radius - 10,
			color: '#1fa990',
			type: 'stroke',
			form: -Math.PI / 4 * 3 - 0.04,
			startForm: -Math.PI / 4 + 0.04,
			direction: true
		})


		this.snowTimer = true
		this.snowItems = []
	}

	hitPointUpdate() {
		if (this.hitPoint.startForm < this.hitPoint.form) {

			this.hitPoint.color = 'rgba(255,255,255,0)'

			cancelAnimationFrame(animateControls.stopID)
			document.querySelector('.notice').classList.add('active')
		}
	}

	display() {
		super.display()

		this.hitPointUpdate()

		this.hitPoint.display()

		this.makeSnow()
		this.snowItems.forEach(item => item.display())

	}

	makeSnow() {
		if (this.snowTimer) {
			this.snowTimer = false

			this.snowItems.push({
				parentArr: this.snowItems,
				x: canvas.width / 2 + (Math.random() - 0.5) * 200,
				y: (canvas.height - Math.random() * 100) - 10,
				vx: (Math.random() - 0.5) * 2,
				vy: 0.5,
				display() {
					const sides = Math.floor(Math.random() * 2 + 3)
					c.strokeStyle = '#1fa990'
					c.lineWidth = 1
					c.beginPath()
					c.save()
					c.translate(this.x, this.y)
					c.moveTo(0, 0)
					for (let i = 0; i < sides * 2; i++) {
						c.lineTo(0, -3)
						c.rotate(Math.PI / sides)
						c.moveTo(0, 0)
					}
					c.restore()
					c.stroke()

					this.x += this.vx
					this.y += this.vy

					if (this.y > canvas.height) {
						const index = this.parentArr.findIndex(item => item === this);
						this.parentArr.splice(index, 1)
					}
				}
			})

			setTimeout(() => {
				this.snowTimer = true
			}, 300);
		}
	}

}