export default function detectCollisionCircle(item, circle) {
	const distance = Math.hypot(item.x - circle.x, item.y - circle.y) - item.radius - circle.radius;

	if (distance <= 0) {
		return true
	} else {
		return false
	}
}