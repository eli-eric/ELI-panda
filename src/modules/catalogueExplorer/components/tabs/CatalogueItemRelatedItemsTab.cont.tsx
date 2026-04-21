import type { FC } from 'react'

interface Props {
    itemUid: string
}

export const CatalogueItemRelatedItemsTab: FC<Props> = ({ itemUid }) => {
    return (
        <div className="p-4 text-sm text-muted-foreground">
            Related items for {itemUid} — pending refactor of existing RelatedItems container.
        </div>
    )
}
