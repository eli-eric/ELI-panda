'use client'

import type { FC } from 'react'

import type { SystemDetail } from '@/modules/shared/system/system-detail'
import {
    SystemClassificationFields,
    SystemDescriptionField,
    SystemNameField,
} from '@/modules/shared/system/system-detail'

interface DetailTabProps {
    system: SystemDetail
}

export const DetailTabContainer: FC<DetailTabProps> = ({ system }) => (
    <div className="p-4 space-y-1">
        <SystemNameField system={system} />
        <SystemClassificationFields system={system} />
        <SystemDescriptionField system={system} />
    </div>
)
