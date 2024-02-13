import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { game } from './settings/game.slice'
import { settings } from './settings/settings.slice'

const persistConfig = {
	key: 'crash-up-x',
	storage
}

const rootReducer = combineReducers({
	settings: settings.reducer,
	game: game.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>

// const createNoopStorage = () => {
// // 	return {
// // 		getItem(_key: string) {
// // 			return Promise.resolve(null)
// // 		},
// // 		setItem(_key: string, value: string) {
// // 			return Promise.resolve(value)
// // 		},
// // 		removeItem(_key: string) {
// // 			return Promise.resolve()
// // 		}
// // 	}
// // }

// const storage =
// 	typeof window !== 'undefined'
// 		? createWebStorage('local')
// 		: createNoopStorage()
