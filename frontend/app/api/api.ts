import axios from 'axios'

import { ExpressURL } from '@/config'

export const axiosServer = axios.create({
	baseURL: ExpressURL,
	headers: {
		'Content-Type': 'application/json'
	}
})
