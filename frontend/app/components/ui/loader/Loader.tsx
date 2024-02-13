import { FC } from 'react'

import { ILoader } from './Loader.interface'
import styles from './Loader.module.scss'

const Loader: FC<ILoader> = ({
	height = 50,
	width = 50,
	weight = 5,
	color = 'rgb(39, 147, 255)'
}) => {
	return (
		<svg
			className={styles.spinner}
			style={{
				width,
				height
			}}
			viewBox='0 0 50 50'
		>
			<circle
				className={styles.path}
				style={{
					stroke: color
				}}
				cx='25'
				cy='25'
				r='20'
				fill='none'
				strokeWidth={weight}
			></circle>
		</svg>
	)
}

export default Loader
