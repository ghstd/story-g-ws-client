import { canvas, c } from "./utils/canvas.js"
import initEvents from "./utils/initEvents.js";
import clearCanvas from "./utils/clearCanvas.js"
import Area from "./classes/Area.js"
import DefaultShootingRect from "./elementsClasses/DefaultShootingRect.js";
import DefaultDefendingRect from "./elementsClasses/DefaultDefendingRect.js";
import DefaultEnemy from "./elementsClasses/DefaultEnemy.js";
import Base from "./elementsClasses/Base.js";
import Labirint from "./classes/Labirint.js";
import GamePhases from "./classes/GamePhases.js";
import InteractingRect from "./elementsClasses/InteractingRect.js";
import gamepadEvents from "./utils/gamepadEvents.js";
import Scenes from "./classes/Scenes.js";
import FinalScreen from "./classes/FinalScreen.js";
import drawGamepadCursor from "./utils/drawGamepadCursor.js";

// Socket ===========================
const socket = new WebSocket('wss://story-g-ws-server.onrender.com');

socket.onopen = () => {
	document.querySelector('.socket-status').classList.add('active')
	console.log('socket open')
}
socket.onclose = () => {
	document.querySelector('.socket-status').classList.remove('active')
	console.log('socket close')
}
socket.onerror = () => {
	console.log('cannot connect to websocket')
}

socket.onmessage = ({ data }) => {
	const socketData = JSON.parse(data);

	if (socketData.name === 'index') {
		animateControls.clientIndex = socketData.value
		document.querySelector('.index-status').textContent = `user ${socketData.value}`
		console.log(`user ${socketData.value}`)
		if (socketData.value != 1) {
			animateControls.animate = () => { }
			animate = () => { }
		}
		startRTC(socketData.value)
	}

	if (socketData.name === 'start') {
		connect()
	}

	if (animateControls.clientIndex === 1) {

		if (socketData.name === 'pc_2_description') {
			pc_1.setRemoteDescription(socketData.value)
		}

		if (socketData.name === 'pc_2_candidate') {
			pc_1.addIceCandidate(new RTCIceCandidate(socketData.value))
		}

	} else {

		if (socketData.name === 'pc_1_description') {
			pc_2.setRemoteDescription(socketData.value)

			pc_2.createAnswer().then(description => {
				pc_2.setLocalDescription(description)

				socket.send(JSON.stringify({
					name: 'pc_2_description',
					value: description
				}))
			})
		}

		if (socketData.name === 'pc_1_candidate') {
			pc_2.addIceCandidate(new RTCIceCandidate(socketData.value))
		}

	}
}

// RTCPeerConnection ===========================

let pc_1 = null;
let pc_2 = null;
let channel = null;
let stream;
let track;
let connect;

function startRTC(index) {
	if (animateControls.clientIndex === 1) {
		const video = document.querySelector('video');
		video.style.display = 'none'

		stream = canvas.captureStream(60);
		track = stream.getVideoTracks()[0];

		pc_1 = new RTCPeerConnection({
			configuration: {
				offerToReceiveVideo: true
			},
			iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
		});

		pc_1.addTrack(track, stream)

		pc_1.onconnectionstatechange = e => {
			if (pc_1.connectionState === 'connected') {
				console.log('pc_1 connected')
			}
		}

		channel = pc_1.createDataChannel("chat")
		animateControls.channel = channel

		channel.onopen = e => channel.send(JSON.stringify({
			name: 'connect',
			value: 'RTC open'
		}))
		channel.onclose = e => {
			channel = null
			document.querySelector('.rtc-status').classList.remove('active')
			console.log('RTC close')
		}
		channel.onmessage = pc_1_MessageHandler

		connect = () => {
			pc_1.createOffer().then(description => {
				pc_1.setLocalDescription(description)

				socket.send(JSON.stringify({
					name: 'pc_1_description',
					value: description
				}))
			})

			pc_1.addEventListener('icecandidate', e => {
				if (e.candidate) {
					socket.send(JSON.stringify({
						name: 'pc_1_candidate',
						value: e.candidate
					}))
				}
			})
		}
	} else {
		const video = document.querySelector('video');
		const videoBtn = document.querySelector('.video__button');
		canvas.style.display = 'none'
		video.style.display = 'block'
		videoBtn.style.display = 'block'

		videoBtn.onclick = () => {
			video.play()
			videoBtn.style.display = 'none'
		}

		connect = () => { }

		pc_2 = new RTCPeerConnection({
			iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
		});

		pc_2.ondatachannel = (event) => {
			channel = event.channel

			channel.onopen = e => channel.send(JSON.stringify({
				name: 'connect',
				value: 'RTC open'
			}))
			channel.onclose = e => {
				channel = null
				document.querySelector('.rtc-status').classList.remove('active')
				console.log('RTC close')
			}
			channel.onmessage = pc_2_MessageHandler

		}

		pc_2.addEventListener('icecandidate', e => {
			if (e.candidate) {
				socket.send(JSON.stringify({
					name: 'pc_2_candidate',
					value: e.candidate
				}))
			}
		})

		pc_2.addEventListener('track', e => {
			video.srcObject = e.streams[0]
		})

		for (const [key, value] of Object.entries(events)) {
			if (key === 'leftGamepad' || key === 'rightGamepad') continue
			events[key] = new Proxy(value, {
				set(target, prop, val) {
					target[prop] = val

					if (channel) {
						channel.send(JSON.stringify({
							name: 'events',
							value: [key, target]
						}))
					}

					return true;
				}
			});
		}
	}
}

