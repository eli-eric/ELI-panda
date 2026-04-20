import type { FC } from 'react'

interface Props {
    itemUid: string
}

export const CatalogueItemOrdersTab: FC<Props> = ({ itemUid }) => {
    return (
        <div className="p-4 text-sm text-muted-foreground">
            Orders for {itemUid} — integration with existing CatalogueOrders pending.
        </div>
    )
}
