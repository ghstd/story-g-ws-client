import connectingGamepadHandler from "./connectingGamepadHandler.js";

export default function initEvents(canvas) {
	const events = {
		mouse: {
			x: 0,
			y: 0,
			click: false,
			rclick: false,
			mclick: false
		},

		arrows: {
			up: false,
			down: false,
			left: false,
			right: false
		},

		wasd: {
			up: false,
			down: false,
			left: false,
			right: false
		},

		num: {
			digit0: false,
			digit1: false
		},

		key: {
			q: false,
			e: false,
			f: false,
			r: false
		},

		leftGamepad: false,
		rightGamepad: false

	};



	window.onmousemove = e => {

		events.mouse.x = e.offsetX
		events.mouse.y = e.offsetY
	}

	window.onmousedown = e => {

		if (e.button === 0) {
			events.mouse.click = true
		} else if (e.button === 1) {
			e.preventDefault()
			events.mouse.mclick = true
		} else if (e.button === 2) {
			events.mouse.rclick = true
		}
	}

	window.onmouseup = e => {

		if (e.button === 0) {
			events.mouse.click = false
		} else if (e.button === 1) {
			events.mouse.mclick = false
		} else if (e.button === 2) {
			events.mouse.rclick = false
		}
	}

	window.oncontextmenu = e => {
		e.preventDefault()
	}

	window.addEventListener('gamepadconnected', e => {
		connectingGamepadHandler(e.gamepad.id, e.type, events)
	})

	window.addEventListener('gamepaddisconnected', e => {
		connectingGamepadHandler(e.gamepad.id, e.type, events)
	})

	window.onkeydown = e => {
		const input = document.querySelector('.chat__input');

		if (e.code === 'Enter') {
			input.focus()
		}

		if (document.activeElement === input) return

		if (e.code === 'ArrowUp') {
			events.arrows.up = true
		}

		if (e.code === 'ArrowDown') {
			events.arrows.down = true
		}

		if (e.code === 'ArrowLeft') {
			events.arrows.left = true
		}

		if (e.code === 'ArrowRight') {
			events.arrows.right = true
		}



		if (e.code === 'KeyW') {
			events.wasd.up = true
		}

		if (e.code === 'KeyS') {
			events.wasd.down = true
		}

		if (e.code === 'KeyA') {
			events.wasd.left = true
		}

		if (e.code === 'KeyD') {
			events.wasd.right = true
		}



		if (e.code === 'KeyQ') {
			events.key.q = true
		}
		if (e.code === 'KeyE') {
			events.key.e = true
		}
		if (e.code === 'KeyF') {
			events.key.f = true
		}
		if (e.code === 'KeyR') {
			events.key.r = true
		}



		if (e.code === 'Digit1') {
			events.num.digit1 = true
		}
		if (e.code === 'Digit0') {
			events.num.digit0 = true
		}


		if (e.code === 'ShiftRight') {
			events.mouse.mclick = true
		}

	}

	window.onkeyup = e => {
		const input = document.querySelector('.chat__input');

		if (document.activeElement === input) return

		if (e.code === 'ArrowUp') {
			events.arrows.up = false
		}

		if (e.code === 'ArrowDown') {
			events.arrows.down = false
		}

		if (e.code === 'ArrowLeft') {
			events.arrows.left = false
		}

		if (e.code === 'ArrowRight') {
			events.arrows.right = false
		}


		if (e.code === 'KeyW') {
			events.wasd.up = false
		}

		if (e.code === 'KeyS') {
			events.wasd.down = false
		}

		if (e.code === 'KeyA') {
			events.wasd.left = false
		}

		if (e.code === 'KeyD') {
			events.wasd.right = false
		}



		if (e.code === 'KeyQ') {
			events.key.q = false
		}
		if (e.code === 'KeyE') {
			events.key.e = false
		}
		if (e.code === 'KeyF') {
			events.key.f = false
		}
		if (e.code === 'KeyR') {
			events.key.r = false
		}


		if (e.code === 'Digit1') {
			events.num.digit1 = false
		}
		if (e.code === 'Digit0') {
			events.num.digit0 = false
		}

		if (e.code === 'ShiftRight') {
			events.mouse.mclick = false
		}

	}

	return events
}