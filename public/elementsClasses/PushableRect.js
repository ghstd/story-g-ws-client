import GamePhases from '../classes/GamePhases.js'
import Rect from '../classes/Rect.js'
import KeyMoveableRect from '../subClasses/KeyMoveableRect.js'
import { canvas } from '../utils/canvas.js'
import detectCollisionRect from '../utils/detectCollisionRect.js'

export default class PushableRect extends Rect {
	constructor({ x, y, w, h, color, hp }) {
		super(x, y, w, h, color)

		this.hp = hp
		this.currentHP = hp
		this.role = 'pushable'
		this.hitPoint = new Rect(this.x, this.y + this.h, this.w, -this.h, GamePhases.paletteBricks.color)

	}

	update(rects = [], offset = { x: 0, y: 0 }) {

		if (this.x + this.w / 2 <= 0 || this.x + this.w / 2 >= canvas.width || this.y + this.h / 2 >= canvas.height) {
			const index = KeyMoveableRect.defBlocks.findIndex(item => item === this);
			KeyMoveableRect.defBlocks.splice(index, 1)
			return
		}

		this._saveX = this.x
		this._saveY = this.y

		this.x = this.x + offset.x
		this.y = this.y + offset.y

		this.detectCollision(rects, offset)

		this.hitPointUpdate()

	}

	display() {
		super.display()

		this.hitPoint.display()
	}

	detectCollision(rects, offset) {

		rects.forEach(rect => {

			if (rect === this) return

			if (rect.role === 'base') {
				if (rect.radius + this.w / 4 > Math.hypot(rect.x - (this.x + this.w / 2), rect.y - (this.y + this.h / 2))) {
					const index = KeyMoveableRect.defBlocks.findIndex(item => item === this);
					KeyMoveableRect.defBlocks.splice(index, 1)
					return
				}
			}

			if (detectCollisionRect(this, rect)) {

				if (rect.role === 'pushable') {
					rect.update(rects, offset)
				}
			}
		})
	}

	hitPointUpdate() {
		if (this.currentHP <= 0) {
			const index = KeyMoveableRect.defBlocks.findIndex(item => item === this);
			KeyMoveableRect.defBlocks.splice(index, 1)
			return
		}
		this.hitPoint.x = this.x
		this.hitPoint.y = this.y + this.h
		this.hitPoint.h = -(this.h / this.hp * this.currentHP)
	}
}