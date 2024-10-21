import DefaultEnemy from "./DefaultEnemy.js";
import DefaultBullet from "./DefaultBullet.js"
import Pieces from "./Pieces.js";
import GamePhases from "../classes/GamePhases.js";
import getRandomColor from "../utils/getRandomColor.js";
import { canvas, c } from "../utils/canvas.js";

export default class SubEnemy_2 extends DefaultEnemy {
	constructor(options) {
		super(options)

		this.shootingState = 'done'
		this.bulletsTimer = 10

		this.piecesPalette = GamePhases.paletteFirework_red

		this.shootColor = '#D6330B'
		this.shootIMG = '../images/balls/01.png'

		this.avatar.src = '../images/avatars/snowman_2.png'
		this.avatarWidth = 550
		this.avatarHeight = 550

	}

	update({ correction, collisionObjects }) {
		this.gameStateUpdate('skill_2')
		if (this.gameState === 'outGame') return

		this.shoot()
		this.shootUpdate(correction, collisionObjects)

		this.piecesUpdate(correction)
	}

	display() {
		if (this.gameState === 'outGame') return

		super.display()

	}


	shoot() {

		if (this.shootingState === 'done') {

			for (let i = 0; i < 6; i++) {
				const vx = (Math.random() - 0.5) * 100;
				const vy = 20;

				setTimeout(() => {
					this.bullets.push(new DefaultBullet({
						x: this.x,
						y: this.y + this.radius,
						radius: 10,
						color: this.shootColor,
						vx: vx,
						vy: vy,
						img: this.shootIMG
					}))
				}, 300 * i)
			}

			this.shootingState = 'wait'
			setTimeout(() => { this.shootingState = 'done' }, Math.random() * 2000 + 5000)
		}
	}
	shootUpdate(correction, gameObjects) {
		this.bulletsTimer = this.bulletsTimer - 1

		if (this.bulletsTimer <= 0) {
			this.bullets.forEach(bullet => {
				bullet.vx = (Math.random() - 0.5) * 400
				bullet.vy = bullet.vy + 5
				this.bulletsTimer = 40
			})
		}

		this.bullets.forEach(bullet => bullet.update(correction))
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

}