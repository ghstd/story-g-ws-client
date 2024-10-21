export default function detectCollisionAny(ball, target) {

	const catet = Math.sqrt(ball.radius / 2);

	const rPoint = { x: ball.x + ball.radius, y: ball.y };
	const lPoint = { x: ball.x - ball.radius, y: ball.y };
	const bPoint = { x: ball.x, y: ball.y + ball.radius };
	const rbPoint = { x: ball.x + catet, y: ball.y + catet };
	const lbPoint = { x: ball.x - catet, y: ball.y + catet };

	const points = [rPoint, lPoint, bPoint, rbPoint, lbPoint];
	const point = points.find(point => {
		return (point.x > target.x && point.x < target.x + target.w) &&
			(point.y > target.y && point.y < target.y + target.h)
	});

	if (point) return true
}
