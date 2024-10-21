import { canvas, c } from "./canvas.js";

export default function drawLightning(source, target, middleOffset = 10, color = 'yellow') {
	function getDistance(a, b) {
		return Math.hypot(a.x - b.x, a.y - b.y)
	}

	const distance = getDistance(source, target);
	const stepsCount = distance / 2;

	let startX = source.x;
	let startY = source.y;

	c.lineWidth = 2.5
	c.strokeStyle = color

	c.beginPath()
	c.moveTo(source.x, source.y)

	for (let i = stepsCount; i > 1; i--) {
		const pathLength = getDistance(source, { x: startX, y: startY });
		const offset = Math.sin(pathLength / distance * Math.PI) * middleOffset;

		startX = startX + (target.x - startX) / i + Math.random() * offset * 2 - offset
		startY = startY + (target.y - startY) / i + Math.random() * offset * 2 - offset
		c.lineTo(startX, startY)
	}

	c.stroke()
}