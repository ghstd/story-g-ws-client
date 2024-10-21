import DefaultEnemy from "./DefaultEnemy.js";
import DefaultBullet from "./DefaultBullet.js"
import Pieces from "./Pieces.js";
import InteractingRect from "./InteractingRect.js";
import GamePhases from "../classes/GamePhases.js";
import getRandomColor from "../utils/getRandomColor.js";
import { canvas, c } from "../utils/canvas.js";

export default class SubEnemy_1 extends DefaultEnemy {
	constructor(options) {
		super(options)

		this.shootingState = 'done'

		this.piecesPalette = GamePhases.paletteFirework_pink

		this.shootColor = '#E65CB8'
		this.shootIMG = '../images/balls/12.png'

		this.avatar.src = '../images/avatars/snowman_1.png'
		this.avatarWidth = 325
		this.avatarHeight = 325

	}

	update({ correction, collisionObjects }) {
		this.gameStateUpdate('skill_1')
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

			for (let i = 0; i < 3; i++) {
				const vx = (Math.random() - 0.5) * 1000;
				const vy = 200;

				this.bullets.push(new DefaultBullet({
					x: this.x,
					y: this.y,
					radius: 10,
					color: this.shootColor,
					vx: vx + Math.random() * 50,
					vy: vy,
					img: this.shootIMG
				}))
			}

			this.shootingState = 'wait'
			setTimeout(() => { this.shootingState = 'done' }, Math.random() * 2000 + 3000)
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

}