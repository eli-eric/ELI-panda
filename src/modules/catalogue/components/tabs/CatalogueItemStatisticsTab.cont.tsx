import type { FC } from 'react'

interface Props {
    itemUid: string
}

export const CatalogueItemStatisticsTab: FC<Props> = ({ itemUid }) => {
    return (
        <div className="p-4 text-sm text-muted-foreground">
            Statistics for {itemUid} — integration with CatalogueStatistics pending.
        </div>
    )
}
