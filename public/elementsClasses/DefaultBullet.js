import GamePhases from "../classes/GamePhases.js"
import MoveableCircle from "../subClasses/MoveableCircle.js"
import { canvas, c } from "../utils/canvas.js"
import detectCollisionCircle from "../utils/detectCollisionCircle.js"
import detectCollisionAny from "../utils/detectCollisionEny.js"

export default class DefaultBullet extends MoveableCircle {
	constructor(options) {
		super(options)

		this.role = options.role
		this.shouldRemoved = false
		this.rotatable = options.rotatable
		this.revers = options.revers
		this.angle = options.angle
		this.lightning = options.lightning

		this.lightningTimer = 0

	}

	crossedBoundaries() {
		if (this.y + this.radius <= 0 && this.vy < 0 || this.y - this.radius > canvas.height && this.vy > 0) {
			return true
		}
	}

	detectCollision(gameObjects) {
		let result = false;

		if (this.x - this.radius <= 0 && this.vx < 0 || this.x + this.radius > canvas.width && this.vx > 0) {
			this.vx = - this.vx
			if (Math.abs(this.vy) < 50) {
				this.vy <= 0 ? this.vy -= 10 : this.vy += 10
			}
		}

		gameObjects.forEach(gObject => {
			if (gObject.role === 'player') {

				if (detectCollisionAny(this, gObject)) {
					if (gObject.hitPoint.w > 0) gObject.hitPoint.w = gObject.hitPoint.w - gObject.w / 10

					result = 'player'
					return
				}
			}

			if (gObject.role === 'pushable') {

				if (detectCollisionAny(this, gObject)) {
					gObject.currentHP = gObject.currentHP - 1

					result = 'pushable'
					return
				}
			}

			if (gObject.role === 'controllableBullet') {

				if (detectCollisionAny(this, gObject)) {
					result = 'controllableBullet'
					return
				}
			}

			// rotatable

			if (this.rotatable) {

				let target;

				if (this.revers) {
					target = {
						x: this.x + 30 * Math.cos(this.angle),
						y: this.y + 30 * Math.sin(this.angle),
						radius: this.radius
					}
				} else {
					target = {
						x: this.x + 30 * Math.cos(this.angle),
						y: this.y + 30 * Math.sin(this.angle),
						radius: this.radius
					}
				}

				if (detectCollisionCircle(target, gObject)) {

					if (gObject.role === 'enemy') {

						gObject.hitPoint.startForm = gObject.hitPoint.startForm + (Math.PI * 2) / GamePhases.enemiesHP[gObject.name]

						result = 'enemy'
						return
					}

					if (gObject.role === 'base') {
						result = 'base'
						return
					}
				}
			}

			if (detectCollisionCircle(this, gObject)) {

				if (gObject.role === 'enemy') {
					gObject.hitPoint.startForm = gObject.hitPoint.startForm + (Math.PI * 2) / GamePhases.enemiesHP[gObject.name]

					result = 'enemy'
					return
				}

				if (gObject.role === 'base') {
					if (this.role === 'playerBullet') {
						result = 'base'
						return
					}

					gObject.hitPoint.startForm = gObject.hitPoint.startForm + gObject.hitPoint.form / GamePhases.baseHP[gObject.name]

					result = 'base'
					return
				}

				if (gObject.role === 'playerBullet') {
					gObject.shouldRemoved = true

					result = 'playerBullet'
					return
				}

				if (gObject.role === 'playerShield') {
					result = 'playerShield'
					return
				}

				const x = this.vx
				const y = this.vy

				this.vx = y
				this.vy = -x
			}
		})

		return result
	}

}