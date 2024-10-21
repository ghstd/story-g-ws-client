import { canvas, c } from "./canvas.js"

export default function drawMatrix(x = 0, y = 0, width = 400, height = 500, size = 15) {
	const characters = '0123456789ヌフムユケセテネヘメレコソト0123456789ホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const items = [];

	for (let i = 0; i < width / size - 1; i++) {
		items.push({ y: 1.5 })
	}

	return function () {
		// c.fillStyle = 'rgba(0, 0, 0, 0.05)';
		c.fillStyle = 'rgba(55, 55, 55, 0.02)';
		c.fillRect(x, y, width, height);

		for (let i = 1; i < items.length; i++) {
			const text = characters.charAt(Math.floor(Math.random() * characters.length));
			const coordX = x + i * size;
			const coordY = y + items[i].y * size;

			c.fillStyle = Math.random() > 0.1 ? '#0aff0a' : '#fe1003'
			c.font = size + 'px monospace'
			c.fillText(text, coordX, coordY)

			if (items[i].y * size > height - 15 || Math.random() > 0.95) {
				items[i].y = 1.5;
			} else {
				items[i].y += 1;
			}
		}
	}
}