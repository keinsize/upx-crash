import Image from 'next/image'
import { FC, memo } from 'react'

import { IBet } from '@/types/bet.interface'

import styles from './LiveBettingTable.module.scss'

const LiveBettingTable: FC<{ liveBettingList: IBet[] }> = ({
	liveBettingList
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.title}>
					<span className={styles.count}>{liveBettingList.length}</span>
					<span> игроков ставят</span>
				</div>
				<div className={styles.wrap}>
					<div className={styles.list}>
						{!!liveBettingList.length &&
							liveBettingList.map((item, index) => (
								<div key={index} className={styles.item}>
									<div className={styles.user_info}>
										<div className={styles.avatar}>
											<Image
												src='/images/avatars/default.png'
												alt=''
												width={64}
												height={64}
											/>
										</div>
										<div className={styles.username}>{item.username}</div>
									</div>
									<div className={styles.bet}>
										<span className={styles.gold}>{item.bet_amount}</span>
									</div>
									{!item.bet_live && (
										<>
											<div className={styles.multiplier}>
												<span>{item.cashout_multiplier}</span>
											</div>
											<div className={styles.profit}>
												<span className={styles.gold}>{item.profit}</span>
											</div>
										</>
									)}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default memo(LiveBettingTable)
