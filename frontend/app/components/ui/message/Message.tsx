import { FC, PropsWithChildren } from 'react'

import styles from './Message.module.scss'

const Message: FC<PropsWithChildren> = ({ children }) => {
	return <div className={styles.message}>{children}</div>
}

export default Message
