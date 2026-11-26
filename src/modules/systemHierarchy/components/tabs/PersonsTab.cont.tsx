'use client'

import type { FC } from 'react'

import type { SystemDetail } from '@/modules/shared/system/system-detail'
import { SystemPeopleFields } from '@/modules/shared/system/system-detail'

interface PersonsTabProps {
    system: SystemDetail
}

export const PersonsTabContainer: FC<PersonsTabProps> = ({ system }) => (
    <div className="p-4 space-y-1">
        <SystemPeopleFields system={system} />
    </div>
)
