import { canvas, c } from '../utils/canvas.js'
import Rect from '../classes/Rect.js'
import Pieces from './Pieces.js'
import GamePhases from '../classes/GamePhases.js'
import getRandomColor from '../utils/getRandomColor.js'

export default class InteractingRect extends Rect {
	static interactingItems = []
	static pieces = []
	constructor({ x, y, w = 30, h = 30, color = 'rgba(255,255,255,0)', vx = 0, vy = 0, name, hasImg = true }) {
		super(x, y, w, h, color)

		this.vx = vx
		this.vy = vy
		this.name = name
		this.hasImg = hasImg

		this.role = 'interacting'
		this.shouldRemoved = false

		this.imgItem = new Image()
		this.imgItem.src = Math.random() > 0.5 ? '../images/item1.png' : '../images/item2.png'

		this.piecesPalette = GamePhases.paletteFirework_mix

	}

	update() {

		if (this.shouldRemoved || this.y >= canvas.height) {
			const index = InteractingRect.interactingItems.findIndex(item => item === this);
			InteractingRect.interactingItems.splice(index, 1)
		}

		this.x = this.x + this.vx + (Math.random() - 0.5) * 4
		this.y = this.y + this.vy

	}

	display() {

		c.shadowOffsetX = 0
		c.shadowOffsetY = 0
		c.shadowBlur = 7
		c.shadowColor = '#FFCB00'

		super.display()

		if (this.hasImg) {
			c.drawImage(this.imgItem, 0, 0, 32, 32, this.x, this.y, this.w, this.h)
		}

		c.shadowOffsetX = 0
		c.shadowOffsetY = 0
		c.shadowBlur = 0
	}

	openEffect() {
		for (let i = 0; i < 20; i++) {

			InteractingRect.pieces.push(new Pieces({
				x: this.x + this.w / 2,
				y: this.y,
				radius: Math.random() * 3,
				color: getRandomColor(this.piecesPalette),
				vx: (Math.random() - 0.5) * (Math.random() * 400),
				vy: Math.random() * (Math.random() * 400)
			}))

		}
	}

	static piecesUpdate(correction) {
		this.pieces.forEach((piece, index) => {
			piece.update(correction)

			if (piece.alpha <= 0) {
				setTimeout(() => { this.pieces.splice(index, 1) })
			}

			piece.display()
		})
	}

}