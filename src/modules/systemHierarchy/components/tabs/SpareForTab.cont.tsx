import type { FC } from 'react'

import type { SystemDetail } from '@/modules/shared/system/system-detail'
import { SpareRelationsSection } from '@/modules/shared/system/system-detail'

import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'

interface SpareForTabProps {
    system: SystemDetail
}

export const SpareForTabContainer: FC<SpareForTabProps> = ({ system }) => {
    const { selectLeaf } = useHierarchyNavigation()
    return (
        <div className="p-4">
            <SpareRelationsSection
                systemUid={system.uid}
                mode="spareFor"
                onSelectSystem={selectLeaf}
            />
        </div>
    )
}
