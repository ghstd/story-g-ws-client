import Rect from "../classes/Rect.js"
import KeyMoveableRect from "../subClasses/KeyMoveableRect.js"
import DefaultBullet from "./DefaultBullet.js"
import Pieces from "./Pieces.js"
import { canvas, c } from "../utils/canvas.js"
import drawLightning from "../utils/drawLightning.js"
import getClosestCircles from "../utils/getClosestCircles.js"
import DefaultEnemy from "./DefaultEnemy.js"
import GamePhases from "../classes/GamePhases.js"
import getRandomColor from "../utils/getRandomColor.js"

export default class DefaultShootingRect extends KeyMoveableRect {
	constructor(options) {
		super(options)

		this.role = 'player'
		this.name = 'player_1'

		this.shootDefaultState = 'ready'
		this.shootRotatableState = 'ready'
		this.shootLightingState = 'ready'

		this.bullets = []
		this.pieces = []

		this.hitPoint = new Rect(this.x, this.y + this.h * 3 / 4, this.w, this.h / 4, '#C00B00')

		this.skillsParams = {
			shootDefault: {
				state: true,
				delay: 2000,
			},
			shootRotatable: {
				state: true,
				delay: 5000,
			},
			shootLighting: {
				state: true,
				delay: 10000,
			}
		}

		this.timeouts = {
			shootDefaultDelay: [this.skillsParams.shootDefault.delay, 0, 'done', 'callback'],
			shootRotatableDelay: [this.skillsParams.shootRotatable.delay, 0, 'done', 'callback'],
			shootLightingDelay: [this.skillsParams.shootLighting.delay, 0, 'done', 'callback']
		}

		this.piecesPalette = GamePhases.paletteFirework_yellow

		this.shootDefaultColor = '#FEFF0D'
		this.shootDefaultIMG = '../images/balls/04.png'

		this.shootRotatableColor = '#00633E'

		this.shootLightingColor = '#CC4C0A'
		this.shootLightingIMG = '../images/balls/02.png'

		this.checkLabirint_1 = 'active'
		this.checkLabirint_3 = 'active'

	}

	update({ correction, events, base, collisionObjects }) {

		if (this.checkLabirint_1 === 'active') {
			if (GamePhases.labirint_1 === 'active') {
				this.stoping = true
				this.active = false
			}

			if (GamePhases.labirint_1 === 'done') {
				this.stoping = false
				this.active = true
				this.checkLabirint_1 = 'done'
			}
		}

		if (this.checkLabirint_3 === 'active') {
			if (GamePhases.labirint_3 === 'active') {
				this.stoping = true
				this.active = false
			}

			if (GamePhases.labirint_3 === 'done') {
				this.stoping = false
				this.active = true
				this.checkLabirint_3 = 'done'
			}
		}

		super.update(events.arrows)

		this.detectCollision([...collisionObjects, ...KeyMoveableRect.defBlocks])

		this.checkTimeouts()

		this.hitPointUpdate()

		this.skillUpdate()

		this.shootDefault(events.mouse.click, events.mouse.x, events.mouse.y)
		this.shootRotatable(events.mouse.rclick, events.mouse.x, events.mouse.y)
		this.shootLighting(events.mouse.mclick, events.mouse.x, events.mouse.y)
		this.shootUpdate(correction, [base, ...DefaultEnemy.allEnemies])

		this.piecesUpdate(correction)

		return this.bullets
	}

	display() {
		super.display()

		c.fillStyle = '#FFCB00'
		c.fillRect(this.x + this.w / 2 - 2, this.y + 4, 4, 4)
		c.fillRect(this.x + this.w / 2 - 2, this.y + 12, 4, 4)
		c.fillRect(this.x + this.w / 2 - 2, this.y + 20, 4, 4)

		this.hitPoint.display()

		this.shootDisplay()
		this.piecesDisplay()

	}

	hitPointUpdate() {
		if (this.hitPoint.w <= 0) {
			this.withoutHP = true
			this.off()
		}
		if (this.hitPoint.w > 0 && this.withoutHP) {
			this.withoutHP = false
			this.on()
		}
		this.hitPoint.x = this.x
		this.hitPoint.y = this.y + this.h * 3 / 4
	}

