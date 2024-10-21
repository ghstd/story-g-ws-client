import { canvas, c } from "../utils/canvas.js"
import clearCanvas from "../utils/clearCanvas.js"
import drawFigure from "../utils/drawFigure.js"

export default class FinalScreen {
	constructor() {

		this.deltaTimestamp = 0
		this.lastTimestamp = 0
		this.MAX_DELTA_TIME = 40

		this.endTimer = false
		this.angle = 0
		this.snowTimer = true
		this.snowItems = []

		this.scaleX = canvas.width < 1440 ? 0.5 : 0.7
		this.scaleY = canvas.width < 1440 ? 0.5 : 0.7

		this.coords = [
			[0, 0, 0, 200, '#D6330B'],
			[0, 100, 100, 100, '#F2F2F2'],
			[100, 0, 100, 200, '#D6330B'],

			[150, 0, 150, 200, '#D6330B'],
			[150, 0, 250, 0, '#F2F2F2'],
			[150, 100, 200, 100, '#F2F2F2'],
			[150, 200, 250, 200, '#F2F2F2'],

			[300, 0, 300, 200, '#D6330B'],
			[300, 0, 400, 0, '#F2F2F2'],
			[400, 0, 400, 100, '#F2F2F2'],
			[400, 100, 300, 100, '#F2F2F2'],

			[450, 0, 450, 200, '#D6330B'],
			[450, 0, 550, 0, '#F2F2F2'],
			[550, 0, 550, 100, '#F2F2F2'],
			[550, 100, 450, 100, '#F2F2F2'],

			[600, 0, 650, 100, '#D6330B'],
			[700, 0, 650, 100, '#D6330B'],
			[650, 100, 650, 200, '#D6330B'],


			[850, 0, 850, 200, '#D6330B'],
			[850, 0, 950, 200, '#D6330B'],
			[950, 200, 950, 0, '#D6330B'],

			[1000, 0, 1000, 200, '#D6330B'],
			[1000, 0, 1100, 0, '#F2F2F2'],
			[1000, 100, 1050, 100, '#F2F2F2'],
			[1000, 200, 1100, 200, '#F2F2F2'],

			[1150, 0, 1200, 200, '#D6330B'],
			[1200, 200, 1250, 100, '#D6330B'],
			[1250, 100, 1300, 200, '#D6330B'],
			[1300, 200, 1350, 0, '#D6330B'],


			[1500, 0, 1550, 100, '#D6330B'],
			[1600, 0, 1550, 100, '#D6330B'],
			[1550, 100, 1550, 200, '#F2F2F2'],

			[1650, 0, 1650, 200, '#D6330B'],
			[1650, 0, 1750, 0, '#F2F2F2'],
			[1650, 100, 1700, 100, '#F2F2F2'],
			[1650, 200, 1750, 200, '#F2F2F2'],

			[1800, 200, 1850, 0, '#D6330B'],
			[1850, 0, 1900, 200, '#D6330B'],
			[1820, 120, 1880, 120, '#F2F2F2'],

			[1950, 0, 1950, 200, '#D6330B'],
			[1950, 0, 2050, 0, '#F2F2F2'],
			[2050, 0, 2050, 100, '#F2F2F2'],
			[2050, 100, 1950, 100, '#F2F2F2'],
			[1995, 102, 2050, 200, '#D6330B'],


			[2200, 0, 2210, 150, '#D6330B'],
			[2210, 150, 2220, 0, '#D6330B'],
			[2200, 0, 2220, 0, '#D6330B'],
			[2210, 180, 2210, 200, '#D6330B'],

			[2250, 0, 2260, 150, '#F2F2F2'],
			[2260, 150, 2270, 0, '#F2F2F2'],
			[2250, 0, 2270, 0, '#F2F2F2'],
			[2260, 180, 2260, 200, '#F2F2F2'],

			[2300, 0, 2310, 150, '#D6330B'],
			[2310, 150, 2320, 0, '#D6330B'],
			[2300, 0, 2320, 0, '#D6330B'],
			[2310, 180, 2310, 200, '#D6330B'],


			[450, 300, 450, 500, '#D6330B'],
			[450, 300, 550, 300, '#F2F2F2'],
			[450, 500, 550, 500, '#D6330B'],
			[550, 500, 550, 450, '#D6330B'],
			[500, 450, 550, 450, '#D6330B'],

			[600, 300, 600, 500, '#D6330B'],
			[600, 500, 700, 300, '#F2F2F2'],
			[700, 300, 700, 500, '#D6330B'],

			[750, 300, 800, 400, '#D6330B'],
			[800, 400, 850, 300, '#D6330B'],
			[800, 400, 800, 500, '#D6330B'],

			[900, 300, 1000, 300, '#D6330B'],
			[900, 300, 900, 400, '#D6330B'],
			[900, 400, 1000, 400, '#D6330B'],
			[1000, 400, 1000, 500, '#D6330B'],
			[1000, 500, 900, 500, '#F2F2F2'],


			[1500, 300, 1510, 450, '#D6330B'],
			[1510, 450, 1520, 300, '#D6330B'],
			[1500, 300, 1520, 300, '#D6330B'],
			[1510, 480, 1510, 500, '#D6330B'],

			[1550, 300, 1560, 450, '#F2F2F2'],
			[1560, 450, 1570, 300, '#F2F2F2'],
			[1550, 300, 1570, 300, '#F2F2F2'],
			[1560, 480, 1560, 500, '#F2F2F2'],

			[1600, 300, 1610, 450, '#D6330B'],
			[1610, 450, 1620, 300, '#D6330B'],
			[1600, 300, 1620, 300, '#D6330B'],
			[1610, 480, 1610, 500, '#D6330B'],
		]

		this.treeImg = new Image()
		this.treeImg.src = '../images/main_tree.png'

		this.item1Img = new Image()
		this.item1Img.src = '../images/item1.png'

		this.item2Img = new Image()
		this.item2Img.src = '../images/item2.png'

		this.deerImg = new Image()
		this.deerImg.src = '../images/avatars/deer_2.png'

		this.audio = new Audio('../audio/final-sound.mp3')

		// ===============================

		c.fillStyle = 'rgba(22, 22, 22, 1)'
		c.fillRect(0, 0, canvas.width, canvas.height)

		this.coords.forEach((coord, index) => {
			setTimeout(() => {
				c.save()
				c.scale(this.scaleX, this.scaleY)
				c.translate(150, 200)
				c.strokeStyle = coord[4]
				c.beginPath()
				c.moveTo(coord[0], coord[1])
				c.lineTo(coord[2], coord[3])
				c.stroke()
				c.restore()
			}, 100 * index);
		})

		setTimeout(() => {
			c.save()
			c.scale(this.scaleX, this.scaleY)
			c.translate(150, 200)
			c.fillStyle = '#FFCB00'
			c.shadowColor = '#FFCB00'
			c.shadowBlur = 100
			c.fillRect(1243, 370, 15, 130)
			c.fill()
			c.shadowBlur = 0
			c.beginPath()
			c.strokeStyle = '#00FFE1'
			c.arc(1175, 775, 175, 0, Math.PI * 2)
			c.stroke()
			c.drawImage(this.treeImg, 0, 0, 384, 765, 1200, 300, 100, 210)
			c.drawImage(this.item1Img, 0, 0, 32, 32, 1140, 465, 50, 50)
			c.drawImage(this.item2Img, 0, 0, 32, 32, 1320, 460, 50, 50)
			c.drawImage(this.deerImg, 0, 0, 600, 600, 1000, 600, 350, 350)
			c.restore()
		}, 9000);

		setTimeout(() => { this.endTimer = true }, 12000)

	}

