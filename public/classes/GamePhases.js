import animateControls from "../animate.js"
import DefaultEnemy from "../elementsClasses/DefaultEnemy.js"
import SubEnemy_1 from "../elementsClasses/SubEnemy_1.js"
import SubEnemy_2 from "../elementsClasses/SubEnemy_2.js"
import SubEnemy_3 from "../elementsClasses/SubEnemy_3.js"
import SubEnemy_4 from "../elementsClasses/SubEnemy_4.js"
import { canvas, c } from "../utils/canvas.js"
import FinalScreen from "./FinalScreen.js"
import Scenes from "./Scenes.js"

export default class GamePhases {

	// palettes

	static backgroundColor = 'rgba(22, 22, 22, 0.3)'

	static paletteBricks = {
		color: '#257D5D',
		background: '#F2F2F2',
		border: '#0C172F'
	}

	static areaColors = {
		text: '#C00B00',
		hp: 'rgba(250, 250, 250, 1)',
		numbers: '#FFCB00',
		border: '#FFCB00',
		fon: '#00633E'
	}

	// main
	static paletteMain = ['#00633E', 'rgba( 250, 250, 250, 1)', '#C00B00', 'rgba( 22, 22, 22,1)', '#FFCB00']
	// mix
	static paletteFirework_mix = ['#1BCFAE', '#7F44CF', '#30CEB1', '#CF4C1B', '#CFCA25']
	// brown
	static paletteFirework_brown = ['#A66F7E', '#F2F2F2', '#F29B30', '#F26A1B', '#8C5042']
	// red
	static paletteFirework_red = ['#CC4C0A', '#D6330B', '#C00B00', '#D60B4E', '#CC0AAB']
	// violet
	static paletteFirework_violet = ['#FA5B98', '#CE61E0', '#9959F5', '#4E5AE0', '#6FC8FF']
	// blue
	static paletteFirework_blue = ['#279BDB', '#29D4E6', '#30CEB1', '#29E68E', '#27DB55']
	// pink
	static paletteFirework_pink = ['#FE8B66', '#E6695C', '#FC728A', '#E65CB8', '#F066FE']
	// green
	static paletteFirework_green = ['#00B06F', '#257D5D', '#00633E', '#35B083', '#00FCA0']
	// yellow
	static paletteFirework_yellow = ['#FEFF0D', '#E8D20C', '#FFCB00', '#E8A60C', '#FF9E0D']


	// objects

	static scenes = new Scenes()
	static finalScreen = null

	static mainEnem = null
	static iPlayer_1 = null
	static iPlayer_2 = null


	// labirints

	static labirint_1 = 'ready'
	static labirint_2 = 'ready'
	static labirint_3 = 'ready'
	static labirint_4 = 'ready'


	// enemies

	static enemiesHP = {
		mainEnemy: 250,
		SubEnemy_1: 10,
		SubEnemy_2: 15,
		SubEnemy_3: 20,
		SubEnemy_4: 25
	}

	static baseHP = {
		base: 2000
	}

	// skills

	static player_1 = {
		skill_1: 1,
		skill_2: 0,
		skill_3: 0,
		skill_4: 3  // fixed to hp
	}
	static player_2 = {
		skill_1: 1,
		skill_2: 0,
		skill_3: 0,
		skill_4: 0
	}

	// hp

	static hp = {
		player_1: 1,
		player_2: 1
	}

	static applyHPState = 'ready'

	// positions

	static positions = [
		{
			x: canvas.width / 2 + 150,
			y: 50
		},
		{
			x: canvas.width / 2 - 150,
			y: 50
		},
		{
			x: canvas.width / 2 + 300,
			y: 50
		},
		{
			x: canvas.width / 2 - 300,
			y: 50
		},
		{
			x: canvas.width / 2 + 450,
			y: 50
		},
		{
			x: canvas.width / 2 - 450,
			y: 50
		},
		{
			x: canvas.width / 2 + 600,
			y: 50
		},
		{
			x: canvas.width / 2 - 600,
			y: 50
		},
	]

	// =====================================================

	static update(events) {
		this.checkEndOfGame()
		this.applyHP(events.num.digit0, events.num.digit1)
		this.checkProgress()
	}

	// progress

	static canAddingNewEnemy = true

