import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import AuthForm from '@/ui/authForm/AuthForm'
import ProfileButton from '@/ui/profileButton/profileButton'
import RegisterForm from '@/ui/registerForm/RegisterForm'

import { useAuth } from '@/hooks/useAuth'
import { useModal } from '@/hooks/useModal'

import { formatToCurrency } from '@/utils/formatToCurrency'

import styles from './Profile.module.scss'

const Profile: FC = () => {
	const { setModal } = useModal()
	const { user } = useAuth()

	const showRegister = () => {
		setModal({
			title: 'Регистрация',
			content: <RegisterForm showAuth={showAuth} />
		})
	}

	const showAuth = (data?: { username: string; password: string }) => {
		setModal({
			title: 'Вход',
			content: (
				<AuthForm
					showRegister={showRegister}
					hideForm={() => {
						setModal(null)
					}}
					data={data}
				/>
			)
		})
	}

	return (
		<div className={styles.profile}>
			{user ? (
				<div className={styles.wrapper}>
					<div className={styles.info}>
						<div className={styles.title}>Баланс</div>
						<div className={styles.balance}>
							<div className={styles.value}>
								<span>{formatToCurrency(user.balance)}</span>
							</div>
						</div>
						<div className={styles.buttons}>
							<div className={cn(styles.item, styles.green)}>
								<Image src='/icons/plus.svg' alt='' width={16} height={16} />
								<span>Пополнить</span>
							</div>
							<div className={cn(styles.item, styles.red)}>
								<Image src='/icons/minus.svg' alt='' width={16} height={16} />
								<span>Вывести</span>
							</div>
						</div>
					</div>
					<Link className={styles.profile} href='/profile'>
						<Image
							src='/images/avatars/default.png'
							alt=''
							width={200}
							height={200}
						></Image>
					</Link>
				</div>
			) : (
				<div className={styles.buttons}>
					<ProfileButton
						onClick={showRegister}
						style={{
							borderColor: '#444867',
							color: '#acaacc'
						}}
					>
						<Image
							className={styles.registerIcon}
							src='/icons/profile.svg'
							alt=''
							width={20}
							height={20}
						/>
						<span>Регистрация</span>
					</ProfileButton>
					<ProfileButton
						onClick={() => showAuth()}
						style={{
							background: '#66ddf6',
							borderColor: '#b4f2ff #2fb7ce #2fb7ce',
							boxShadow: 'inset 0 -10px 10px 0 #2fb7ce',
							marginLeft: 10
						}}
					>
						<span className={styles.login}>Войти</span>
					</ProfileButton>
				</div>
			)}
		</div>
	)
}

export default Profile
