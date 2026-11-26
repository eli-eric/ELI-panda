import type { FC } from 'react'

import type { SystemDetail } from '@/modules/shared/system/system-detail'
import { SpareRelationsSection } from '@/modules/shared/system/system-detail'

import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'

interface SparePartsTabProps {
    system: SystemDetail
}

export const SparePartsTabContainer: FC<SparePartsTabProps> = ({ system }) => {
    const { selectLeaf } = useHierarchyNavigation()
    return (
        <div className="p-4">
            <SpareRelationsSection
                systemUid={system.uid}
                mode="spareParts"
                onSelectSystem={selectLeaf}
            />
        </div>
    )
}
