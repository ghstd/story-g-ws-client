import { canvas, c } from "./canvas.js"
import GamePhases from "../classes/GamePhases.js"

export default function clearCanvas() {
	c.fillStyle = GamePhases.backgroundColor
	// c.fillStyle = 'rgba(30, 30, 30, 0.3)'
	// c.fillStyle = 'rgba(0, 0, 0, 0.05)'
	c.fillRect(0, 0, canvas.width, canvas.height)
}