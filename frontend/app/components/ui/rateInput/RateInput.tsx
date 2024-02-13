import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import Image from 'next/image'
import { FC } from 'react'

import styles from './RateInput.module.scss'

const RateInput: FC<{
	name: string
	value: number
	float?: boolean
	setValue: ActionCreatorWithPayload<number>
}> = ({ name, value, float = false, setValue }) => {
	return (
		<div className={styles.item}>
			<span>{name}</span>
			<div>
				<div
					className={styles.minus}
					onClick={() => {
						if (value !== 1)
							if (float) setValue(parseFloat((value - 0.1).toFixed(1)))
							else setValue(value - 1)
					}}
				>
					<Image src='/icons/minus.svg' alt='' width={16} height={16} />
				</div>
				<input
					value={value}
					onChange={({ target }) => {
						if (float && /([0-9]*[.])?[0-9]+/.test(target.value))
							setValue(parseFloat(target.value))
						else if (/[0-9]+/.test(target.value))
							setValue(parseInt(target.value))
					}}
				/>
				<div
					className={styles.plus}
					onClick={() => {
						if (float) setValue(parseFloat((value + 0.1).toFixed(1)))
						else setValue(value + 1)
					}}
				>
					<Image src='/icons/plus.svg' alt='' width={16} height={16} />
				</div>
			</div>
		</div>
	)
}

export default RateInput
