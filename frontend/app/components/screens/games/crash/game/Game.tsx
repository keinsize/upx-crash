import { ChartData, ChartOptions } from 'chart.js'
import { FC } from 'react'
import { Chart as ReactChart } from 'react-chartjs-2'

import styles from './Game.module.scss'
import Rate from './rate/Rate'

const Game: FC<{
	chartStats: { chartData: ChartData; chartOptions: ChartOptions }
	gameStats: {
		bettingPhase: boolean
		liveMultiplier: string
		bettingPhaseTime: string
		liveMultiplierSwitch: boolean
	}
}> = ({ chartStats, gameStats }) => {
	return (
		<div className={styles.game}>
			<div className={styles.chart}>
				<ReactChart
					type='line'
					data={chartStats.chartData}
					options={chartStats.chartOptions}
				/>
				<div className={styles.timer}>
					<div
						style={{
							color:
								!gameStats.liveMultiplierSwitch && !gameStats.bettingPhase
									? '#ff0000ff'
									: '#fff'
						}}
					>
						{gameStats.bettingPhase ? (
							<>
								<span>{gameStats.bettingPhaseTime}</span>
								<span>сек</span>
							</>
						) : (
							<>
								<span>{gameStats.liveMultiplier}</span>
								<span>x</span>
							</>
						)}
					</div>
				</div>
			</div>
			<Rate />
		</div>
	)
}

export default Game
