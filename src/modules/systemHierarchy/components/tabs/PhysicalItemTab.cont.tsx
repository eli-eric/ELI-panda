'use client'

import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Separator } from '@/components/ui/separator'
import { message } from '@/i18n/src/messages'
import type { SystemDetail } from '@/modules/shared/system/system-detail'
import {
    CataloguePropertiesSection,
    PhysicalItemFields,
} from '@/modules/shared/system/system-detail'

interface PhysicalItemTabProps {
    system: SystemDetail
}

export const PhysicalItemTabContainer: FC<PhysicalItemTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { physicalItem } = system

    if (!physicalItem) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.physicalItem.noItem })}
            </div>
        )
    }

    return (
        <div className="p-4 space-y-1">
            <PhysicalItemFields systemUid={system.uid} physicalItem={physicalItem} />
            <Separator className="my-2" />
            <CataloguePropertiesSection physicalItemUid={physicalItem.uid} />
        </div>
    )
}
