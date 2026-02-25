import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { RelationshipGraphEdge } from '../../types/graph'
import type { RelationshipType } from '../../types/graph'
import { RELATIONSHIP_TYPE_LABELS } from '../../types/graph'
import { MetadataSection } from '../sidebar/MetadataSection.comp'

interface EdgeDetailSheetProps {
    edge: RelationshipGraphEdge
    sourceName: string
    targetName: string
}

export const EdgeDetailSheet: FC<EdgeDetailSheetProps> = ({
    edge,
    sourceName,
    targetName,
}) => {
    const { formatMessage: fm } = useIntl()

    const items = [
        { label: fm({ id: message.systemHierarchy.graph.edgeDetail.source }), value: sourceName },
        { label: fm({ id: message.systemHierarchy.graph.edgeDetail.target }), value: targetName },
        {
            label: fm({ id: message.systemHierarchy.graph.edgeDetail.type }),
            value:
                RELATIONSHIP_TYPE_LABELS[edge.relationship as RelationshipType] ??
                edge.relationship,
        },
        {
            label: fm({ id: message.systemHierarchy.graph.edgeDetail.description }),
            value: edge.description ?? null,
        },
    ]

    return (
        <div className="p-4 space-y-4">
            <h3 className="text-sm font-semibold">
                {fm({ id: message.systemHierarchy.graph.edgeDetail.title })}
            </h3>
            <MetadataSection items={items} />
        </div>
    )
}