	update() {
		this.angle += 0.1
	}

	display() {

		if (this.endTimer) {

			this.audio.play()

			c.shadowBlur = 0
			c.fillStyle = 'rgba(22, 22, 22, 0.3)'
			c.fillRect(0, 0, canvas.width, canvas.height)

			this.makeSnow()
			this.snowItems.forEach(item => item.display())

			c.lineWidth = 3

			c.save()
			c.scale(this.scaleX, this.scaleY)
			c.translate(150, 200)
			this.coords.forEach(coord => {
				c.strokeStyle = coord[4]
				c.beginPath()
				c.moveTo(coord[0], coord[1])
				c.lineTo(coord[2], coord[3])
				c.stroke()
			})
			c.fillStyle = '#FFCB00'
			c.shadowColor = '#FFCB00'
			c.shadowBlur = Math.random() * 100 + 50
			c.fillRect(1243, 370, 15, 130)
			c.fill()
			c.shadowBlur = 0
			c.beginPath()
			c.strokeStyle = '#00FFE1'
			c.arc(1175, 775, 175, 0, Math.PI * 2)
			c.stroke()
			c.drawImage(this.treeImg, 0, 0, 384, 765, 1200, 300, 100, 210)
			c.drawImage(this.item1Img, 0, 0, 32, 32, 1140, 465, 50, 50)
			c.drawImage(this.item2Img, 0, 0, 32, 32, 1320, 460, 50, 50)
			c.drawImage(this.deerImg, 0, 0, 600, 600, 1000, 600, 350, 350)
			c.restore()

			c.save()
			c.scale(this.scaleX, this.scaleY)
			c.translate(200, 250)
			c.rotate(this.angle)
			drawFigure({
				x: 0,
				y: 0,
				radius: 30,
				decrease: 0.5,
				num: 12,
				color: '#FEFF0D'
			})
			c.restore()

			c.save()
			c.scale(this.scaleX, this.scaleY)
			c.translate(1900, 500)
			c.rotate(this.angle)
			drawFigure({
				x: 0,
				y: 0,
				radius: 50,
				decrease: 0.5,
				num: 12,
				color: '#FF19EE'
			})
			c.restore()

			c.save()
			c.scale(this.scaleX, this.scaleY)
			c.translate(1600, 900)
			c.rotate(this.angle)
			drawFigure({
				x: 20,
				y: 20,
				radius: 35,
				decrease: 0.5,
				num: 12,
				color: '#00FCA0'
			})
			c.restore()

		}
	}

	animate(currentTimestamp = 0) {
		requestAnimationFrame(this.animate.bind(this))

		this.deltaTimestamp = currentTimestamp - this.lastTimestamp
		this.lastTimestamp = currentTimestamp

		if (this.deltaTimestamp < this.MAX_DELTA_TIME) {
			this.update(this.deltaTimestamp / 1000)
			this.display()
		}

	}

	makeSnow() {
		if (this.snowTimer) {
			this.snowTimer = false

			this.snowItems.push({
				parentArr: this.snowItems,
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 2,
				vy: 0.5,
				display() {
					c.strokeStyle = '#F2F2F2'
					c.lineWidth = 1
					c.beginPath()
					c.save()
					c.translate(this.x, this.y)
					c.moveTo(0, 0)
					for (let i = 0; i < 3 * 2; i++) {
						c.lineTo(0, -5)
						c.rotate(Math.PI / 3)
						c.moveTo(0, 0)
					}
					c.restore()
					c.stroke()

					this.x += this.vx
					this.y += this.vy

					if (this.y > canvas.height) {
						const index = this.parentArr.findIndex(item => item === this);
						this.parentArr.splice(index, 1)
					}
				}
			})

			setTimeout(() => {
				this.snowTimer = true
			}, 300);
		}
	}

}