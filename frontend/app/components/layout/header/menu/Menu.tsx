import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Menu.module.scss'

const Menu: FC = () => {
	return (
		<div className={styles.menu}>
			{MenuData.map((item, index) => (
				<Link key={index} className={styles.item} href={item.url}>
					<span className={styles.icon}>
						<Image
							src={`/icons/header-menu/${item.image}`}
							alt=''
							width={30}
							height={30}
						/>
					</span>
					<span
						className={styles.name}
						style={item.name === 'Бонусы' ? { color: '#ffc107' } : {}}
					>
						{item.name}
					</span>
				</Link>
			))}
		</div>
	)
}

export default Menu

const MenuData = [
	{ name: 'Игры', url: '/', image: 'games.svg' },
	{ name: 'Турниры', url: '/tournaments', image: 'contest.svg' },
	{ name: 'Ранги', url: '/ranks', image: 'ranks.svg' },
	{ name: 'Отзывы', url: '/opinions', image: 'reviews.svg' },
	{ name: 'Помощь', url: '/help', image: 'help.svg' },
	{ name: 'Бонусы', url: '/bonuses', image: 'ingots.svg' }
]
