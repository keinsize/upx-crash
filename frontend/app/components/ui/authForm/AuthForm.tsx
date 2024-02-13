import { Input } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useAuth } from '@/hooks/useAuth'

import styles from './AuthForm.module.scss'
import { userService } from '@/services/user.service'

interface IAuthForm {
	username: string
	password: string
}

const AuthForm: FC<{
	showRegister: () => void
	hideForm: () => void
	data?: IAuthForm
}> = ({ showRegister, hideForm, data }) => {
	const { setUser } = useAuth()
	const [passwordVisibility, setPasswordVisibility] = useState(false)
	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors }
	} = useForm<IAuthForm>()

	useEffect(() => {
		if (data) {
			setValue('username', data.username)
			setValue('password', data.password)
		}
	}, [])

	const { mutateAsync } = useMutation(
		(data: IAuthForm) => userService.login(data.username, data.password),
		{
			onSuccess: ({ data }) => {
				console.log(data)

				if (data.error) setError('password', { message: data.error })
				else {
					hideForm()
					// queryClient.invalidateQueries(['userData'])
					setUser(data)
				}
			}
		}
	)

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutateAsync(data)
	}

	return (
		<div className={styles.main}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.form}>
					<div className={styles.inputForm}>
						<label className={styles.placeholder} htmlFor='username'>
							Пользователь
						</label>
						<Input
							id='username'
							type='text'
							disableUnderline={true}
							sx={{
								width: '100%'
							}}
							{...register('username', {
								validate: value => {
									return (
										!!value.trim() || 'Данное поле обязательно для заполнения.'
									)
								}
							})}
						/>
						{errors.username && (
							<label className={styles.error} htmlFor='username'>
								{errors.username.message}
							</label>
						)}
					</div>
					<div className={styles.inputForm}>
						<label className={styles.placeholder} htmlFor='password'>
							Пароль
						</label>
						<Input
							id='password'
							disableUnderline={true}
							type={passwordVisibility ? 'text' : 'password'}
							sx={{
								width: '100%'
							}}
							{...register('password', {
								validate: value => {
									return (
										!!value.trim() || 'Данное поле обязательно для заполнения.'
									)
								},
								minLength: {
									value: 6,
									message:
										'Количество символов в поле Пароль должно быть не менее 6.'
								}
							})}
						/>
						{errors.password && (
							<label className={styles.error} htmlFor='password'>
								{errors.password.message}
							</label>
						)}
						<div className={styles['wrapper-note']}>
							<div
								className={styles.note}
								onClick={() => {
									setPasswordVisibility(!passwordVisibility)
								}}
							>
								<Image src='/icons/eye.svg' alt='' width={14} height={12} />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.wrapper}>
					<button className={styles.login}>Войти</button>
				</div>
			</form>
			<div className={styles.wrapper}>
				<button className={styles.create} onClick={showRegister}>
					Создать аккаунт
				</button>
			</div>
		</div>
	)
}

export default AuthForm
