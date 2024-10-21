import DefaultEnemy from "./DefaultEnemy.js";
import DefaultBullet from "./DefaultBullet.js"
import Pieces from "./Pieces.js";
import InteractingRect from "./InteractingRect.js";
import GamePhases from "../classes/GamePhases.js";
import getRandomColor from "../utils/getRandomColor.js";
import { canvas, c } from "../utils/canvas.js";

export default class SubEnemy_3 extends DefaultEnemy {
	constructor(options) {
		super(options)

		this.shootingState = 'done'

		this.piecesPalette = GamePhases.paletteFirework_violet

		this.shootColor = '#9959F5'
		this.shootIMG = '../images/balls/14.png'

		this.avatar.src = '../images/avatars/snowman_3.png'
		this.avatarWidth = 300
		this.avatarHeight = 300

	}

	update({ correction, collisionObjects }) {
		this.gameStateUpdate('skill_3')
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

			const vx = (Math.random() - 0.5) * 800;
			const vy = 50;

			for (let i = 0; i < 3; i++) {
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
				}, 100 * i);
			}

			setTimeout(() => {
				const vx = (Math.random() - 0.5) * 500;
				const vy = 200;

				for (let i = 0; i < 3; i++) {
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
					}, 100 * i);
				}
			}, 1000);

			this.shootingState = 'wait'
			setTimeout(() => { this.shootingState = 'done' }, Math.random() * 2000 + 5000)
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