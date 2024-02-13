import { useQuery } from '@tanstack/react-query'
import {
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useEffect,
	useState
} from 'react'

import Loader from '@/ui/loader/Loader'
import Message from '@/ui/message/Message'

import { IUser } from '@/types/user.interface'

import { userService } from '@/services/user.service'

export type TypeUserState = IUser | null | undefined

export const AuthContext = createContext<{
	user: TypeUserState
	setUser: Dispatch<SetStateAction<TypeUserState>>
}>({
	user: undefined,
	setUser: () => {}
})

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>(undefined)
	const [error, setError] = useState<null | string>(null)

	useQuery(['userData'], () => userService.getUser(), {
		refetchOnWindowFocus: false,
		retry: 1,
		onSuccess: res => {
			if (!res.data.error) setUser(res.data)
			else setUser(null)
		},
		onError() {
			setError('Возникла ошибка на стороне сервера. Попробуйте позже.')
		}
	})

	useEffect(() => {
		if (error) var timeout = setTimeout(() => setError(null), 5000)
		return () => {
			clearTimeout(timeout)
		}
	}, [error])

	return (
		<>
			{user !== undefined ? (
				<AuthContext.Provider value={{ user, setUser }}>
					{children}
				</AuthContext.Provider>
			) : (
				<>
					<div className='h-screen w-screen flex justify-center items-center'>
						{!error ? (
							<Loader />
						) : (
							<Message>
								<div className='text-center font-bold text-lg mb-2  leading-[18px]'>
									Ошибка
								</div>
								<div className='text-base leading-5'>{error}</div>
							</Message>
						)}
					</div>
				</>
			)}
		</>
	)
}
