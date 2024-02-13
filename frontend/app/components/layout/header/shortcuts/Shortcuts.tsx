import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import styles from './Shortcuts.module.scss'

const Shortcuts: FC = () => {
	return (
		<div className={styles.shortcuts}>
			{ShortcutsData.map((item, index) => (
				<Link
					key={index}
					className={cn(styles.shortcut, {
						[styles.cashback]: item.url === '/cashback',
						[styles.ranks]: item.url === '/ranks',
						[styles.tg]: item.url === '/telegram'
					})}
					href={item.url}
				>
					<Image
						src={`/icons/shortcuts/${item.image}`}
						alt=''
						width={20}
						height={20}
					/>
				</Link>
			))}
		</div>
	)
}

export default Shortcuts

const ShortcutsData = [
	{ url: '/ranks', image: 'rank.svg' },
	{ url: '/cashback', image: 'cashback.svg' },
	{ url: '/vk', image: 'vk.svg' },
	{ url: '/telegram', image: 'telegram.svg' },
	{ url: '/twitter', image: 'twitter.svg' },
	{ url: '/instagram', image: 'instagram.svg' }
]
