import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { settings } from '@/store/settings/settings.slice'

import { useTypedSelector } from './useTypedSelector'

export const useSettings = () => {
	const settingsState = useTypedSelector(state => state.settings)
	const dispatch = useDispatch()

	const settingsActions = useMemo(
		() => bindActionCreators(settings.actions, dispatch),
		[dispatch]
	)

	return { ...settingsState, ...settingsActions }
}
