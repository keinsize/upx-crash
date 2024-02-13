const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const User = require('./models/User')
const bodyParser = require('body-parser')
const Game_Loop = require('./models/Game_Loop')
const genUniqueDataForUser = require('./utils/genUniqueDataForUser')
const { Server } = require('socket.io')
const http = require('http')

// Start Socket.io Server

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})

server.listen(3001)

// Connect to MongoDB

const GAME_LOOP_ID = '62b7e66b1da7901bfc65df0d'

mongoose.connect('mongodb://admin:aNK48073fs@84.252.73.107:27017/admin')

// Backend Setup

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: true, credentials: true }))
app.use(
	session({
		secret: 'c3f76903b62a90d727f66149fcfaf3cf',
		resave: true,
		saveUninitialized: true,
	})
)
app.use(cookieParser('c3f76903b62a90d727f66149fcfaf3cf'))
app.use(passport.initialize())
app.use(passport.session())
require('./passportConfig')(passport)

//Passport.js

app.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (!user) {
			res.send({ error: 'Пара Логин-Пароль не найдена.' })
		} else {
			req.logIn(user, err => {
				res.send(user)
			})
		}
	})(req, res, next)
})

app.get('/register', async (req, res) => {
	let username = ''
	let existsUser

	while (!(existsUser === null)) {
		username = genUniqueDataForUser()
		existsUser = await User.findOne({ username })
	}

	if (!existsUser) {
		const password = genUniqueDataForUser(true)
		const hashedPassword = await bcrypt.hash(password, 10)
		const newUser = new User({
			username: username,
			password: hashedPassword,
		})

		await newUser.save()

		res.send({ username, password })
	}
})

app.get('/user', checkAuthenticated, (req, res) => {
	res.send(req.user)
})

app.get('/logout', (req, res) => {
	req.logout()
	res.status(200).send({ success: 'Выход выполнен успешно!' })
})

// Game Actions

app.post('/send_bet', checkAuthenticated, async (req, res) => {
	if (!betting_phase)
		return res.json({ error: 'Нельзя делать ставку во время игры!' })

	if (isNaN(req.body.bet_amount) || isNaN(req.body.payout_multiplier))
		return res.json({ error: 'Введите корректное число' })

	theLoop = await Game_Loop.findById(GAME_LOOP_ID)
	playerIdList = theLoop.active_player_id_list

	bDuplicate = false

	for (var i = 0; i < playerIdList.length; i++) {
		if (playerIdList[i] === req.user.id) {
			res.json({ error: 'Вы уже сделали ставку в этой игре!' })
			bDuplicate = true
			break
		}
	}

	if (bDuplicate) {
		return
	}

	const thisUser = await User.findById(req.user.id)

	if (req.body.bet_amount > thisUser.balance) {
		return res.status(400).json({ customError: 'Недостаточно средств!' })
	}

	await User.findByIdAndUpdate(req.user.id, {
		bet_amount: req.body.bet_amount,
		payout_multiplier: req.body.payout_multiplier,
	})

	await User.findByIdAndUpdate(req.user.id, {
		balance: thisUser.balance - req.body.bet_amount,
	})

	await Game_Loop.findByIdAndUpdate(GAME_LOOP_ID, {
		$push: { active_player_id_list: req.user.id },
	})

	live_bettors_table.push({
		user_id: req.user.id,
		username: req.user.username,
		bet_amount: req.body.bet_amount,
		cashout_multiplier: null,
		profit: null,
		bet_live: true,
	})

	io.emit('receive_live_betting_table', JSON.stringify(live_bettors_table))
	io.emit('update_user')

	res.send({ success: 'Ставка успешно сделана!' })
})

app.get('/manual_cashout_early', checkAuthenticated, async (req, res) => {
	if (!game_phase) {
		return res.send({ error: 'Игра еще не началась!' })
	}

	const theLoop = await Game_Loop.findById(GAME_LOOP_ID)
	const time_elapsed = (Date.now() - phase_start_time) / 1000
	const current_multiplier = Math.pow(1.12683675928, time_elapsed).toFixed(2)

	if (
		current_multiplier <= game_crash_value &&
		theLoop.active_player_id_list.includes(req.user.id)
	) {
		cashout_early(req, res, current_multiplier)
	}
})

app.get('/auto_cashout_early', checkAuthenticated, async (req, res) => {
	if (!game_phase) {
		return res.send({ error: 'Нет активных игр.' })
	}

	const theLoop = await Game_Loop.findById(GAME_LOOP_ID)

	if (
		req.user.payout_multiplier <= game_crash_value &&
		theLoop.active_player_id_list.includes(req.user.id)
	) {
		cashout_early(req, res, null)
	}
})

