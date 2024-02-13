import { useContext } from 'react'

import { ModalContext } from '@/context/modal/ModalContext'

export const useModal = () => useContext(ModalContext)
