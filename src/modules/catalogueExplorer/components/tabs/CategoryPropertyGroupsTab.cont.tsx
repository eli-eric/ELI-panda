import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { CatalogueCategoryPropertyGroup } from '../../types'

interface Props {
    groups: CatalogueCategoryPropertyGroup[]
}

export const CategoryPropertyGroupsTab: FC<Props> = ({ groups }) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="p-4 space-y-3 text-sm">
            {groups.length === 0 ? (
                <div className="text-muted-foreground">
                    {fm({ id: message.catalogue.category.propertyGroups })}
                </div>
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