// Game info

app.get('/retrieve_active_bettors_list', async (req, res) => {
	io.emit('receive_live_betting_table', JSON.stringify(live_bettors_table))
	return res.send({ success: 'Успешно' })
})

app.get('/retrieve_bet_history', async (req, res) => {
	let theLoop = await Game_Loop.findById(GAME_LOOP_ID)
	// io.emit('crash_history', theLoop.previous_crashes)
	return res.send({ success: 'Успешно' })
})

app.get('/get_game_status', async (req, res) => {
	let theLoop = await Game_Loop.findById(GAME_LOOP_ID)

	if (betting_phase)
		return res.send({
			phase: 'betting',
			info: phase_start_time,
			history: theLoop.previous_crashes,
			liveBetting: live_bettors_table,
		})
	else if (game_phase)
		return res.send({
			phase: 'game',
			info: phase_start_time,
			history: theLoop.previous_crashes,
			liveBetting: live_bettors_table,
		})
})

// Start app

app.listen(4000)

// Run Game Loop

let phase_start_time = Date.now()
let live_bettors_table = []
let betting_phase = false
let game_phase = false
let cashout_phase = true
let game_crash_value = 0
let sent_cashout = true

setInterval(async () => {
	await loopUpdate()
}, 1)

// Game Loop

const loopUpdate = async () => {
	let time_elapsed = (Date.now() - phase_start_time) / 1000.0

	if (betting_phase) {
		if (time_elapsed > 5) {
			sent_cashout = false
			betting_phase = false
			game_phase = true
			io.emit('start_multiplier_count')
			phase_start_time = Date.now()
		}
	} else if (game_phase) {
		current_multiplier = Math.pow(1.12683675928, time_elapsed)
		if (current_multiplier > game_crash_value) {
			io.emit('stop_multiplier_count', game_crash_value.toFixed(2))

			game_phase = false
			cashout_phase = true

			phase_start_time = Date.now()
		}
	} else if (cashout_phase) {
		if (!sent_cashout) {
			cashout()

			sent_cashout = true
			const update_loop = await Game_Loop.findById(GAME_LOOP_ID)
			await update_loop.updateOne({
				$push: { previous_crashes: game_crash_value },
			})
			await update_loop.updateOne({ $unset: { 'previous_crashes.0': 1 } })
			await update_loop.updateOne({ $pull: { previous_crashes: null } })
		}

		if (time_elapsed > 3) {
			cashout_phase = false
			betting_phase = true
			const randomInt = Math.floor(Math.random() * 1000)

			if (randomInt % 33 == 0) {
				game_crash_value = 0
			} else {
				let random_int_0_to_1 = Math.random()
				while (random_int_0_to_1 === 0) {
					random_int_0_to_1 = Math.random
				}
				game_crash_value = 0.01 + 0.99 / random_int_0_to_1
				game_crash_value = Math.round(game_crash_value * 100) / 100
			}

			io.emit('update_user')
			const theLoop = await Game_Loop.findById(GAME_LOOP_ID)
			io.emit('crash_history', theLoop.previous_crashes)
			io.emit('start_betting_phase')
			live_bettors_table = []
			phase_start_time = Date.now()
		}
	}
}

// Other

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	} else res.send({ error: 'Вы не авторизованы!' })
}

async function cashout_early(req, res, current_multiplier) {
	const currentUser = await User.findById(req.user.id)
	if (!current_multiplier) current_multiplier = currentUser.payout_multiplier
	const profit = parseFloat(
		(currentUser.bet_amount * current_multiplier).toFixed(1)
	)

	currentUser.balance += profit
	await currentUser.save()

	await theLoop.updateOne({ $pull: { active_player_id_list: req.user.id } })

	for (const bettorObject of live_bettors_table) {
		if (bettorObject.user_id === req.user.id) {
			bettorObject.cashout_multiplier =
				current_multiplier || currentUser.payout_multiplier
			bettorObject.profit = profit
			bettorObject.bet_live = false
			io.emit('receive_live_betting_table', JSON.stringify(live_bettors_table))
			break
		}
	}
	res.send({ success: `Вы успешно забрали ${profit} слитков` })
}

const cashout = async () => {
	const theLoop = await Game_Loop.findById(GAME_LOOP_ID)
	const playerIdList = theLoop.active_player_id_list

	for (const playerId of playerIdList) {
		const currentUser = await User.findById(playerId)
		if (currentUser.payout_multiplier <= game_crash_value) {
			currentUser.balance +=
				currentUser.bet_amount * currentUser.payout_multiplier
			await currentUser.save()
		}
	}

	theLoop.active_player_id_list = []

	await theLoop.save()
}
