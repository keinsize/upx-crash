import { FC, memo } from 'react'

import styles from './History.module.scss'

const History: FC<{ crashHistory: number[] }> = ({ crashHistory }) => {
	return (
		<div className={styles.container}>
			<div className={styles.block}>
				<div className={styles.title}>История</div>
				<div className={styles.list}>
					{crashHistory.map((item, index) => (
						<div
							key={index}
							style={{
								color:
									item > 2.5
										? 'rgb(7, 175, 246)'
										: item < 1.1
										? 'rgb(255, 54, 54)'
										: '#fff'
							}}
							className={styles.item}
						>
							<span>{item} X</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default memo(History)
