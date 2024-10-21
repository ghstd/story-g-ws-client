export default function connectingGamepadHandler(id, type, events) {
	if (type === 'gamepadconnected') {

		const html = `
			<div class="choose-gamepad">
				<button class="left-gamepad-btn" type="button">left player</button>
				<button class="right-gamepad-btn" type="button">right player</button>
			</div> 
		`;

		document.body.insertAdjacentHTML('beforeend', html)

		const leftBtn = document.querySelector('.left-gamepad-btn');
		const rightBtn = document.querySelector('.right-gamepad-btn');

		leftBtn.onclick = () => {
			events.leftGamepad = id
			document.querySelector('.choose-gamepad').remove()
		}
		rightBtn.onclick = () => {
			events.rightGamepad = id
			document.querySelector('.choose-gamepad').remove()
		}
	}

	if (type === 'gamepaddisconnected') {
		document.querySelector('.choose-gamepad')?.remove()

		if (events.leftGamepad === id) events.leftGamepad = false
		else if (events.rightGamepad === id) events.rightGamepad = false
	}
}










































