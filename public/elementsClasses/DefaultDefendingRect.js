import { canvas, c } from "../utils/canvas.js"
import Circle from "../classes/Circle.js"
import Rect from "../classes/Rect.js"
import KeyMoveableRect from "../subClasses/KeyMoveableRect.js"
import detectCollisionAny from "../utils/detectCollisionEny.js"
import DefaultBullet from "./DefaultBullet.js"
import Pieces from "./Pieces.js"
import PushableRect from "./PushableRect.js"
import drawFigure from "../utils/drawFigure.js"
import Area from "../classes/Area.js"
import DefaultEnemy from "./DefaultEnemy.js"
import detectCollisionRect from "../utils/detectCollisionRect.js"
import GamePhases from "../classes/GamePhases.js"
import getRandomColor from "../utils/getRandomColor.js"

export default class DefaultDefendingRect extends KeyMoveableRect {
	constructor(options) {
		super(options)

		this.role = 'player'
		this.name = 'player_2'
		this.hitPoint = new Rect(this.x, this.y + this.h * 3 / 4, this.w, this.h / 4, '#C00B00')

		this.ring = new Circle({
			x: this.x + this.w / 2,
			y: this.y + this.h / 2,
			radius: 0,
			color: 'rgba(250,250,250,0.3)'
		})
		this.ring.role = 'playerShield'
		this.ringState = 'ready'

		this.blocksState = 'ready'
		this.blocks = []

		this.controllableBullet = []
		this.controllableBulletState = 'ready'
		this.controllableBulletAngle = 0
		this.pieces = []

		this.wanderingBullets = []
		this.wanderingBulletsState = 'ready'
		this.wanderingBulletsTimer = 20

		this.skillsParams = {
			ring: {
				state: true,
				delay: 5000,
				activePeriod: 3000,
				maxRadius: 30
			},
			blocks: {
				state: true,
				delay: 10000,
				activePeriod: 500000,
				quantity: 3,
				hp: 2
			},
			wanderingBullets: {
				state: true,
				delay: 5000,
				quantity: 5
			},
			controllableBullet: {
				state: true,
				delay: 20000,
				activePeriod: 10000,
				vx: 5,
				vy: 5
			}
		}

		this.timeouts = {
			ringDelay: [this.skillsParams.ring.delay, 0, 'done', 'callback'],
			ringActivePeriod: [this.skillsParams.ring.activePeriod, 0, 'done', 'callback'],
			wanderingBulletsDelay: [this.skillsParams.wanderingBullets.delay, 0, 'done', 'callback'],
			blocksDelay: [this.skillsParams.blocks.delay, 0, 'done', 'callback'],
			blocksActivePeriod: [this.skillsParams.blocks.activePeriod, 0, 'done', 'callback'],
			controllableBulletDelay: [this.skillsParams.controllableBullet.delay, 0, 'done', 'callback'],
			controllableBulletActivePeriod: [this.skillsParams.controllableBullet.activePeriod, 0, 'done', 'callback']
		}

		this.piecesPalette = GamePhases.paletteFirework_green

		this.wanderingBulletsColor = '#00B06F'
		this.wanderingBulletsIMG = '../images/balls/09.png'

		this.checkLabirint_2 = 'active'
		this.checkLabirint_4 = 'active'

	}

	update({ correction, events, base, collisionObjects }) {

		if (this.checkLabirint_2 === 'active') {
			if (GamePhases.labirint_2 === 'active') {
				this.stoping = true
				this.active = false
			}

			if (GamePhases.labirint_2 === 'done') {
				this.stoping = false
				this.active = true
				this.checkLabirint_2 = 'done'
			}
		}

		if (this.checkLabirint_4 === 'active') {
			if (GamePhases.labirint_4 === 'active') {
				this.stoping = true
				this.active = false
			}

			if (GamePhases.labirint_4 === 'done') {
				this.stoping = false
				this.active = true
				this.checkLabirint_4 = 'done'
			}
		}

		super.update(events.wasd)

		this.detectCollision([...collisionObjects, ...this.blocks])

		this.checkTimeouts()

		this.hitPointUpdate()

		this.skillUpdate()

		this.useRing(events.key.q)
		this.useRingUpdate()

		this.useBlocks(events.key.r)
		this.useBlocksUpdate([base])

		this.useControllableBullet(events.key.f)
		this.useControllableBulletUpdate(events.wasd, events.num.digit1, DefaultEnemy.allEnemies)
		this.piecesUpdate(correction)

		this.useWanderingBullets(events.key.e)
		this.useWanderingBulletsUpdate(correction, [base, ...DefaultEnemy.allEnemies])

		return [this.ring, ...this.blocks, ...this.controllableBullet, ...this.wanderingBullets]
	}

