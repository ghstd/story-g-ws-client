import { canvas, c } from '../utils/canvas.js';
import Rect from './Rect.js'
import KeyMoveableRect from '../subClasses/KeyMoveableRect.js';
import detectCollisionRect from '../utils/detectCollisionRect.js';
import InteractingRect from '../elementsClasses/InteractingRect.js';
import GamePhases from './GamePhases.js';
import drawMatrix from '../utils/drawMatrix.js';

export default class Labirint {

	constructor() {

		this.scaleX = canvas.width < 1440 ? 0.7 : 1
		this.scaleY = canvas.width < 1440 ? 0.7 : 1

		this.saveX = 0
		this.saveY = 0

		this.drawMatrix = drawMatrix()

		this.color_1 = '#00633E'

		// this.shadowColor_1 = '#FFCB00'

		this.wallTop = new Rect(0, 0, 400, 10, this.color_1)
		this.wallBottom = new Rect(0, 500, 400, 10, this.color_1)
		this.wallLeft = new Rect(0, 0, 10, 500, this.color_1)
		this.wallRight = new Rect(400, 0, 10, 510, this.color_1)

		this.item = new KeyMoveableRect({
			x: 163,
			y: 465,
			w: 30,
			h: 30,
			color: '#00633E',
			vx: 4,
			vy: 4
		});

		this.labirint_1 = [
			this.wallTop,
			this.wallRight,
			this.wallBottom,
			this.wallLeft,

			new Rect(0, 100, 200, 10, this.color_1),
			new Rect(300, 200, 100, 10, this.color_1),
			new Rect(100, 300, 210, 10, this.color_1),
			new Rect(100, 400, 110, 10, this.color_1),

			new Rect(100, 200, 10, 100, this.color_1),
			new Rect(100, 400, 10, 100, this.color_1),
			new Rect(200, 100, 10, 110, this.color_1),
			new Rect(300, 100, 10, 110, this.color_1),
			new Rect(300, 300, 10, 110, this.color_1),

			new InteractingRect({ x: 10, y: 10, w: 10, h: 90, color: '#C00B00', name: 'labirint exit', hasImg: false }),
			new InteractingRect({ x: 40, y: 450, w: 30, h: 30, name: 'skill_2' }),
			new InteractingRect({ x: 340, y: 150, w: 30, h: 30, name: 'hp' }),
		]

		this.labirint_2 = [
			this.wallTop,
			this.wallRight,
			this.wallBottom,
			this.wallLeft,

			new Rect(0, 100, 350, 5, this.color_1),
			new Rect(50, 150, 50, 5, this.color_1),
			new Rect(250, 150, 50, 5, this.color_1),
			new Rect(0, 200, 50, 5, this.color_1),
			new Rect(50, 250, 50, 5, this.color_1),
			new Rect(150, 350, 200, 5, this.color_1),
			new Rect(100, 400, 55, 5, this.color_1),
			new Rect(200, 400, 100, 5, this.color_1),
			new Rect(350, 400, 50, 5, this.color_1),
			new Rect(50, 450, 50, 5, this.color_1),
			new Rect(200, 450, 50, 5, this.color_1),
			new Rect(300, 450, 50, 5, this.color_1),

			new Rect(50, 250, 5, 200, this.color_1),
			new Rect(100, 150, 5, 250, this.color_1),
			new Rect(150, 0, 5, 50, this.color_1),
			new Rect(150, 100, 5, 200, this.color_1),
			new Rect(150, 350, 5, 50, this.color_1),
			new Rect(150, 450, 5, 50, this.color_1),
			new Rect(200, 150, 5, 150, this.color_1),
			new Rect(200, 400, 5, 100, this.color_1),
			new Rect(250, 50, 5, 50, this.color_1),
			new Rect(250, 150, 5, 200, this.color_1),
			new Rect(300, 150, 5, 150, this.color_1),
			new Rect(300, 400, 5, 50, this.color_1),
			new Rect(350, 0, 5, 50, this.color_1),
			new Rect(350, 100, 5, 150, this.color_1),
			new Rect(350, 300, 5, 100, this.color_1),

			new InteractingRect({ x: 10, y: 10, w: 10, h: 90, color: '#C00B00', name: 'labirint exit', hasImg: false }),
			new InteractingRect({ x: 62, y: 270, w: 30, h: 30, name: 'skill_3' }),
			new InteractingRect({ x: 265, y: 415, w: 30, h: 30, name: 'hp' }),
			new InteractingRect({ x: 265, y: 170, w: 30, h: 30, name: 'hp' }),
		]

		this.labirint_3 = [
			this.wallTop,
			this.wallRight,
			this.wallBottom,
			this.wallLeft,

			new Rect(50, 50, 50, 5, this.color_1),
			new Rect(150, 100, 200, 5, this.color_1),
			new Rect(0, 150, 50, 5, this.color_1),
			new Rect(100, 150, 100, 5, this.color_1),
			new Rect(250, 150, 50, 5, this.color_1),
			new Rect(350, 150, 50, 5, this.color_1),
			new Rect(100, 200, 150, 5, this.color_1),
			new Rect(50, 250, 150, 5, this.color_1),
			new Rect(300, 250, 50, 5, this.color_1),
			new Rect(50, 300, 100, 5, this.color_1),
			new Rect(250, 300, 50, 5, this.color_1),
			new Rect(350, 300, 50, 5, this.color_1),
			new Rect(0, 350, 50, 5, this.color_1),
			new Rect(105, 350, 50, 5, this.color_1),
			new Rect(200, 350, 50, 5, this.color_1),
			new Rect(300, 350, 50, 5, this.color_1),
			new Rect(55, 400, 50, 5, this.color_1),
			new Rect(150, 400, 150, 5, this.color_1),
			new Rect(100, 450, 50, 5, this.color_1),
			new Rect(200, 450, 155, 5, this.color_1),


			new Rect(50, 50, 5, 50, this.color_1),
			new Rect(50, 150, 5, 100, this.color_1),
			new Rect(50, 400, 5, 50, this.color_1),
			new Rect(100, 50, 5, 150, this.color_1),
			new Rect(100, 350, 5, 50, this.color_1),
			new Rect(150, 0, 5, 100, this.color_1),
			new Rect(150, 300, 5, 50, this.color_1),
			new Rect(150, 450, 5, 50, this.color_1),
			new Rect(200, 250, 5, 100, this.color_1),
			new Rect(200, 450, 5, 50, this.color_1),
			new Rect(250, 0, 5, 50, this.color_1),
			new Rect(250, 200, 5, 100, this.color_1),
			new Rect(250, 350, 5, 50, this.color_1),
			new Rect(300, 100, 5, 150, this.color_1),
			new Rect(300, 300, 5, 50, this.color_1),
			new Rect(350, 150, 5, 50, this.color_1),
			new Rect(350, 350, 5, 100, this.color_1),


			new InteractingRect({ x: 155, y: 10, w: 95, h: 10, color: '#C00B00', name: 'labirint exit', hasImg: false }),
			new InteractingRect({ x: 115, y: 162, w: 30, h: 30, name: 'skill_2' }),
			new InteractingRect({ x: 115, y: 312, w: 30, h: 30, name: 'hp' }),
			new InteractingRect({ x: 210, y: 462, w: 30, h: 30, name: 'skill_3' }),
		]

		this.labirint_4 = [
			this.wallTop,
			this.wallRight,
			this.wallBottom,
			this.wallLeft,

			new Rect(200, 50, 50, 5, this.color_1),
			new Rect(350, 100, 50, 5, this.color_1),
			new Rect(300, 150, 50, 5, this.color_1),
			new Rect(250, 200, 50, 5, this.color_1),
			new Rect(50, 250, 100, 5, this.color_1),
			new Rect(200, 250, 150, 5, this.color_1),
			new Rect(50, 300, 350, 5, this.color_1),
			new Rect(0, 350, 150, 5, this.color_1),
			new Rect(250, 350, 100, 5, this.color_1),
			new Rect(0, 400, 50, 5, this.color_1),
			new Rect(150, 400, 100, 5, this.color_1),
			new Rect(300, 400, 100, 5, this.color_1),
			new Rect(50, 450, 200, 5, this.color_1),
			new Rect(300, 450, 50, 5, this.color_1),

			new Rect(50, 50, 5, 200, this.color_1),
			new Rect(100, 100, 5, 150, this.color_1),
			new Rect(100, 400, 5, 50, this.color_1),
			new Rect(150, 0, 5, 150, this.color_1),
			new Rect(150, 200, 5, 100, this.color_1),
			new Rect(150, 350, 5, 50, this.color_1),
			new Rect(200, 0, 5, 50, this.color_1),
			new Rect(200, 100, 5, 150, this.color_1),
			new Rect(200, 300, 5, 50, this.color_1),
			new Rect(250, 350, 5, 55, this.color_1),
			new Rect(250, 50, 5, 150, this.color_1),
			new Rect(300, 0, 5, 100, this.color_1),
			new Rect(300, 450, 5, 50, this.color_1),
			new Rect(350, 150, 5, 105, this.color_1),

			new InteractingRect({ x: 305, y: 10, w: 95, h: 10, color: '#C00B00', name: 'labirint exit', hasImg: false }),
			new InteractingRect({ x: 15, y: 362, w: 30, h: 30, name: 'skill_2' }),
			new InteractingRect({ x: 310, y: 462, w: 30, h: 30, name: 'hp' }),
			new InteractingRect({ x: 62, y: 215, w: 30, h: 30, name: 'hp' }),
			new InteractingRect({ x: 212, y: 15, w: 30, h: 30, name: 'skill_4' }),
		]

	}

