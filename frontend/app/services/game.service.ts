import { axiosServer } from '@/api/api'

export const gameService = {
	async getStatus() {
		const { data } = await axiosServer.get('/get_game_status', {
			withCredentials: true
		})

		return data
	},

	retrieve_bet_history() {
		axiosServer.get('/retrieve_bet_history', {
			withCredentials: true
		})
	},

	retrieve_active_bettors_list() {
		axiosServer.get('/retrieve_active_bettors_list', {
			withCredentials: true
		})
	},

	auto_cashout_early() {
		return axiosServer.get('/auto_cashout_early', {
			withCredentials: true
		})
	},

	send_bet(data: { bet_amount: number; payout_multiplier: number }) {
		return axiosServer.post('send_bet', data, {
			withCredentials: true
		})
	},

	manual_cashout_early() {
		return axiosServer.get('/manual_cashout_early', {
			withCredentials: true
		})
	}
}

//   await User.findByIdAndUpdate(req.user.id, { balance: thisUser.balance - req.body.bet_amount })