	display() {
		super.display()

		c.fillStyle = '#FFCB00'
		c.fillRect(this.x + this.w / 2 - 2, this.y + 4, 4, 4)
		c.fillRect(this.x + this.w / 2 - 2, this.y + 12, 4, 4)
		c.fillRect(this.x + this.w / 2 - 2, this.y + 20, 4, 4)

		this.hitPoint.display()

		this.useRingDisplay()

		this.useBlocksDisplay()

		this.useControllableBulletDisplay()
		this.piecesDisplay()

		this.useWanderingBulletsDisplay()

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
		if (GamePhases.player_2.skill_1 === 0) {
			this.skillsParams.ring.state = false
		}
		if (GamePhases.player_2.skill_1 === 1) {
			this.skillsParams.ring.state = true
			this.timeouts.ringDelay[0] = 6000
			this.skillsParams.ring.maxRadius = 30
			this.timeouts.ringActivePeriod[0] = 3000
		}
		if (GamePhases.player_2.skill_1 === 2) {
			this.skillsParams.ring.state = true
			this.timeouts.ringDelay[0] = 12000
			this.skillsParams.ring.maxRadius = 40
			this.timeouts.ringActivePeriod[0] = 6000
		}
		if (GamePhases.player_2.skill_1 === 3) {
			this.skillsParams.ring.state = true
			this.timeouts.ringDelay[0] = 20000
			this.skillsParams.ring.maxRadius = 50
			this.timeouts.ringActivePeriod[0] = 9000
		}

		if (GamePhases.player_2.skill_2 === 0) {
			this.skillsParams.wanderingBullets.state = false
		}
		if (GamePhases.player_2.skill_2 === 1) {
			this.skillsParams.wanderingBullets.state = true
			this.timeouts.wanderingBulletsDelay[0] = 7000
			this.skillsParams.wanderingBullets.quantity = 3
		}
		if (GamePhases.player_2.skill_2 === 2) {
			this.skillsParams.wanderingBullets.state = true
			this.timeouts.wanderingBulletsDelay[0] = 5000
			this.skillsParams.wanderingBullets.quantity = 5
		}
		if (GamePhases.player_2.skill_2 === 3) {
			this.skillsParams.wanderingBullets.state = true
			this.timeouts.wanderingBulletsDelay[0] = 3000
			this.skillsParams.wanderingBullets.quantity = 7
		}

		if (GamePhases.player_2.skill_3 === 0) {
			this.skillsParams.blocks.state = false
		}
		if (GamePhases.player_2.skill_3 === 1) {
			this.skillsParams.blocks.state = true
			this.timeouts.blocksDelay[0] = 10000
			this.timeouts.blocksActivePeriod[0] = 120000
			this.skillsParams.blocks.quantity = 3
			this.skillsParams.blocks.hp = 2
		}
		if (GamePhases.player_2.skill_3 === 2) {
			this.skillsParams.blocks.state = true
			this.timeouts.blocksDelay[0] = 8000
			this.timeouts.blocksActivePeriod[0] = 180000
			this.skillsParams.blocks.quantity = 5
			this.skillsParams.blocks.hp = 3
		}
		if (GamePhases.player_2.skill_3 === 3) {
			this.skillsParams.blocks.state = true
			this.timeouts.blocksDelay[0] = 6000
			this.timeouts.blocksActivePeriod[0] = 600000
			this.skillsParams.blocks.quantity = 7
			this.skillsParams.blocks.hp = 5
		}

		if (GamePhases.player_2.skill_4 === 0) {
			this.skillsParams.controllableBullet.state = false
		}
		if (GamePhases.player_2.skill_4 === 1) {
			this.skillsParams.controllableBullet.state = true
			this.timeouts.controllableBulletDelay[0] = 22000
			this.timeouts.controllableBulletActivePeriod[0] = 8000
			this.skillsParams.controllableBullet.vx = 7
			this.skillsParams.controllableBullet.vy = 5
		}
		if (GamePhases.player_2.skill_4 === 2) {
			this.skillsParams.controllableBullet.state = true
			this.timeouts.controllableBulletDelay[0] = 20000
			this.timeouts.controllableBulletActivePeriod[0] = 10000
			this.skillsParams.controllableBullet.vx = 10
			this.skillsParams.controllableBullet.vy = 7
		}
		if (GamePhases.player_2.skill_4 === 3) {
			this.skillsParams.controllableBullet.state = true
			this.timeouts.controllableBulletDelay[0] = 18000
			this.timeouts.controllableBulletActivePeriod[0] = 12000
			this.skillsParams.controllableBullet.vx = 15
			this.skillsParams.controllableBullet.vy = 10
		}

	}

