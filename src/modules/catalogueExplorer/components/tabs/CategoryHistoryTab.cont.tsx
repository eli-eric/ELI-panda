import type { FC } from 'react'

import { useCatalogueCategoryHistory } from '../../hooks/queries/useCatalogueCategoryHistory'
import { HistoryList } from './HistoryList.comp'

interface Props {
    categoryUid: string
}

export const CategoryHistoryTab: FC<Props> = ({ categoryUid }) => {
    const { entries, isLoading, error } = useCatalogueCategoryHistory(categoryUid)
    return <HistoryList entries={entries} isLoading={isLoading} error={error} />
}
