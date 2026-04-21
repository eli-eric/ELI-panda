import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { CatalogueCategoryProperty } from '../../types'

interface Props {
    properties: CatalogueCategoryProperty[]
}

export const CategoryPhysicalItemPropertiesTab: FC<Props> = ({ properties }) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="p-4 space-y-2 text-sm">
            {properties.length === 0 ? (
                <div className="text-muted-foreground">
                    {fm({ id: message.catalogue.category.physicalProperties })}
                </div>
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