function pc_1_MessageHandler(e) {
	const inputData = JSON.parse(e.data);

	switch (inputData.name) {
		case 'connect':
			document.querySelector('.rtc-status').classList.add('active')
			console.log(inputData.value)
			break;
		case 'chat':
			printChat(inputData.value)
			break;
		case 'events':
			events[inputData.value[0]] = inputData.value[1]
			break;

		default:
			break;
	}
}

function pc_2_MessageHandler(e) {
	const inputData = JSON.parse(e.data);

	switch (inputData.name) {
		case 'connect':
			document.querySelector('.rtc-status').classList.add('active')
			console.log(inputData.value)
			break;
		case 'chat':
			printChat(inputData.value)
			break;
		case 'printDialog':
			GamePhases.scenes.printDialog()
			break;
		case 'skipDialog':
			GamePhases.scenes.skipDialog()
			break;
		case 'closeScene':
			GamePhases.scenes.closeScene()
			setTimeout(() => {
				const video = document.querySelector('video');
				video.style.display = 'none'
				canvas.style.display = 'block'

				GamePhases.finalScreen = new FinalScreen()
				GamePhases.finalScreen.animate()
			}, 12000);
			break;

		default:
			break;
	}
}

// Chat ===========================

const chatForm = document.querySelector('.chat__form');
const chatInput = document.querySelector('.chat__input');
const chatBody = document.querySelector('.chat__body');

chatForm.onsubmit = e => {
	e.preventDefault()

	const text = chatInput.value;
	if (!text) return
	chatInput.value = ''
	chatInput.blur()
	channel.send(JSON.stringify({
		name: 'chat',
		value: {
			text: text,
			index: animateControls.clientIndex
		}

	}))
}

function printChat(data) {
	const message = document.createElement('div');

	data.index === 1 ? message.classList.add('chat__message-1') : message.classList.add('chat__message-2')
	message.textContent = data.text
	chatBody.append(message)
	message.scrollIntoView(false)
}

// Correction ===========================

let deltaTimestamp = 0;
let lastTimestamp = 0;
const MAX_DELTA_TIME = 40;

// Events ===========================

const events = initEvents(canvas);

// Objects ========================

const area = new Area();

const labirint = new Labirint();

const base = new Base({
	x: canvas.width / 2,
	y: canvas.height + canvas.height / 3,
	radius: canvas.height / 2,
	color: 'rgba(250,250,250,0.8)'
});

const mainEnem = new DefaultEnemy({
	x: canvas.width / 2,
	y: 50,
	radius: 50,
	color: 'yellow',
	name: 'mainEnemy'
});

const player1 = new DefaultShootingRect({
	x: canvas.width - 70,
	y: canvas.height - 170,
	w: 30,
	h: 30,
	vx: 4,
	vy: 4,
	color: '#00633E'
});

const player2 = new DefaultDefendingRect({
	x: 40,
	y: canvas.height - 170,
	w: 30,
	h: 30,
	vx: 4,
	vy: 4,
	color: '#00633E'
});

GamePhases.mainEnem = mainEnem
GamePhases.iPlayer_1 = player1
GamePhases.iPlayer_2 = player2

DefaultEnemy.allEnemies = [mainEnem]

// Loop ===========================

function update(correction) {

	gamepadEvents(events)

	GamePhases.update(events)
	area.update()
	labirint.update(events)
	InteractingRect.interactingItems.forEach(item => item.update(correction))
	InteractingRect.piecesUpdate(correction)

	const player1Objects = player1.update({
		correction,
		events,
		base,
		collisionObjects: [
			...area.rects,
			base,
			...InteractingRect.interactingItems
		]
	});

	const player2Objects = player2.update({
		correction,
		events,
		base,
		collisionObjects: [
			...area.rects,
			base,
			...InteractingRect.interactingItems
		]
	});

	DefaultEnemy.allEnemies.forEach(enem => {
		enem.update({
			correction,
			collisionObjects: [
				player1,
				player2,
				base,
				...player1Objects,
				...player2Objects
			]
		})
	})

}

function display() {
	clearCanvas()

	base.display()
	area.display()
	labirint.display()
	InteractingRect.interactingItems.forEach(item => item.display())
	DefaultEnemy.allEnemies.forEach(enem => enem.display())
	player1.display()
	player2.display()
	drawGamepadCursor(events, animateControls)
}

// ===========================

function animate(currentTimestamp = 0) {
	animateControls.stopID = requestAnimationFrame(animate)

	deltaTimestamp = currentTimestamp - lastTimestamp
	lastTimestamp = currentTimestamp

	if (deltaTimestamp < MAX_DELTA_TIME) {
		update(deltaTimestamp / 1000)
		display()
	}

}

setTimeout(() => {
	update()
	display()
}, 1000)

const animateControls = {
	animate,
	stopID: '',
	clientIndex: '',
	channel,
	player1
};

export default animateControls








