	skillUpdate() {
		if (GamePhases.player_1.skill_1 === 0) {
			this.skillsParams.shootDefault.state = false
		}
		if (GamePhases.player_1.skill_1 === 1) {
			this.skillsParams.shootDefault.state = true
			this.timeouts.shootDefaultDelay[0] = 2000
		}
		if (GamePhases.player_1.skill_1 === 2) {
			this.skillsParams.shootDefault.state = true
			this.timeouts.shootDefaultDelay[0] = 1000
		}
		if (GamePhases.player_1.skill_1 === 3) {
			this.skillsParams.shootDefault.state = true
			this.timeouts.shootDefaultDelay[0] = 500
		}

		if (GamePhases.player_1.skill_2 === 0) {
			this.skillsParams.shootRotatable.state = false
		}
		if (GamePhases.player_1.skill_2 === 1) {
			this.skillsParams.shootRotatable.state = true
			this.timeouts.shootRotatableDelay[0] = 3000
		}
		if (GamePhases.player_1.skill_2 === 2) {
			this.skillsParams.shootRotatable.state = true
			this.timeouts.shootRotatableDelay[0] = 1800
		}
		if (GamePhases.player_1.skill_2 === 3) {
			this.skillsParams.shootRotatable.state = true
			this.timeouts.shootRotatableDelay[0] = 1200
		}

		if (GamePhases.player_1.skill_3 === 0) {
			this.skillsParams.shootLighting.state = false
		}
		if (GamePhases.player_1.skill_3 === 1) {
			this.skillsParams.shootLighting.state = true
			this.timeouts.shootLightingDelay[0] = 12000
		}
		if (GamePhases.player_1.skill_3 === 2) {
			this.skillsParams.shootLighting.state = true
			this.timeouts.shootLightingDelay[0] = 9000
		}
		if (GamePhases.player_1.skill_3 === 3) {
			this.skillsParams.shootLighting.state = true
			this.timeouts.shootLightingDelay[0] = 7000
		}

	}


	piecesUpdate(correction) {
		this.pieces.forEach((piece, index) => {
			piece.update(correction)

			if (piece.alpha <= 0) {
				this.pieces.splice(index, 1)
			}
		})
	}
	piecesDisplay() {
		this.pieces.forEach(piece => piece.display())
	}


