import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import styles from './Sidebar.module.scss'

const Sidebar: FC = () => {
	const pathname = usePathname()
	const [top, setTop] = useState(120)

	const changeTopPosition = () => {
		setTop(window.scrollY < 120 ? 120 - window.scrollY : 0)
	}

	useEffect(() => {
		window.addEventListener('scroll', changeTopPosition)
		return () => {
			window.removeEventListener('scroll', changeTopPosition)
		}
	}, [])

	return (
		<div className={styles.sidebar} style={{ top }}>
			<div className={styles.wrapper}>
				{SidebarItems.map((item, index) => (
					<div key={index} className={styles.item}>
						<Link
							className={cn(styles.link, {
								[styles.active]: item.url === pathname
							})}
							href={item.url}
						>
							<span className={styles.icon}>
								<Image
									src={`/icons/games/${item.icon}`}
									alt=''
									width={48}
									height={48}
								/>
							</span>
							<span className={styles.name}>{item.name}</span>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default Sidebar

const SidebarItems = [
	{
		id: 0,
		name: 'Краш',
		url: '/games/crash',
		icon: 'crash.svg'
	},
	{
		id: 1,
		name: 'Рулетка',
		url: '/games/roulette',
		icon: 'roulette.svg'
	},
	{ id: 2, name: 'Кейсы', url: '/games/cases', icon: 'cases.svg' },
	{
		id: 3,
		name: 'Лотерея',
		url: '/games/lottery',
		icon: 'lottery.svg'
	},
	{
		id: 4,
		name: 'Игра в кости',
		url: '/games/dice',
		icon: 'dice.svg'
	},
	{ id: 5, name: 'Кено', url: '/games/keno', icon: 'keno.svg' },
	{ id: 6, name: 'ХайЛоу', url: '/games/hilo', icon: 'hilo.svg' },
	{ id: 7, name: 'Минёр', url: '/games/miner', icon: 'miner.svg' },
	{ id: 8, name: 'Лесенка', url: '/games/stair', icon: 'stair.svg' },
	{
		id: 9,
		name: 'Монетка',
		url: '/games/coinflip',
		icon: 'coinflip.svg'
	},
	{
		id: 10,
		name: 'Карточки',
		url: '/games/skycard',
		icon: 'skycard.svg'
	},
	{
		id: 11,
		name: 'Слоты',
		url: '/games/casino',
		icon: 'casino.svg'
	},
	{
		id: 12,
		name: 'Плинко',
		url: '/games/plinko',
		icon: 'plinko.svg'
	}
]
