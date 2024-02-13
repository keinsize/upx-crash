import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import Logotype from '@/ui/logotype/Logotype'

import styles from './Footer.module.scss'

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<Link className={styles.logo} href='/'>
				<Logotype width={97} />
			</Link>
			<div className={styles.methods}>
				<div className={styles.title}>Мы принимаем</div>
				<div className={styles.icons}>
					{PayMethodsData.map((item, index) => (
						<Image
							key={index}
							className={styles.icon}
							src={`/icons/payments/${item.icon}`}
							alt={item.name}
							height={32}
							width={32}
						/>
					))}
				</div>
			</div>
		</footer>
	)
}

export default Footer

const PayMethodsData = [
	{ id: 0, name: 'qiwi', icon: 'qiwi.svg' },
	{ id: 1, name: 'ethereum', icon: 'ethereum.svg' },
	{ id: 2, name: 'yandex', icon: 'yandex.svg' },
	{ id: 3, name: 'steam', icon: 'steam.svg' },
	{ id: 4, name: 'perfectmoney', icon: 'perfectmoney.svg' },
	{ id: 5, name: 'alfa-bank', icon: 'alfa-bank.svg' },
	{ id: 6, name: 'master', icon: 'master.svg' }
]
