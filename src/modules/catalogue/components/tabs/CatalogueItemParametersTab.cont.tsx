import type { FC } from 'react'

interface Props {
    itemUid: string
    canEdit: boolean
}

export const CatalogueItemParametersTab: FC<Props> = ({ itemUid, canEdit }) => {
    return (
        <div className="p-4 text-sm text-muted-foreground" data-testid="item-parameters-tab">
            Parameters editor for {itemUid} — {canEdit ? 'editable' : 'read-only'} (stub).
        </div>
    )
}
