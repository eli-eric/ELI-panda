import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { PublicationsFilterSheet } from '../PublicationsFilterSheet.cont'

interface UsePublicationsFilterSheetProps {
    tableId?: string
    enableQueryURL?: boolean
    side?: 'top' | 'right' | 'bottom' | 'left'
}

export const usePublicationsFilterSheet = () => {
    const { openModal } = useDynamicModalStore()
    const { formatMessage: fm } = useIntl()

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
                    title: fm({ id: message.publication.filters.sheetTitle }),
                    size: 'l',
                    side,
                    tableId,
                    enableQueryURL,
                },
            }),
        [openModal, fm],
    )
}
