import { Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { message } from '@/i18n/src/messages'

import type { RelationshipGraphEdge } from '../../types/graph'
import type { RelationshipType } from '../../types/graph'
import { RELATIONSHIP_TYPE_LABELS } from '../../types/graph'
import { MetadataSection } from '../sidebar/MetadataSection.comp'

interface EdgeDetailSheetProps {
    edge: RelationshipGraphEdge
    sourceName: string
    targetName: string
    onDelete?: (edgeUid: string) => void
}

export const EdgeDetailSheet: FC<EdgeDetailSheetProps> = ({
    edge,
    sourceName,
    targetName,
    onDelete,
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
            <Separator />
            {onDelete && (
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(edge.uid)}
                    className="w-full"
                >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {fm({ id: message.systemHierarchy.graph.edgeDetail.deleteRelationship })}
                </Button>
            )}
        </div>
    )
}
