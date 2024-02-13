import cn from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'

import styles from './RegisterForm.module.scss'
import { userService } from '@/services/user.service'

const RegisterForm: FC<{
	showAuth: (data?: { username: string; password: string }) => void
}> = ({ showAuth }) => {
	const [methodID, setMethodID] = useState(0)

	return (
		<>
			<div className={styles.menu}>
				<div className={styles.wrapper}>
					{RegisterItems.map((item, index) => (
						<button
							key={index}
							className={cn(styles.item, {
								[styles.active]: item.id === methodID
							})}
							onClick={() => setMethodID(item.id)}
						>
							<Image
								src={`/icons/register-methods/${item.icon}`}
								alt=''
								width={26}
								height={26}
							/>
							<span>{item.name}</span>
						</button>
					))}
				</div>
			</div>
			<div className={styles.main}>
				{methodID === 0 ? (
					<>
						<div className={styles.wrapper}>
							<button
								onClick={() =>
									userService.register().then(res => showAuth(res.data))
								}
							>
								Зарегистрироваться
							</button>
						</div>
						<div className={styles.login}>
							<span>Уже есть аккаунт?</span>
							<span onClick={() => showAuth()}>Войти</span>
						</div>
					</>
				) : (
					<div className='text-white font-semibold -tracking-tighter text-center'>
						Временно недоступно
					</div>
				)}
			</div>
		</>
	)
}

export default RegisterForm

const RegisterItems = [
	{ id: 0, name: 'В 1 клик', icon: 'flash.svg' },
	{ id: 1, name: 'Соцсети', icon: 'social.svg' },
	{ id: 2, name: 'E-mail', icon: 'email.svg' },
	{ id: 3, name: 'Телефон', icon: 'phone.svg' }
]
