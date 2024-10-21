import { canvas, c } from "./canvas.js"

export default function drawGamepadCursor(events, animateControls) {
	if (!events.rightGamepad) return

	c.beginPath()
	c.strokeStyle = '#FFCB00'
	c.lineWidth = 10
	c.moveTo(animateControls.player1.x + (animateControls.player1.w / 2), animateControls.player1.y)
	c.lineTo(events.mouse.x, events.mouse.y)
	c.stroke()

	c.beginPath()
	c.fillStyle = '#9633FF'
	c.arc(events.mouse.x, events.mouse.y, 4, 0, Math.PI * 2)
	c.fill()
}

























