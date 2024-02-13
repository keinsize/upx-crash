import {
	Dispatch,
	FC,
	PropsWithChildren,
	ReactNode,
	SetStateAction,
	createContext,
	useState
} from 'react'

import styles from './ModalContext.module.scss'

interface IModal {
	title: string
	content: ReactNode
}

export const ModalContext = createContext<{
	modal: IModal | null
	setModal: Dispatch<SetStateAction<IModal | null>>
}>({
	modal: null,
	setModal: () => {}
})

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
	const [modal, setModal] = useState<{
		title: string
		content: ReactNode
	} | null>(null)
	// const [ModalRef, { height }] = useMeasure()
	// const [topPosition, setTopPosition] = useState<number | null>(null)

	return (
		<ModalContext.Provider value={{ modal, setModal }}>
			<main {...(modal && { className: 'overflow-hidden h-screen' })}>
				{children}
			</main>
			{modal && (
				<div
					className={styles.background}
					onClick={() => {
						setModal(null)
					}}
				>
					<div
						onClick={event => {
							event.stopPropagation()
						}}
						className={styles.modal}
						// style={{ top: topPosition + 'px' }}		ref={ModalRef}
					>
						<div className={styles.form}>
							<header className={styles.header}>
								<div className={styles.title}>{modal.title}</div>
								<span
									className={styles.close}
									onClick={() => {
										setModal(null)
									}}
								></span>
							</header>
							{modal.content}
							{(modal.title === 'Вход' || modal.title === 'Регистрация') && (
								<footer className={styles.footer}>
									<div className={styles.text}>
										Авторизуясь на сайте Вы принимаете условия{' '}
										<span className='text-white'>
											пользовательского соглашения
										</span>{' '}
										и{' '}
										<span className='text-white'>
											политики конфиденциальности
										</span>
										, обязуетесь соблюдать их в течение всего периода нахождения
										на сайте и подтверждаете, что уже достигли возраста 18 лет и
										более.
									</div>
								</footer>
							)}
						</div>
					</div>
				</div>
			)}
		</ModalContext.Provider>
	)
}
