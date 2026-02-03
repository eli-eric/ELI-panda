import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'
import { MetadataSection } from '../sidebar/MetadataSection.comp'

interface PersonsTabProps {
    system: SystemLeaf
}

export const PersonsTabContainer: FC<PersonsTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()

    const items = [
        {
            label: fm({ id: message.systemHierarchy.persons.responsible }),
            value: system.responsible?.name ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.persons.owner }),
            value: system.owner?.name ?? null,
        },
    ]

    const hasPersons = items.some(item => item.value)

    if (!hasPersons) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.persons.noPersons })}
            </div>
        )
    }

    return (
        <div className="p-4">
            <MetadataSection items={items} />
        </div>
    )
}