	shootDefault(click, mx, my) {

		if (!this.active) return
		if (!this.skillsParams.shootDefault.state) return

		if (!click && this.shootDefaultState === 'done') {
			this.shootDefaultState = 'ready'
			return
		}

		if (click && this.shootDefaultState === 'ready') {
			const angle = Math.atan2(my - this.y, mx - this.x - this.w / 2);
			const vx = Math.cos(angle) * 1000;
			const vy = Math.sin(angle) * 1000;

			this.bullets.push(new DefaultBullet({
				x: this.x + this.w / 2,
				y: this.y,
				radius: 10,
				color: this.shootDefaultColor,
				vx: vx,
				vy: vy,
				role: 'playerBullet',
				img: this.shootDefaultIMG
			}))

			this.shootDefaultState = 'wait'

			this.runTimeout('shootDefaultDelay', () => {
				this.shootDefaultState = 'done'
			})
		}
	}
	shootRotatable(click, mx, my) {

		if (!this.active) return
		if (!this.skillsParams.shootRotatable.state) return

		if (!click && this.shootRotatableState === 'done') {
			this.shootRotatableState = 'ready'
			return
		}

		if (click && this.shootRotatableState === 'ready') {
			const angle = Math.atan2(my - this.y, mx - this.x - this.w / 2);
			const vx = Math.cos(angle) * 500;
			const vy = Math.sin(angle) * 500;

			this.bullets.push(new DefaultBullet({
				x: this.x - this.w / 2,
				y: this.y,
				radius: 10,
				color: this.shootRotatableColor,
				vx: vx,
				vy: vy,
				role: 'playerBullet',
				rotatable: true,
				angle: 0,
			}))

			this.bullets.push(new DefaultBullet({
				x: this.x - this.w / 2,
				y: this.y,
				radius: 10,
				color: this.shootRotatableColor,
				vx: vx,
				vy: vy,
				role: 'playerBullet',
				rotatable: true,
				revers: true,
				angle: 0,
			}))

			this.shootRotatableState = 'wait'

			this.runTimeout('shootRotatableDelay', () => {
				this.shootRotatableState = 'done'
			})
		}
	}
	shootLighting(click, mx, my) {

		if (!this.active) return
		if (!this.skillsParams.shootLighting.state) return

		if (!click && this.shootLightingState === 'done') {
			this.shootLightingState = 'ready'
			return
		}

		if (click && this.shootLightingState === 'ready') {
			const angle = Math.atan2(my - this.y, mx - this.x - this.w / 2);
			const vx = Math.cos(angle) * 500;
			const vy = Math.sin(angle) * 500;

			this.bullets.push(new DefaultBullet({
				x: this.x + this.w / 2,
				y: this.y,
				radius: 10,
				color: this.shootLightingColor,
				vx: vx,
				vy: vy,
				role: 'playerBullet',
				lightning: true,
				img: this.shootLightingIMG
			}))

			this.shootLightingState = 'wait'

			this.runTimeout('shootLightingDelay', () => {
				this.shootLightingState = 'done'
			})
		}
	}
	shootUpdate(correction, gameObjects) {

		this.bullets.forEach(bullet => {

			if (bullet.rotatable) {

				if (bullet.revers) {
					bullet.x = bullet.x + bullet.vx * correction
					bullet.y = bullet.y + bullet.vy * correction
					bullet.angle = bullet.angle - 0.1
					bullet.display(bullet.x + 30 * Math.cos(bullet.angle), bullet.y + 30 * Math.sin(bullet.angle))
				} else {
					bullet.x = bullet.x + bullet.vx * correction
					bullet.y = bullet.y + bullet.vy * correction
					bullet.angle = bullet.angle + 0.1
					bullet.display(bullet.x + 30 * Math.cos(bullet.angle), bullet.y + 30 * Math.sin(bullet.angle))
				}

				c.strokeStyle = '#FFCB00'
				c.lineWidth = 4
				c.arc(bullet.x + 30 * Math.cos(bullet.angle), bullet.y + 30 * Math.sin(bullet.angle), bullet.radius, 0, Math.PI * 2)
				c.stroke()

			} else {
				bullet.update(correction)
			}
		})
		this.bullets.forEach((bullet, index) => {

			const target = bullet.detectCollision(gameObjects);

			if (target === 'base') {
				const x = bullet.vx;
				const y = bullet.vy;

				bullet.vx = y
				bullet.vy = -x
			}

			if (target === 'enemy' || bullet.shouldRemoved) {
				for (let i = 0; i < 16; i++) {
					this.pieces.push(new Pieces({
						x: bullet.x,
						y: bullet.y,
						radius: Math.random() * 3,
						color: getRandomColor(this.piecesPalette),
						vx: (Math.random() - 0.5) * (Math.random() * 1000),
						vy: (Math.random() - 0.5) * (Math.random() * 1000)
					}))
				}

				this.bullets.splice(index, 1)
			}
		})
		this.bullets.forEach((bullet, index) => {
			if (bullet.crossedBoundaries()) {
				this.bullets.splice(index, 1)
			}
		})
	}
	shootDisplay() {
		this.bullets.forEach(bullet => {

			if (bullet.rotatable) return

			if (bullet.lightning) {

				bullet.display()
				c.save()
				c.translate(bullet.x, bullet.y)
				c.rotate(Math.random() * 3)
				drawLightning({ x: 0, y: 0 }, { x: 0 + 30, y: 0 + 30 }, 5)
				drawLightning({ x: 0, y: 0 }, { x: 0 - 30, y: 0 + 30 }, 5)
				drawLightning({ x: 0, y: 0 }, { x: 0 - 30, y: 0 - 30 }, 5)
				drawLightning({ x: 0, y: 0 }, { x: 0 + 30, y: 0 - 30 }, 5)
				c.restore()

				if (bullet.lightningTimer >= 17) {

					const targets = getClosestCircles(bullet, DefaultEnemy.bullets.flat(), 500);

					for (let i = 0; i < 4; i++) {
						if (!targets[i]) break
						drawLightning(bullet, targets[i])
						targets[i].shouldRemoved = true
					}
					bullet.lightningTimer = 0
				} else {
					bullet.lightningTimer = bullet.lightningTimer + 1
				}

			} else {
				bullet.display()
			}
		})
	}
}

