import type { FC } from 'react'

import type { SystemLeaf } from '../../types'
import { RelationshipGraphContainer } from '../graph/RelationshipGraph.cont'

interface GraphTabProps {
    system: SystemLeaf
}

export const GraphTabContainer: FC<GraphTabProps> = ({ system }) => (
    <div className="h-full w-full">
        <RelationshipGraphContainer rootUid={system.uid} />
    </div>
)
