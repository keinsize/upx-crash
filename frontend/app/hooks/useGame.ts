import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { game } from '@/store/settings/game.slice'

import { useTypedSelector } from './useTypedSelector'

export const useGame = () => {
	const dispatch = useDispatch()

	const gameState = useTypedSelector(state => state.game)
	const gameActions = useMemo(
		() => bindActionCreators(game.actions, dispatch),
		[dispatch]
	)

	return { ...gameState, ...gameActions }
}
