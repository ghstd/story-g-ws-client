import { canvas, c } from '../utils/canvas.js'
import Circle from '../classes/Circle.js'
import Rect from './Rect.js'
import GamePhases from './GamePhases.js'

export default class Area {
	static loaders = {
		shootDefaultDelay: 0,
		shootRotatableDelay: 0,
		shootLightingDelay: 0,
		ringDelay: 0,
		wanderingBulletsDelay: 0,
		blocksDelay: 0,
		controllableBulletDelay: 0
	}
	constructor() {

		this.keys1 = ['MW', 'RMB', 'LMB']
		this.keys2 = ['Q', 'E', 'R', 'F']
		this.skills1 = ['skill_1', 'skill_2', 'skill_3', 'skill_4']
		this.skills2 = ['skill_3', 'skill_2', 'skill_1']

		this.shootLightingDelay = new Rect(canvas.width - 40, canvas.height - 30, 30, -30)
		this.shootRotatableDelay = new Rect(canvas.width - 80, canvas.height - 30, 30, -30)
		this.shootDefaultDelay = new Rect(canvas.width - 120, canvas.height - 30, 30, -30)

		this.ringDelay = new Rect(10, canvas.height - 30, 30, -30)
		this.wanderingBulletsDelay = new Rect(50, canvas.height - 30, 30, -30)
		this.blocksDelay = new Rect(90, canvas.height - 30, 30, -30)
		this.controllableBulletDelay = new Rect(130, canvas.height - 30, 30, -30)


		this.controls = [
			this.shootLightingDelay,
			this.shootRotatableDelay,
			this.shootDefaultDelay,
			this.ringDelay,
			this.wanderingBulletsDelay,
			this.blocksDelay,
			this.controllableBulletDelay,
		]

		this.rects = [
			new Rect(0, canvas.height - canvas.height / 3, canvas.width, 2, GamePhases.areaColors.border)
		]

		this.imgMain_tree = new Image()
		this.imgMain_tree.src = '../images/main_tree.png'
		this.imgBorder = new Image()
		this.imgBorder.src = '../images/border.png'

	}

	update() {
		Object.keys(Area.loaders).forEach(loader => {
			this[loader].h = Area.loaders[loader] === 0 ? -30 : -30 * Area.loaders[loader]
			this[loader].color = Area.loaders[loader] === 0 ? 'rgba(250,250,250,1)' : 'rgba(250,250,250,1)'
		})
	}

