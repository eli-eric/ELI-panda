import type { FC } from 'react'

import type { CatalogueCategoryProperty } from '../../types'

interface Props {
    categoryUid: string
    properties: CatalogueCategoryProperty[]
    canEdit: boolean
}

export const CategoryPhysicalItemPropertiesTab: FC<Props> = ({
    categoryUid,
    properties,
    canEdit,
}) => {
    void categoryUid
    void canEdit
    return (
        <div className="p-4 space-y-2 text-sm">
            {properties.length === 0 ? (
                <div className="text-muted-foreground">No physical item properties yet.</div>
            ) : (
                <ul className="space-y-1">
                    {properties.map(p => (
                        <li
                            key={p.uid}
                            className="flex items-center justify-between border border-border rounded px-2 py-1"
                        >
                            <span>{p.name}</span>
                            <span className="text-xs text-muted-foreground">
                                {p.type?.name ?? '—'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
