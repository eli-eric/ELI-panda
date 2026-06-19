import type { FC } from 'react'

import { CatalogueOrders } from '@/modules/catalogueItem/components/orders/CatalogueOrders'

interface Props {
    itemUid: string
}

export const CatalogueItemOrdersTab: FC<Props> = ({ itemUid }) => (
    <div className="p-4">
        <CatalogueOrders itemUid={itemUid} />
    </div>
)