	display() {

		c.strokeStyle = 'white'
		// c.fillStyle = 'rgba(250,250,250,0.1)'
		c.fillStyle = GamePhases.areaColors.fon
		c.lineWidth = 1
		c.font = '24px serif'

		c.beginPath()
		c.moveTo(0, canvas.height)
		c.lineTo(0, canvas.height - 90)
		c.lineTo(300, canvas.height - 90)
		c.lineTo(350, canvas.height)
		c.lineTo(0, canvas.height)
		c.closePath()
		c.stroke()
		c.fill()

		for (let i = 0; i < 4; i++) {
			c.beginPath()
			c.moveTo(10 + i * 40, canvas.height - 30)
			c.lineTo(10 + i * 40, canvas.height - 60)
			c.lineTo(40 + i * 40, canvas.height - 60)
			c.lineTo(40 + i * 40, canvas.height - 30)
			c.closePath()
			c.stroke()

			c.fillStyle = 'rgba(250,250,250,1)'
			c.fillText(`${this.keys2[i]}`, 17 + i * 40, canvas.height - 8, 100)
			c.fillStyle = GamePhases.areaColors.fon

			c.fillStyle = 'rgba(250,250,250,1)'
			c.font = '14px serif'
			c.fillText('lvl', 10 + i * 40, canvas.height - 65, 70)
			c.fillStyle = GamePhases.areaColors.numbers
			c.font = '22px serif'
			c.fillText(`${GamePhases.player_2[this.skills1[i]]}`, 30 + i * 40, canvas.height - 65, 100)
			c.fillStyle = GamePhases.areaColors.fon
			c.font = '24px serif'
		}

		c.fillStyle = GamePhases.areaColors.hp
		c.fillText('HP:', 200, canvas.height - 8, 100)
		c.fillStyle = GamePhases.areaColors.numbers
		c.fillText(`${GamePhases.hp.player_2}`, 250, canvas.height - 8, 100)

		c.fillStyle = 'rgba(250,250,250,1)'
		c.fillRect(270, canvas.height - 25, 48, 20)
		c.fillStyle = GamePhases.areaColors.text
		c.font = '14px serif'
		c.fillText('press 1', 275, canvas.height - 11, 100)
		c.fillStyle = 'rgba(250,250,250,0.7)'
		c.font = '10px serif'
		c.fillText('use WASD or Gamepad', 190, canvas.height - 75, 100)
		c.fillStyle = GamePhases.areaColors.fon
		c.font = '24px serif'

		c.beginPath()
		c.moveTo(canvas.width, canvas.height)
		c.lineTo(canvas.width, canvas.height - 90)
		c.lineTo(canvas.width - 300, canvas.height - 90)
		c.lineTo(canvas.width - 350, canvas.height)
		c.lineTo(canvas.width, canvas.height)
		c.closePath()
		c.stroke()
		c.fill()

		for (let i = 0; i < 3; i++) {
			c.beginPath()
			c.moveTo(canvas.width - 10 - i * 40, canvas.height - 30)
			c.lineTo(canvas.width - 10 - i * 40, canvas.height - 60)
			c.lineTo(canvas.width - 40 - i * 40, canvas.height - 60)
			c.lineTo(canvas.width - 40 - i * 40, canvas.height - 30)
			c.closePath()
			c.stroke()

			c.fillStyle = 'rgba(250,250,250,1)'
			c.fillText(`${this.keys1[i]}`, canvas.width - 40 - i * 40, canvas.height - 8, 30)
			c.fillStyle = GamePhases.areaColors.fon

			c.fillStyle = 'rgba(250,250,250,1)'
			c.font = '14px serif'
			c.fillText('lvl', canvas.width - 40 - i * 40, canvas.height - 65, 70)
			c.fillStyle = GamePhases.areaColors.numbers
			c.font = '22px serif'
			c.fillText(`${GamePhases.player_1[this.skills2[i]]}`, canvas.width - 20 - i * 40, canvas.height - 65, 100)
			c.fillStyle = GamePhases.areaColors.fon
			c.font = '24px serif'
		}

		c.fillStyle = GamePhases.areaColors.numbers
		c.fillText(`${GamePhases.hp.player_1}`, canvas.width - 200, canvas.height - 8, 100)
		c.fillStyle = GamePhases.areaColors.hp
		c.fillText('HP:', canvas.width - 250, canvas.height - 8, 100)
		c.fillStyle = GamePhases.areaColors.fon

		c.fillStyle = 'rgba(250,250,250,1)'
		c.fillRect(canvas.width - 315, canvas.height - 25, 48, 20)
		c.fillStyle = GamePhases.areaColors.text
		c.font = '14px serif'
		c.fillText('press 0', canvas.width - 310, canvas.height - 11, 100)
		c.fillStyle = 'rgba(250,250,250,0.7)'
		c.font = '10px serif'
		c.fillText('MouseWheel Shift Gamepad', canvas.width - 290, canvas.height - 75, 100)
		c.fillStyle = GamePhases.areaColors.fon
		c.font = '24px serif'

		this.controls.forEach(rect => rect.display())

		this.rects.forEach(rect => rect.display())

		c.drawImage(this.imgMain_tree, 0, 0, 384, 765, canvas.width / 2 - 35, canvas.height - 130, 70, 130)

		for (let i = 0; i < canvas.width / 16; i++) {
			c.drawImage(this.imgBorder, 0, 0, 16, 16, 16 * i, canvas.height / 1.5 - 15, 16, 16)
		}

	}
}