import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
	betAmount: 100,
	betActive: false,
	autoPayoutMultiplier: 2
}

export const game = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setBetActive: (state, action: PayloadAction<boolean>) => {
			state.betActive = action.payload
		},
		setAutoPayoutMultiplier: (state, action: PayloadAction<number>) => {
			state.autoPayoutMultiplier = action.payload
		},
		setBetAmount: (state, action: PayloadAction<number>) => {
			state.betAmount = action.payload
		}
	}
})
