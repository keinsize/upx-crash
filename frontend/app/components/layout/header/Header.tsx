import Link from 'next/link'
import { FC } from 'react'

import Logotype from '@/ui/logotype/Logotype'

import styles from './Header.module.scss'
import Menu from './menu/Menu'
import Profile from './profile/Profile'
import Settings from './settings/Settings'
import Shortcuts from './shortcuts/Shortcuts'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<Link href='/'>
				<Logotype width={168} />
			</Link>
			<div className={styles.content}>
				<Menu />
				<div className={styles.shortcuts_and_settings}>
					<Shortcuts />
					<Settings />
				</div>
				<Profile />
			</div>
		</header>
	)
}

export default Header
