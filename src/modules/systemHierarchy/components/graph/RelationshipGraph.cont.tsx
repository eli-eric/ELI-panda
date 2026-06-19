import type { FC } from 'react'

import { useDetailGraphState } from '@/modules/systemHierarchy/hooks/useDetailGraphState'

import { RelationshipGraphCanvas } from './RelationshipGraphCanvas.comp'
import { RelationshipGraphHeader } from './RelationshipGraphHeader.comp'

interface RelationshipGraphContainerProps {
    rootUid: string
}

export const RelationshipGraphContainer: FC<RelationshipGraphContainerProps> = ({ rootUid }) => {
    const { headerProps, canvasProps } = useDetailGraphState(rootUid)

    return (
        <div className="h-full w-full flex flex-col">
            <RelationshipGraphHeader {...headerProps} />
            <RelationshipGraphCanvas {...canvasProps} />
        </div>
    )
}
