import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'
import { MetadataSection } from '../sidebar/MetadataSection.comp'

interface PhysicalItemTabProps {
    system: SystemLeaf
}

export const PhysicalItemTabContainer: FC<PhysicalItemTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const physicalItem = system.physicalItem

    if (!physicalItem) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.physicalItem.noItem })}
            </div>
        )
    }

    const items = [
        { label: 'EUN', value: physicalItem.eun ?? null },
        { label: 'Serial Number', value: physicalItem.serialNumber ?? null },
        { label: 'Item Usage', value: physicalItem.itemUsage?.name ?? null },
        { label: 'Condition', value: physicalItem.conditionStatus?.name ?? null },
    ]

    return (
        <div className="p-4">
            <MetadataSection items={items} />
        </div>
    )
}
