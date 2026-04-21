import type { FC } from 'react'

import type { CatalogueCategoryPropertyGroup } from '../../types'

interface Props {
    categoryUid: string
    groups: CatalogueCategoryPropertyGroup[]
    canEdit: boolean
}

export const CategoryPropertyGroupsTab: FC<Props> = ({ categoryUid, groups, canEdit }) => {
    void categoryUid
    void canEdit
    return (
        <div className="p-4 space-y-3 text-sm">
            {groups.length === 0 ? (
                <div className="text-muted-foreground">No property groups yet.</div>
            ) : (
                groups.map(group => (
                    <div key={group.uid} className="border border-border rounded p-3">
                        <div className="font-medium mb-2">{group.name}</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                            {group.properties.map(p => (
                                <li key={p.uid}>
                                    {p.name}
                                    {p.unit?.name ? ` (${p.unit.name})` : ''}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    )
}
