import type { FC } from 'react'

import { RelatedItemsContainer } from '@/modules/catalogueItem/components/related-items/RelatedItems.cont'

interface Props {
    itemUid: string
}

export const CatalogueItemRelatedItemsTab: FC<Props> = ({ itemUid }) => (
    <div className="p-4">
        <RelatedItemsContainer itemUid={itemUid} />
    </div>
)