	useRing(activator) {

		if (!this.active) return
		if (!this.skillsParams.ring.state) return

		if (!activator && this.ringState === 'done') {
			this.ringState = 'ready'
			return
		}

		if (activator && this.ringState === 'ready') {
			this.ring.radius = 10

			this.ringState = 'wait'

			this.runTimeout('ringActivePeriod', () => {
				this.ring.radius = 0
			})
			this.runTimeout('ringDelay', () => {
				this.ringState = 'done'
			})
		}
	}
	useRingUpdate() {
		if (this.ring.radius > 0) {
			if (this.ring.radius >= this.skillsParams.ring.maxRadius) {
				this.ring.radius = this.skillsParams.ring.maxRadius
				this.ring.x = this.x + this.w / 2
				this.ring.y = this.y + this.h / 2
			} else {
				this.ring.radius = this.ring.radius + 0.7
				this.ring.x = this.x + this.w / 2
				this.ring.y = this.y + this.h / 2
			}
		}
	}
	useRingDisplay() {
		if (this.ring.radius > 0) {
			this.ring.display()
		}
	}

	useBlocks(activator) {

		if (!this.active) return
		if (!this.skillsParams.blocks.state) return

		if (!activator && this.blocksState === 'done') {
			this.blocksState = 'ready'
			return
		}

		if (activator && this.blocksState === 'ready') {

			const quantity = this.skillsParams.blocks.quantity;

			const x = [
				this.x,
				this.x - this.w - 2,
				this.x + this.w + 2,
				this.x - this.w * 2 - 2 * 2,
				this.x + this.w * 2 + 2 * 2,
				this.x - this.w * 3 - 2 * 3,
				this.x + this.w * 3 + 2 * 3
			];
			const y = this.y - this.h / 2;

			for (let i = 0; i < quantity; i++) {
				setTimeout(() => {
					const nextBlock = new PushableRect({ x: x[i], y: y, w: this.w, h: this.h / 3, color: GamePhases.paletteBricks.background, hp: this.skillsParams.blocks.hp });
					const coincidence = this.blocks.find(block => detectCollisionRect(block, nextBlock));

					if (coincidence) {
						return
					}

					this.blocks.push(nextBlock)

					KeyMoveableRect.defBlocks = this.blocks
				}, 100 * i)
			}

			this.blocksState = 'wait'

			this.runTimeout('blocksActivePeriod', () => {
				this.blocks = []
				KeyMoveableRect.defBlocks = []
			})
			this.runTimeout('blocksDelay', () => {
				this.blocksState = 'done'
			})
		}
	}
	useBlocksUpdate(arr) {
		this.blocks.forEach(block => block.update(arr))
	}
	useBlocksDisplay() {
		this.blocks.forEach(block => {
			block.display()
			c.lineWidth = 1
			c.strokeStyle = GamePhases.paletteBricks.border
			c.strokeRect(block.x, block.y, block.w, block.h)
		})
	}

