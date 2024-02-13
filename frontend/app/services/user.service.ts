import { axiosServer } from '@/api/api'

export const userService = {
	async login(username: string, password: string) {
		return axiosServer.post(
			'/login',
			{ username, password },
			{ withCredentials: true }
		)
	},

	async register() {
		return axiosServer.get('/register', { withCredentials: true })
	},

	async getUser() {
		return axiosServer.get('/user', { withCredentials: true })
	},

	async logout() {
		return axiosServer.get('/logout', { withCredentials: true })
	}
}

//   await User.findByIdAndUpdate(req.user.id, { balance: thisUser.balance - req.body.bet_amount })
