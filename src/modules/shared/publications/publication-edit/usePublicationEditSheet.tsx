import { useRef } from 'react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { PublicationEditContainer } from './publication-edit.cont'

export const usePublicationEditSheet = (uid: string) => {
    const { openModal, closeModal } = useDynamicModalStore()
    const modalIdRef = useRef<string | undefined>(undefined)

    const onEditCLick = () => {
        modalIdRef.current = openModal('sheet', {
            id: `publication-edit-${uid}`,
            component: PublicationEditContainer,
            props: { uid, title: 'Edit publication' },
        })
    }

    const onCloseClick = () => {
        if (modalIdRef.current) {
            closeModal(modalIdRef.current)
        }
    }

    return [onEditCLick, onCloseClick] as const
}
