const mongoose = require('mongoose')

const User = new mongoose.Schema({
	avatar: {
		type: String,
		default: 'default.png',
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		// select: false,
	},
	balance: {
		type: Number,
		default: 1000,
	},
	bet_amount: {
		type: Number,
		default: 0,
	},
	payout_multiplier: {
		type: Number,
		default: 0,
	},
})

module.exports = mongoose.model('User', User)
