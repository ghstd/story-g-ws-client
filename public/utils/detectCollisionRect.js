export default function detectCollisionRect(item, rect) {
	if (item.x < rect.x + rect.w &&
		item.x + item.w > rect.x &&
		item.y < rect.y + rect.h &&
		item.y + item.h > rect.y) {
		return true
	} else {
		return false
	}
}