import Image from 'next/image'
import { FC } from 'react'

import { ILogotype } from './Logotype.interface'
import styles from './Logotype.module.scss'

const Logotype: FC<ILogotype> = ({ width }) => {
	return (
		<div
			style={{
				width
			}}
		>
			<div className={styles.container}>
				<Image
					className={styles.logo}
					src='/icons/logo/logo.svg'
					alt=''
					height={50}
					width={126}
				/>
				<Image
					className={styles.cap}
					src='/icons/logo/logo-cap.png'
					alt=''
					height={50}
					width={58}
				/>
			</div>
		</div>
	)
}

export default Logotype
