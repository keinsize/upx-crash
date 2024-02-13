import Image from 'next/image'
import { FC } from 'react'

import { useSettings } from '@/hooks/useSettings'

import styles from './Settings.module.scss'

const Settings: FC = () => {
	const { languageID, setLanguageID, sound, setSound } = useSettings()

	return (
		<div className={styles.settings}>
			<div className={styles.language}>
				<div className={styles.current}>
					<Image
						className={styles.flag}
						src={`/icons/languages/${LanguageData[languageID].icon}`}
						alt=''
						width={19}
						height={19}
					/>
					<span>{LanguageData[languageID].shortName}</span>
					<Image
						className={styles.arrow}
						src='/icons/down-arrow.svg'
						alt=''
						width={8}
						height={8}
					/>
				</div>
				<div className={styles.dropdown}>
					<div className={styles.content}>
						{LanguageData.map((item, index) => (
							<button
								key={index}
								className={styles.item}
								onClick={() => {
									setLanguageID(item.id)
								}}
							>
								<Image
									className={styles.flag}
									src={`/icons/languages/${item.icon}`}
									alt=''
									width={19}
									height={19}
								/>
								<span>{item.name}</span>
							</button>
						))}
					</div>
				</div>
			</div>
			<div
				className={styles.sound}
				onClick={() => {
					setSound(!sound)
				}}
			>
				<Image
					src={
						sound ? '/icons/sound/sound-on.svg' : '/icons/sound/sound-off.svg'
					}
					alt=''
					width={20}
					height={20}
				/>
			</div>
		</div>
	)
}

export default Settings

const LanguageData = [
	{ id: 0, shortName: 'RU', name: 'Русский', icon: 'ru.svg' },
	{ id: 1, shortName: 'EN', name: 'English', icon: 'en.svg' }
]
