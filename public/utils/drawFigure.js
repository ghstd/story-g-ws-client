import { canvas, c } from "./canvas.js"

export default function drawFigure({ x, y, radius, decrease = 0.5, num = 6, color = 'green' }) {

	c.fillStyle = color

	c.beginPath()
	c.save()
	c.translate(x, y)
	c.moveTo(0, - radius)

	for (let i = 0; i < num; i++) {
		c.rotate(Math.PI / num)
		c.lineTo(0, -radius * decrease)
		c.rotate(Math.PI / num)
		c.lineTo(0, -radius)
	}

	c.restore()
	c.closePath()
	c.fill()
	// c.stroke()

	// c.shadowOffsetX = 0
	// c.shadowOffsetY = 0
	// c.shadowBlur = 0
}