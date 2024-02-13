import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@/assets/styles/globals.scss'

import { persistor, store } from '@/store/store'

import { AuthProvider } from '@/context/auth/AuthContext'
import { ModalProvider } from '@/context/modal/ModalContext'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<AuthProvider>
						<ModalProvider>
							<Component {...pageProps} />
						</ModalProvider>
					</AuthProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}
