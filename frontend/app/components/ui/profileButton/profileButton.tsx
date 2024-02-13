import { CSSProperties, FC, MouseEventHandler, PropsWithChildren } from 'react'

import styles from './profileButton.module.scss'

const ProfileButton: FC<
	PropsWithChildren<{
		style: CSSProperties
		onClick: MouseEventHandler<HTMLButtonElement>
	}>
> = ({ children, style, onClick }) => {
	return (
		<button onClick={onClick} className={styles.button} style={{ ...style }}>
			{children}
		</button>
	)
}

export default ProfileButton
