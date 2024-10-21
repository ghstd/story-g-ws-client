import animateControls from "../animate.js"
import { canvas, c } from "../utils/canvas.js"

export default class Scenes {
	constructor() {

		this.topWall = document.querySelector('.top-wall')
		this.bottomWall = document.querySelector('.bottom-wall')
		this.skip = document.querySelector('.skip')
		this.message = document.querySelector('.message')
		this.answer = document.querySelector('.answer')

		this.dialog = [
			{
				phrase: 'Where is she?',
				answer: 'Who?'
			},
			{
				phrase: 'Don\'t joke with me!',
				answer: 'Maybe she in the wood?'
			},
			{
				phrase: 'Now I start angry, you testing my patience!',
				answer: 'But if we don\'t know!?'
			},
			{
				phrase: 'Well, then my magic deer will spell your ass!',
				answer: 'Okey, old man.'
			},
			{
				phrase: 'You two little stupid elves..',
				answer: 'We will not tell you anything, \"spells\" away with your goofy deer!'
			},
			{
				phrase: 'Oh yeah?',
				answer: 'Yeah.'
			},
			{
				phrase: 'Fuck you!',
				answer: 'Fuck you!'
			}
		]

		this.answer.onclick = this.printDialog.bind(this)
		this.skip.onclick = this.skipDialog.bind(this)

		this.stage = -1
	}

	printDialog() {

		if (animateControls.clientIndex === 1 && animateControls.channel) animateControls.channel.send(JSON.stringify({ name: 'printDialog' }))

		this.answer.disabled = true
		this.stage++

		if (this.stage >= this.dialog.length) {
			setTimeout(() => {
				this.topWall.classList.add('light')
				this.bottomWall.classList.add('light')
			}, 1000)
			setTimeout(() => {
				this.topWall.classList.add('active')
				this.bottomWall.classList.add('active')
			}, 4000)
			setTimeout(() => {
				this.topWall.classList.remove('light')
				this.bottomWall.classList.remove('light')
				this.skip.classList.add('hidden')
				this.answer.disabled = true

				animateControls.animate()

			}, 8000);
			return
		}

		const text = this.dialog[this.stage];

		this.message.textContent = ''
		const arrOfPromises = [];
		for (let i = 0; i < text.phrase.length; i++) {
			arrOfPromises.push(new Promise(resolve => {
				setTimeout(() => {
					this.message.textContent += text.phrase[i]
					resolve()
				}, 90 * i);
			}))
		}

		Promise.all(arrOfPromises)
			.then(() => new Promise(resolve => setTimeout(() => { resolve() }, 2000)))
			.then(() => {
				this.answer.textContent = ''
				const arrOfPromises = [];
				for (let i = 0; i < text.answer.length; i++) {
					arrOfPromises.push(new Promise(resolve => {
						setTimeout(() => {
							this.answer.textContent += text.answer[i]
							resolve()
						}, 70 * i);
					}))
				}
				return Promise.all(arrOfPromises)
			})
			.then(() => {
				this.answer.disabled = false
			})
	}

	skipDialog() {

		if (animateControls.clientIndex === 1 && animateControls.channel) animateControls.channel.send(JSON.stringify({ name: 'skipDialog' }))

		this.stage = this.dialog.length
		this.answer.click()
	}

	closeScene() {
		this.topWall.classList.remove('active')
		this.bottomWall.classList.remove('active')

		this.message.textContent = 'Fucking elves..'
		this.answer.textContent = 'Wingardium leviosa!'

		setTimeout(() => {
			c.fillStyle = 'rgba(22, 22, 22, 1)'
			c.fillRect(0, 0, canvas.width, canvas.height)

			this.topWall.classList.add('hidden')
			this.bottomWall.classList.add('hidden')
		}, 10000);
	}

}


