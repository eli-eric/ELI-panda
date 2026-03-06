import type { FC } from 'react'

import { useRelationshipGraphContainerState } from '@/modules/systemHierarchy/hooks/useRelationshipGraphContainerState'

import { RelationshipGraphCanvas } from './RelationshipGraphCanvas.comp'
import { RelationshipGraphHeader } from './RelationshipGraphHeader.comp'

export const RelationshipGraphContainer: FC = () => {
    const { headerProps, canvasProps } = useRelationshipGraphContainerState()

    return (
        <div className="h-full w-full flex flex-col">
            <RelationshipGraphHeader {...headerProps} />
            <RelationshipGraphCanvas {...canvasProps} />
        </div>
    )
}
