import { useQueryClient } from '@tanstack/react-query'
import { Chart, ChartData as IChartData, registerables } from 'chart.js'
import { useEffect, useRef, useState } from 'react'
import * as io from 'socket.io-client'

import { useGame } from './useGame'
import { gameService } from '@/services/game.service'

Chart.register(...registerables)

export const useCrash = () => {
	const s = useGame()
	const queryClient = useQueryClient()
	const { betActive, autoPayoutMultiplier, setBetActive } = useGame()
	const [globalTimeNow, setGlobalTimeNow] = useState(0)
	const [liveMultiplier, setLiveMultiplier] = useState('0.00')
	const [liveMultiplierSwitch, setLiveMultiplierSwitch] = useState(false)
	const [crashHistory, setCrashHistory] = useState([])
	const [bettingPhase, setBettingPhase] = useState(false)
	const [chartSwitch, setChartSwitch] = useState(false)
	const [bettingPhaseTime, setBettingPhaseTime] = useState('0.0')
	const [liveBettingTable, setLiveBettingTable] = useState([])
	const [chartData, setChartData] = useState<IChartData>({ datasets: [] })
	const [chartOptions, setChartOptions] = useState({})
	const [gamePhaseTimeElapsed, setGamePhaseTimeElapsed] = useState(0)

	const multiplierCount = useRef<number[]>([])
	const timeCount_xaxis = useRef<number[]>([])
	const realCounter_yaxis = useRef(5)

	// Socket.io setup
	useEffect(() => {
		const socket = io.connect('http://localhost:3001')

		socket.on('start_multiplier_count', function (data) {
			setGlobalTimeNow(Date.now())
			setLiveMultiplierSwitch(true)
		})

		socket.on('stop_multiplier_count', function (data) {
			setLiveMultiplier(data)
			setLiveMultiplierSwitch(false)
			setBetActive(false)
		})

		socket.on('update_user', function (data) {
			queryClient.invalidateQueries(['userData'])
		})

		socket.on('crash_history', function (data) {
			setCrashHistory(data)
		})

		socket.on('start_betting_phase', function (data) {
			setGlobalTimeNow(Date.now())
			setBettingPhase(true)
			setLiveBettingTable([])

			setLiveMultiplier('0.00')
			setGamePhaseTimeElapsed(0)

			multiplierCount.current = []
			timeCount_xaxis.current = []
		})

		socket.on('receive_live_betting_table', data => {
			data = JSON.parse(data)
			setLiveBettingTable(data)
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	// Define useEffects

	useEffect(() => {
		get_game_status()
		setChartSwitch(true)
		let getActiveBettorsTimer = setTimeout(
			() => gameService.retrieve_active_bettors_list(),
			100
		)
		let getBetHistory = setTimeout(
			() => gameService.retrieve_bet_history(),
			100
		)

		return () => {
			clearTimeout(getActiveBettorsTimer)
			clearTimeout(getBetHistory)
		}
	}, [])

	useEffect(() => {
		if (betActive && autoPayoutMultiplier <= parseFloat(liveMultiplier)) {
			auto_cashout_early()
			setBetActive(false)
		}
	}, [liveMultiplier])

	useEffect(() => {
		let gameCounter: NodeJS.Timer | null = null
		if (liveMultiplierSwitch) {
			setLiveMultiplier('1.00')

			gameCounter = setInterval(() => {
				let time_elapsed = (Date.now() - globalTimeNow) / 1000.0
				setGamePhaseTimeElapsed(time_elapsed)
				setLiveMultiplier(Math.pow(1.12683675928, time_elapsed).toFixed(2))
				if (multiplierCount.current.length < 1) {
					multiplierCount.current = multiplierCount.current.concat([1])
					timeCount_xaxis.current = timeCount_xaxis.current.concat([0])
				}
				if (realCounter_yaxis.current % 5 == 0) {
					multiplierCount.current = multiplierCount.current.concat([
						Math.pow(1.12683675928, time_elapsed)
					])
					timeCount_xaxis.current = timeCount_xaxis.current.concat([
						time_elapsed
					])
				}
				realCounter_yaxis.current += 1
			}, 1)
		}
		return () => {
			clearInterval(gameCounter!)
		}
	}, [liveMultiplierSwitch])

	useEffect(() => {
		let bettingInterval: NodeJS.Timer | null = null

		if (bettingPhase) {
			bettingInterval = setInterval(() => {
				let time_elapsed = (Date.now() - globalTimeNow) / 1000.0
				let time_remaining = (5 - time_elapsed).toFixed(1)
				setBettingPhaseTime(time_remaining)
				if (parseFloat(time_remaining) <= 0) {
					setBettingPhase(false)
				}
			}, 100)
		}
		return () => {
			clearInterval(bettingInterval!)
			setBettingPhaseTime('0.0')
		}
	}, [bettingPhase])

	const get_game_status = async () => {
		const gameStatus = await gameService.getStatus()

		setLiveBettingTable(gameStatus.liveBetting)
		setCrashHistory(gameStatus.history)

		if (gameStatus.phase === 'betting') {
			setGlobalTimeNow(gameStatus.info)
			setBettingPhase(true)
		} else if (gameStatus.phase === 'game') {
			setGlobalTimeNow(gameStatus.info)
			setLiveMultiplierSwitch(true)
		}
	}

	const auto_cashout_early = () => {
		gameService.auto_cashout_early().then(res => {
			setBetActive(false)
		})
	}

	useEffect(() => {
		const temp_interval = setInterval(() => {
			setChartSwitch(false)
			sendToChart()
		}, 50)

		return () => {
			clearInterval(temp_interval)
			setChartSwitch(true)
		}
	}, [chartSwitch])

	// Chart Data
	const sendToChart = () => {
		setChartData({
			labels: timeCount_xaxis.current,

			datasets: [
				{
					data: multiplierCount.current,
					backgroundColor: liveMultiplierSwitch
						? 'rgb(65, 169, 218, 0.2)'
						: 'rgba(255, 0, 0, 0.2)',

					borderColor: liveMultiplierSwitch
						? 'rgb(65, 169, 218)'
						: 'rgba(255, 0, 0)',

					pointRadius: 0
				}
			]
		})
		setChartOptions({
			events: [],
			maintainAspectRatio: false,
			elements: {
				line: {
					tension: 0.5
				}
			},
			scales: {
				y: {
					type: 'linear',
					min: 1,
					max: parseFloat(liveMultiplier) > 3 ? liveMultiplier : 3,
					ticks: {
						color: '#4A4E6F',
						suggestedMax: 3,
						maxTicksLimit: 5 | 6,
						callback: function (value: string) {
							return parseFloat(value).toFixed(1)
						}
					},
					grid: {
						display: true,
						color: '#2F2E4B'
					}
				},
				x: {
					type: 'linear',
					min: 0,
					max: gamePhaseTimeElapsed > 9.2 ? gamePhaseTimeElapsed : 9.2,
					ticks: {
						color: '#4A4E6F',
						suggestedMax: 9.2,
						maxTicksLimit: 5 | 6,
						callback: function (value: string) {
							return parseFloat(value).toFixed(1)
						}
					},
					grid: {
						display: true,
						color: '#2F2E4B'
					}
				}
			},
			plugins: {
				legend: { display: false }
			},
			animation: false,
			fill: true
		})
	}
	return {
		gameData: {
			chartStats: {
				chartData,
				chartOptions
			},
			gameStats: {
				bettingPhase,
				bettingPhaseTime,
				liveMultiplier,
				liveMultiplierSwitch
			}
		},
		liveBettingTable,
		crashHistory
	}
}
