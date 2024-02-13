import { FC, memo, useEffect, useState } from 'react'

import Message from '@/ui/message/Message'
import RateInput from '@/ui/rateInput/RateInput'

import { useGame } from '@/hooks/useGame'

import styles from './Rate.module.scss'
import { gameService } from '@/services/game.service'

const Rate: FC = () => {
	const {
		betActive,
		betAmount,
		autoPayoutMultiplier,
		setAutoPayoutMultiplier,
		setBetAmount,
		setBetActive
	} = useGame()
	const [message, setMessage] = useState<null | string>(null)

	const sendBet = () => {
		gameService
			.send_bet({
				bet_amount: betAmount,
				payout_multiplier: autoPayoutMultiplier
			})
			.then(res => {
				if (res.data.error) setMessage(res.data.error)
				else {
					setBetActive(true)
					setMessage(res.data.success)
				}
			})
	}

	const cashout = () => {
		gameService.manual_cashout_early().then(res => {
			if (res.data.error) setMessage(res.data.error)
			else {
				setBetActive(false)
			}
		})
	}

	useEffect(() => {
		if (message) var timeout = setTimeout(() => setMessage(null), 5000)
		return () => {
			clearTimeout(timeout)
		}
	}, [message])

	return (
		<div className={styles.rate}>
			{message && (
				<Message>
					<div className='text-base'>{message}</div>
				</Message>
			)}
			<div className={styles.inputs}>
				<RateInput name='Ставка' value={betAmount} setValue={setBetAmount} />
				<RateInput
					name='Автостоп'
					value={autoPayoutMultiplier}
					float
					setValue={setAutoPayoutMultiplier}
				/>
			</div>
			<div className={styles.sendbet}>
				{!betActive ? (
					<button className={styles.play} onClick={sendBet}>
						<span>Играть</span>
					</button>
				) : (
					<button className={styles.stop} onClick={cashout}>
						<span>Забрать</span>
					</button>
				)}
			</div>
		</div>
	)
}

export default memo(Rate)
