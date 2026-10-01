import { useCallback } from 'react'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { PublicationsFilterSheet } from '../PublicationsFilterSheet.cont'

interface UsePublicationsFilterSheetProps {
    tableId?: string
    enableQueryURL?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
}

/** Opens the publications filter sheet through the dynamic modal system. */
export const usePublicationsFilterSheet = () => {
    const { openModal } = useDynamicModalStore()

    return useCallback(
        ({
            tableId = 'publications',
            enableQueryURL = true,
            side = 'left',
        }: UsePublicationsFilterSheetProps = {}) =>
            openModal('sheet', {
                id: `publication-filters-${tableId}`,
                component: PublicationsFilterSheet,
                props: {
                    title: message.publicationsPage.filters.title,
                    size: 'l',
                    side,
                    tableId,
                    enableQueryURL,
                },
            }),
        [openModal],
    )
}
