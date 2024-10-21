export default function getClosestCircles(source, targets, distance = 200) {
	const x = source.x;
	const y = source.y;

	const result = targets.filter(target => Math.hypot(x - target.x, y - target.y) <= distance);

	result.sort((a, b) => {
		return Math.hypot(x - a.x, y - a.y) - Math.hypot(x - b.x, y - b.y)
	})

	return result
}