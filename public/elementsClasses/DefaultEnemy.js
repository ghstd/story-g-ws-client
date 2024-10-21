import Circle from "../classes/Circle.js"
import GamePhases from "../classes/GamePhases.js"
import { canvas, c } from "../utils/canvas.js"
import getRandomColor from "../utils/getRandomColor.js"
import DefaultBullet from "./DefaultBullet.js"
import InteractingRect from "./InteractingRect.js"
import Pieces from "./Pieces.js"

export default class DefaultEnemy extends Circle {
	static allEnemies = []
	static bullets = []
	constructor(options) {
		super(options)

		this.name = options.name || ''
		this.role = 'enemy'
		this.gameState = 'inGame'

		this.shootingState = 'done'
		this.bullets = []
		DefaultEnemy.bullets.push(this.bullets)
		this.pieces = []

		this.hitPoint = new Circle({
			x: this.x,
			y: this.y,
			radius: this.radius,
			color: '#C00B00',
			type: 'stroke',
			form: Math.PI + Math.PI / 2,
			startForm: -Math.PI / 2
		})

		this.skillParams = {
			shoot: {
				delay: 6000,
				quantity: 1
			}
		}

		this.avatar = new Image()
		this.avatar.src = '../images/avatars/santa_1.png'
		this.avatarWidth = 628
		this.avatarHeight = 628

		this.piecesPalette = GamePhases.paletteFirework_blue

		this.shootColor = '#279BDB'
		this.shootIMG = '../images/balls/17.png'

	}

	update({ correction, collisionObjects }) {

		this.shoot()
		this.shootUpdate(correction, collisionObjects)

		this.skillUpdate()

		this.piecesUpdate(correction)
	}

	display() {
		super.display()

		c.drawImage(this.avatar, 0, 0, this.avatarWidth, this.avatarHeight,
			this.x - this.radius - 1,
			this.y - this.radius - 1,
			this.radius * 2 + 2,
			this.radius * 2 + 2)

		this.hitPoint.display()

		this.shootDisplay()

		this.piecesDisplay()
	}

	gameStateUpdate(name) {
		if (this.hitPoint.startForm >= this.hitPoint.form && this.gameState === 'inGame') {
			this.gameState = 'outGame'

			const index = DefaultEnemy.allEnemies.findIndex(item => item === this);
			DefaultEnemy.allEnemies.splice(index, 1)

			if (name) {
				InteractingRect.interactingItems.push(new InteractingRect({
					x: this.x,
					y: this.y,
					vx: 0,
					vy: 1.5,
					name: name
				}))
			}
		}
	}

	skillUpdate() {
		const commonPlayersLvl = [...Object.values(GamePhases.player_1), ...Object.values(GamePhases.player_2)].reduce((a, b) => a + b);

		if (commonPlayersLvl >= 21) {
			this.skillParams.shoot.delay = 3000
			this.skillParams.shoot.quantity = 4
		}
		if (commonPlayersLvl >= 14) {
			this.skillParams.shoot.delay = 4000
			this.skillParams.shoot.quantity = 3
		}
		if (commonPlayersLvl >= 7) {
			this.skillParams.shoot.delay = 5000
			this.skillParams.shoot.quantity = 2
		}
	}


	shoot() {

		if (this.shootingState === 'done') {

			const delay = this.skillParams.shoot.delay;
			const quantity = this.skillParams.shoot.quantity;

			for (let i = 0; i < quantity; i++) {

				const vx = (Math.random() - 0.5) * 1000;
				const vy = 300;

				setTimeout(() => {

					this.bullets.push(new DefaultBullet({
						x: this.x,
						y: this.y,
						radius: 10,
						color: this.shootColor,
						vx: vx,
						vy: vy,
						img: this.shootIMG
					}))
				}, 200 * i);
			}

			this.shootingState = 'wait'
			setTimeout(() => { this.shootingState = 'done' }, delay)
		}
	}
	shootUpdate(correction, gameObjects) {
		this.bullets.forEach(bullet => bullet.update(correction))
		this.bullets.forEach((bullet, index) => {

			const target = bullet.detectCollision(gameObjects);

			if (target === 'base' ||
				target === 'player' ||
				target === 'playerBullet' ||
				target === 'pushable' ||
				target === 'controllableBullet' ||
				target === 'playerShield' ||
				bullet.shouldRemoved) {

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
		this.bullets.forEach(bullet => bullet.display())
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
}