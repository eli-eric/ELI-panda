import type { FC } from 'react'

import { CatalogueStatisticsContainer } from '@/modules/catalogueItem/components/statistics/CatalogueStatistics.cont'

interface Props {
    itemUid: string
}

export const CatalogueItemStatisticsTab: FC<Props> = ({ itemUid }) => (
    <CatalogueStatisticsContainer catalogueItemUid={itemUid} variant="page" />
)