	update(events) {
		this.labirintUpdate(events.arrows, 'labirint_1', 'player_1', 'player_2')
		this.labirintUpdate(events.wasd, 'labirint_2', 'player_1', 'player_2')
		this.labirintUpdate(events.arrows, 'labirint_3', 'player_2', 'player_1')
		this.labirintUpdate(events.wasd, 'labirint_4', 'player_1', 'player_2')

	}

	display() {
		this.labirintDisplay('labirint_1', canvas.width < 1440 ? canvas.width + 150 : canvas.width - 480, 90, this.scaleX, this.scaleY)
		this.labirintDisplay('labirint_2', 10, 90, this.scaleX, this.scaleY)
		this.labirintDisplay('labirint_3', canvas.width < 1440 ? canvas.width + 150 : canvas.width - 480, 90, this.scaleX, this.scaleY)
		this.labirintDisplay('labirint_4', 10, 90, this.scaleX, this.scaleY)

	}

	labirintUpdate(keys, labirintNum, targetHP, targetSkill) {
		if (GamePhases[labirintNum] === 'intro') {

			this.item.x = 163
			this.item.y = 465

			setTimeout(() => {
				GamePhases[labirintNum] = 'active'
			}, 1500)
		}

		if (GamePhases[labirintNum] !== 'active') return

		this.saveX = this.item.x
		this.saveY = this.item.y

		this.item.update(keys)

		this[labirintNum].forEach((rect, index) => {
			if (detectCollisionRect(this.item, rect)) {

				if (rect.role === 'interacting') {
					if (rect.name === 'labirint exit') {
						GamePhases[labirintNum] = 'done'
						return
					}
					if (rect.name === 'hp') {
						GamePhases.hp[targetHP] += 1

						this[labirintNum].splice(index, 1)
					} else {
						if (GamePhases[targetSkill][rect.name] === 3) {
							GamePhases.hp[targetHP] += 1
						} else {
							GamePhases[targetSkill][rect.name] += 1
						}

						this[labirintNum].splice(index, 1)
					}
				}

				this.item.x = this.saveX
				this.item.y = this.saveY
			}
		})
	}

	labirintDisplay(labirintNum, offsetX, offsetY, scaleX = 1, scaleY = 1) {
		if (GamePhases[labirintNum] === 'intro') {
			c.save()
			c.scale(scaleX, scaleY)
			c.translate(offsetX, offsetY)
			this.drawMatrix()
			c.restore()
		}

		if (GamePhases[labirintNum] !== 'active') return

		c.save()
		c.scale(scaleX, scaleY)
		c.translate(offsetX, offsetY)

		this.drawMatrix()
		this.item.display()
		this[labirintNum].forEach(rect => rect.display())

		c.fillStyle = '#FFCB00'
		c.fillRect(this.item.x + this.item.w / 2 - 2, this.item.y + 4, 4, 4)
		c.fillRect(this.item.x + this.item.w / 2 - 2, this.item.y + 12, 4, 4)
		c.fillRect(this.item.x + this.item.w / 2 - 2, this.item.y + 20, 4, 4)

		c.restore()
	}
}




