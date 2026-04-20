import type { FC } from 'react'

interface Props {
    itemUid: string
}

export const CatalogueItemAttachmentsTab: FC<Props> = ({ itemUid }) => {
    return (
        <div className="p-4 text-sm text-muted-foreground">
            Attachments for {itemUid} — FileManager integration pending.
        </div>
    )
}
