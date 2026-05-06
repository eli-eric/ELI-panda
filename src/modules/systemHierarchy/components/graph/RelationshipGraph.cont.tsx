import type { FC } from 'react'

import { useDetailGraphState } from '@/modules/systemHierarchy/hooks/useDetailGraphState'
import { useLeavesGraphState } from '@/modules/systemHierarchy/hooks/useLeavesGraphState'

import { RelationshipGraphCanvas } from './RelationshipGraphCanvas.comp'
import { RelationshipGraphHeader } from './RelationshipGraphHeader.comp'

interface RelationshipGraphContainerProps {
    rootUid?: string | null
}

const LeavesPanelGraph: FC = () => {
    const { headerProps, canvasProps } = useLeavesGraphState()

    return (
        <div className="h-full w-full flex flex-col">
            <RelationshipGraphHeader {...headerProps} />
            <RelationshipGraphCanvas {...canvasProps} />
        </div>
    )
}

const DetailGraph: FC<{ rootUid: string }> = ({ rootUid }) => {
    const { headerProps, canvasProps } = useDetailGraphState(rootUid)

    return (
        <div className="h-full w-full flex flex-col">
            <RelationshipGraphHeader {...headerProps} />
            <RelationshipGraphCanvas {...canvasProps} />
        </div>
    )
}

export const RelationshipGraphContainer: FC<RelationshipGraphContainerProps> = ({ rootUid }) => {
    if (rootUid) return <DetailGraph rootUid={rootUid} />
    return <LeavesPanelGraph />
}