	useControllableBullet(activator) {

		if (!this.active) return
		if (!this.skillsParams.controllableBullet.state) return

		if (!activator && this.controllableBulletState === 'done') {
			this.controllableBulletState = 'ready'
			return
		}

		if (activator && this.controllableBulletState === 'ready') {

			const vx = this.skillsParams.controllableBullet.vx;
			const vy = this.skillsParams.controllableBullet.vy;

			this.controllableBullet.push(new KeyMoveableRect({
				x: this.x,
				y: this.y,
				w: this.w,
				h: this.h,
				color: 'white',
				vx: vx,
				vy: vy
			}))

			this.controllableBullet[0].role = 'controllableBullet'

			this.stoping = true

			this.runTimeout('controllableBulletActivePeriod', () => {
				this.stoping = false
				this.controllableBullet = []
			})

			this.controllableBulletState = 'wait'

			this.runTimeout('controllableBulletDelay', () => {
				this.controllableBulletState = 'done'
			})

		}


	}
	useControllableBulletUpdate(keys, activator, enemies) {
		this.controllableBullet.forEach(bullet => bullet.update(keys, activator))
		this.controllableBullet.forEach(bullet => {

			for (let i = 0; i < enemies.length; i++) {
				if (detectCollisionAny(enemies[i], bullet)) {

					enemies[i].hitPoint.startForm = enemies[i].hitPoint.startForm + ((Math.PI * 2) / GamePhases.enemiesHP[enemies[i].name]) * 3

					this.stoping = false
					this.controllableBullet = []
					this.controllableBulletAngle = 0

					for (let i = 0; i < 24; i++) {
						this.pieces.push(new Pieces({
							x: bullet.x,
							y: bullet.y,
							radius: Math.random() * 4,
							color: getRandomColor(this.piecesPalette),
							vx: (Math.random() - 0.5) * (Math.random() * 1000),
							vy: (Math.random() - 0.5) * (Math.random() * 1000)
						}))
					}

					break
				}
			}
		})

	}
	useControllableBulletDisplay() {
		this.controllableBullet.forEach(bullet => {
			const x = this.controllableBullet[0].x + this.controllableBullet[0].w / 2;
			const y = this.controllableBullet[0].y + this.controllableBullet[0].h / 2;
			const radius = this.controllableBullet[0].w / 2 + 15;

			bullet.display()
			c.save()
			c.translate(x, y)
			c.rotate(this.controllableBulletAngle)
			drawFigure({ x: 0, y: 0, radius: radius, decrease: 0.7, num: 12, color: 'white' })
			c.restore()

			this.controllableBulletAngle = this.controllableBulletAngle + 0.1
		})
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

	useWanderingBullets(activator) {

		if (!this.active) return
		if (!this.skillsParams.wanderingBullets.state) return

		if (!activator && this.wanderingBulletsState === 'done') {
			this.wanderingBulletsState = 'ready'
			return
		}

		if (activator && this.wanderingBulletsState === 'ready') {

			const quantity = this.skillsParams.wanderingBullets.quantity;

			for (let i = 0; i < quantity; i++) {
				setTimeout(() => {

					this.wanderingBullets.push(new DefaultBullet({
						x: this.x + this.w / 2,
						y: this.y,
						radius: 10,
						color: this.wanderingBulletsColor,
						vx: 0,
						vy: - 100,
						role: 'playerBullet',
						img: this.wanderingBulletsIMG
					}))
				}, 300 * i)
			}

			this.wanderingBulletsState = 'wait'

			this.runTimeout('wanderingBulletsDelay', () => {
				this.wanderingBulletsState = 'done'
			})
		}
	}
	useWanderingBulletsUpdate(correction, gameObjects) {
		this.wanderingBulletsTimer = this.wanderingBulletsTimer - 1

		if (this.wanderingBulletsTimer <= 0) {
			this.wanderingBullets.forEach(bullet => {
				bullet.vx = (Math.random() - 0.5) * 500
				bullet.vy = bullet.vy - 10
				this.wanderingBulletsTimer = 20
			})
		}

		this.wanderingBullets.forEach(bullet => bullet.update(correction))
		this.wanderingBullets.forEach((bullet, index) => {

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

				this.wanderingBullets.splice(index, 1)
			}
		})
		this.wanderingBullets.forEach((bullet, index) => {
			if (bullet.crossedBoundaries()) {
				this.wanderingBullets.splice(index, 1)
			}
		})
	}
	useWanderingBulletsDisplay() {
		this.wanderingBullets.forEach(bullet => {
			bullet.display()
		})
	}

}


