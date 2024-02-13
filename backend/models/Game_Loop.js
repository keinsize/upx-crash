const mongoose = require('mongoose')

const Game_Loop = new mongoose.Schema({
	round_number: {
		type: Number,
		default: 1,
	},
	active_player_id_list: {
		type: [String],
		default: [],
	},
	previous_crashes: {
		type: [Number],
		default: [],
	},
})

module.exports = mongoose.model('Game_Loop', Game_Loop)
