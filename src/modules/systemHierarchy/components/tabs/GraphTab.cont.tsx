import type { FC } from 'react'

import type { SystemDetail } from '@/modules/shared/system/system-detail'

import { RelationshipGraphContainer } from '../graph/RelationshipGraph.cont'

interface GraphTabProps {
    system: Pick<SystemDetail, 'uid'>
}

export const GraphTabContainer: FC<GraphTabProps> = ({ system }) => (
    <div className="h-full w-full">
        <RelationshipGraphContainer rootUid={system.uid} />
    </div>
)