	static checkProgress() {
		const currentProgress = (this.mainEnem.hitPoint.startForm + Math.PI / 2) / (Math.PI * 2) * 100;

		// labirints lvls

		// stage 1
		if (currentProgress >= 4 && currentProgress < 8) {
			if (this.labirint_1 === 'ready') {
				this.labirint_1 = 'intro'
			}
		}
		// stage 2
		if (currentProgress >= 8 && currentProgress < 12) {
			if (this.labirint_2 === 'ready') {
				if (this.labirint_1 === 'active' || this.labirint_1 === 'intro') {
					setTimeout(() => { this.labirint_1 = 'done' }, 1500)
				}
				this.labirint_2 = 'intro'
			}
		}
		// stage 3
		if (currentProgress >= 14 && currentProgress < 20) {
			if (this.labirint_3 === 'ready') {
				if (this.labirint_2 === 'active' || this.labirint_2 === 'intro') {
					setTimeout(() => { this.labirint_2 = 'done' }, 1500)
				}
				this.labirint_3 = 'intro'
			}
		}
		// stage 4
		if (currentProgress >= 22 && currentProgress < 30) {
			if (this.labirint_4 === 'ready') {
				if (this.labirint_3 === 'active' || this.labirint_3 === 'intro') {
					setTimeout(() => { this.labirint_3 = 'done' }, 1500)
				}
				this.labirint_4 = 'intro'
			}
		}

		// hard lvls

		// 1
		if (currentProgress >= 0 && currentProgress < 4) {

			if (DefaultEnemy.allEnemies.length < 1 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_2, SubEnemy_3, SubEnemy_4], 1, 10000)
			}
		}
		// 2
		if (currentProgress >= 4 && currentProgress < 8) {

			if (DefaultEnemy.allEnemies.length < 2 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1], 1, 10000)
			}
		}
		// 3
		if (currentProgress >= 8 && currentProgress < 12) {

			if (DefaultEnemy.allEnemies.length < 3 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_3], 1, 15000)
			}
		}
		// 4
		if (currentProgress >= 12 && currentProgress < 16) {

			if (DefaultEnemy.allEnemies.length < 3 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_2], 1, 15000)
			}
		}
		// 5
		if (currentProgress >= 16 && currentProgress < 20) {

			if (DefaultEnemy.allEnemies.length < 3 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_2, SubEnemy_3], 1, 15000)
			}
		}
		// 6
		if (currentProgress >= 20 && currentProgress < 30) {
			if (DefaultEnemy.allEnemies.length < 4 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_2, SubEnemy_3], 1, 20000)
			}
		}
		// 7
		if (currentProgress >= 30 && currentProgress < 40) {
			if (DefaultEnemy.allEnemies.length < 5 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_2, SubEnemy_3, SubEnemy_4], 2, 20000)
			}
		}
		// 8
		if (currentProgress >= 40 && currentProgress < 50) {
			if (DefaultEnemy.allEnemies.length < 5 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_2, SubEnemy_3, SubEnemy_4], 2, 20000)
			}
		}
		// 9
		if (currentProgress >= 50 && currentProgress < 60) {
			if (DefaultEnemy.allEnemies.length < 6 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_2, SubEnemy_3, SubEnemy_4], 3, 25000)
			}
		}
		// 10
		if (currentProgress >= 60 && currentProgress < 70) {
			if (DefaultEnemy.allEnemies.length < 7 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_2, SubEnemy_3, SubEnemy_4], 3, 25000)
			}
		}
		// 11
		if (currentProgress >= 70 && currentProgress < 80) {
			if (DefaultEnemy.allEnemies.length < 8 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_2, SubEnemy_3, SubEnemy_4], 3, 25000)
			}
		}
		// 12
		if (currentProgress >= 80 && currentProgress < 90) {
			if (DefaultEnemy.allEnemies.length < 9 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_2, SubEnemy_3, SubEnemy_4], 4, 30000)
			}
		}
		// final
		if (currentProgress >= 90 && currentProgress < 100) {
			if (DefaultEnemy.allEnemies.length < 9 && this.canAddingNewEnemy) {
				this.addNewEnemy([SubEnemy_1, SubEnemy_2, SubEnemy_3, SubEnemy_4], 4, 30000)
			}
		}

	}

	static addNewEnemy(enemyClasses, quantity, delay) {
		for (let i = 0; i < this.positions.length; i++) {

			const positionClosed = DefaultEnemy.allEnemies.find(enemy => enemy.x === this.positions[i].x);

			if (!positionClosed) {
				const randomIndex = Math.floor(Math.random() * enemyClasses.length);
				const randomClass = enemyClasses[randomIndex];

				setTimeout(() => {
					DefaultEnemy.allEnemies.push(new randomClass({
						x: this.positions[i].x,
						y: this.positions[i].y,
						radius: 30,
						color: 'white',
						name: randomClass.name
					}))
					this.canAddingNewEnemy = true
				}, delay);

				quantity -= 1
				if (quantity === 0) {
					this.canAddingNewEnemy = false
					break
				}
			}
		}
		this.canAddingNewEnemy = false
	}

	// healing

	static applyHP(activator_1, activator_2) {
		if (activator_1 && this.applyHPState === 'ready') {

			if (this.hp.player_1 <= 0) return

			this.hp.player_1 -= 1

			this.iPlayer_1.hitPoint.w = this.iPlayer_1.w
			if (this.iPlayer_2.hitPoint.w < this.iPlayer_2.w / 2) {
				this.iPlayer_2.hitPoint.w += this.iPlayer_2.w / 2
			}

			this.applyHPState = 'wait'
			setTimeout(() => { this.applyHPState = 'ready' }, 1500)

			return
		}

		if (activator_2 && this.applyHPState === 'ready') {

			if (this.hp.player_2 <= 0) return

			this.hp.player_2 -= 1

			this.iPlayer_2.hitPoint.w = this.iPlayer_2.w
			if (this.iPlayer_1.hitPoint.w < this.iPlayer_1.w / 2) {
				this.iPlayer_1.hitPoint.w += this.iPlayer_1.w / 2
			}

			this.applyHPState = 'wait'
			setTimeout(() => { this.applyHPState = 'ready' }, 1500)

			return
		}
	}

	static checkEndOfGame() {
		if (this.mainEnem.hitPoint.startForm >= this.mainEnem.hitPoint.form) {
			cancelAnimationFrame(animateControls.stopID)
			this.scenes.closeScene()

			if (animateControls.clientIndex === 1) animateControls.channel.send(JSON.stringify({ name: 'closeScene' }))

			setTimeout(() => {
				this.finalScreen = new FinalScreen()
				this.finalScreen.animate()
			}, 12000);
		}
	}

}






















