import Rect from '../classes/Rect.js'
import PushableRect from '../elementsClasses/PushableRect.js'
import { canvas, c } from '../utils/canvas.js'
import detectCollisionAny from '../utils/detectCollisionEny.js'
import detectCollisionRect from '../utils/detectCollisionRect.js'
import Area from '../classes/Area.js'
import GamePhases from '../classes/GamePhases.js'


export default class KeyMoveableRect extends Rect {
	static defBlocks = []
	constructor({ x, y, w, h, color, vx, vy, startX, startY }) {
		super(x, y, w, h, color)

		this.vx = vx
		this.vy = vy
		this.startX = startX || this.x
		this.startY = startY || this.y
		this.active = true
		this.stoping = false
		this.withoutHP = false
		this.currentDirection = {
			x: 0,
			y: 0
		}
	}

	update(keys) {

		this.currentDirection.x = 0
		this.currentDirection.y = 0

		this._saveX = this.x
		this._saveY = this.y

		const { up, down, left, right } = keys;

		if (this.active) {
			if (up) {
				this.y = this.y - this.vy
				this.currentDirection.y = - this.vy
			}

			if (down) {
				this.y = this.y + this.vy
				this.currentDirection.y = this.vy
			}

			if (left) {
				this.x = this.x - this.vx
				this.currentDirection.x = - this.vx
			}

			if (right) {
				this.x = this.x + this.vx
				this.currentDirection.x = this.vx
			}

		}
		if (this.stoping) {
			this.x = this._saveX
			this.y = this._saveY
		}

		if (this.x <= 0 || this.x + this.w >= canvas.width) {
			this.x = this._saveX
		}
		if (this.y <= 0 || this.y + this.h >= canvas.height) {
			this.y = this._saveY
		}
	}

	on() {
		this.active = true
		this.stoping = false
	}

	off() {
		this.active = false
		this.stoping = true
		this.x = this.startX
		this.y = this.startY
	}

	detectCollision(rects) {

		if (!this.active) return

		rects.forEach(rect => {

			if (rect.role === 'base') {
				if (rect.radius + this.w / 4 > Math.hypot(rect.x - (this.x + this.w / 2), rect.y - (this.y + this.h / 2))) {
					this.x = this._saveX
					this.y = this._saveY
				}
				return
			}

			if (detectCollisionRect(this, rect)) {
				if (rect.role === 'pushable') {
					rect.update(rects, this.currentDirection)
					return
				}

				if (rect.role === 'interacting') {

					if (GamePhases[this.name][rect.name] === 3) {
						GamePhases.hp[this.name] += 1
					} else {
						GamePhases[this.name][rect.name] += 1
					}

					rect.shouldRemoved = true
					rect.openEffect()
					return
				}

				this.x = this._saveX
				this.y = this._saveY

			}
		})
	}

	runTimeout(skill, callback) {
		this.timeouts[skill][3] = callback
		this.timeouts[skill][2] = 'start'
	}
	checkTimeouts() {
		const skills = Object.keys(this.timeouts);

		skills.forEach(skill => {
			if (this.timeouts[skill][2] === 'start') {
				if (this.timeouts[skill][1] >= this.timeouts[skill][0]) {
					this.timeouts[skill][2] = 'done'
					this.timeouts[skill][1] = 0
					this.timeouts[skill][3]()

					if (Area.loaders.hasOwnProperty(skill)) Area.loaders[skill] = 0
				} else {
					this.timeouts[skill][1] = (this.timeouts[skill][1] * 0.06 + 1) / 0.06

					if (Area.loaders.hasOwnProperty(skill)) Area.loaders[skill] = this.timeouts[skill][1] / this.timeouts[skill][0]
				}
			}
		})
	}

}