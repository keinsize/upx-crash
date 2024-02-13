import { FC } from 'react'

import Layout from '@/layout/Layout'

import { useCrash } from '@/hooks/useCrash'

import styles from './Crash.module.scss'
import Game from './game/Game'
import History from './history/History'
import LiveBettingTable from './liveBettingTable/LiveBettingTable'

const Crash: FC = () => {
	const { crashHistory, liveBettingTable, gameData } = useCrash()

	return (
		<Layout
			title='Краш'
			description='Онлайн-стратегия, где надо успеть забрать выигрыш, пока растет коэффициент.'
		>
			<div className={styles.crash}>
				<LiveBettingTable liveBettingList={liveBettingTable} />
				<Game chartStats={gameData.chartStats} gameStats={gameData.gameStats} />
				<History crashHistory={crashHistory} />
			</div>
		</Layout>
	)
}

export default Crash
