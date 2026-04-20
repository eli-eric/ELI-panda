import type { FC } from 'react'

import { useCatalogueItemHistory } from '../../hooks/queries/useCatalogueItemHistory'
import { HistoryList } from './HistoryList.comp'

interface Props {
    itemUid: string
}

export const CatalogueItemHistoryTab: FC<Props> = ({ itemUid }) => {
    const { entries, isLoading, error } = useCatalogueItemHistory(itemUid)
    return <HistoryList entries={entries} isLoading={isLoading} error={error} />
}
