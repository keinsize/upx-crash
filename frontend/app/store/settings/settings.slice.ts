import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
	sound: true,
	languageID: 0
}

export const settings = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSound: (state, action: PayloadAction<boolean>) => {
			state.sound = action.payload
		},
		setLanguageID: (state, action: PayloadAction<number>) => {
			state.languageID = action.payload
		}
	}
})
