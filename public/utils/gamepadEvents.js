import animateControls from "../animate.js";

export default function gamepadEvents(events) {
	if (!events.leftGamepad && !events.rightGamepad) return

	if (events.leftGamepad) {
		const gamepads = navigator.getGamepads();
		const gp = gamepads.find(gamepad => gamepad.id === events.leftGamepad);

		if (gp === null) {
			return
		} else {

			if (gp.axes[0] === -1) {
				events.wasd.left = true
			} else {
				events.wasd.left = false
			}
			if (gp.axes[0] === 1) {
				events.wasd.right = true
			} else {
				events.wasd.right = false
			}
			if (gp.axes[1] === -1) {
				events.wasd.up = true
			} else {
				events.wasd.up = false
			}
			if (gp.axes[1] === 1) {
				events.wasd.down = true
			} else {
				events.wasd.down = false
			}

			if (gp.buttons[2].pressed) {
				events.key.e = true
			} else {
				events.key.e = false
			}
			if (gp.buttons[1].pressed) {
				events.key.q = true
			} else {
				events.key.q = false
			}
			if (gp.buttons[0].pressed) {
				events.key.f = true
			} else {
				events.key.f = false
			}
			if (gp.buttons[3].pressed) {
				events.key.r = true
			} else {
				events.key.r = false
			}
		}
	}

	if (events.rightGamepad) {
		const gamepads = navigator.getGamepads();
		const gp = gamepads.find(gamepad => gamepad.id === events.rightGamepad);

		if (gp === null) {
			return
		} else {

			if (gp.axes[0] === -1) {
				events.arrows.left = true
			} else {
				events.arrows.left = false
			}
			if (gp.axes[0] === 1) {
				events.arrows.right = true
			} else {
				events.arrows.right = false
			}
			if (gp.axes[1] === -1) {
				events.arrows.up = true
			} else {
				events.arrows.up = false
			}
			if (gp.axes[1] === 1) {
				events.arrows.down = true
			} else {
				events.arrows.down = false
			}

			// =========================

			let dx = Math.floor(gp.axes[2] * 15);
			let dy = Math.floor(gp.axes[5] * 15);

			if (dx === 0 && dy === 0) {
				dy = -15
			}

			events.mouse.x = animateControls.player1.x + (animateControls.player1.w / 2) + dx
			events.mouse.y = animateControls.player1.y + dy

			// =========================

			if (gp.buttons[7].pressed) {
				events.mouse.click = true
			} else {
				events.mouse.click = false
			}
			if (gp.buttons[6].pressed) {
				events.mouse.rclick = true
			} else {
				events.mouse.rclick = false
			}
			if (gp.buttons[5].pressed) {
				events.mouse.mclick = true
			} else {
				events.mouse.mclick = false
			}

		}
	}
}