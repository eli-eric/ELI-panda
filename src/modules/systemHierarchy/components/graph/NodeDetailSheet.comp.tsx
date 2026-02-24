import { ExternalLink } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { message } from '@/i18n/src/messages'

import type { RelationshipGraphNode } from '../../types/graph'
import { MetadataSection } from '../sidebar/MetadataSection.comp'

interface NodeDetailSheetProps {
    node: RelationshipGraphNode
    onViewFullDetail?: () => void
}

export const NodeDetailSheet: FC<NodeDetailSheetProps> = ({ node, onViewFullDetail }) => {
    const { formatMessage: fm } = useIntl()

    const items = [
        { label: fm({ id: message.systemHierarchy.fields.name }), value: node.name },
        {
            label: fm({ id: message.systemHierarchy.fields.systemCode }),
            value: node.systemCode ?? null,
        },
        {
            label: fm({ id: message.systemHierarchy.fields.systemLevel }),
            value: node.systemLevel,
        },
        {
            label: fm({ id: message.systemHierarchy.fields.systemType }),
            value: node.systemType?.name ?? null,
        },
    ]

    return (
        <div className="p-4 space-y-4">
            <h3 className="text-sm font-semibold">
                {fm({ id: message.systemHierarchy.graph.nodeDetail.title })}
            </h3>
            <MetadataSection items={items} />
            <Separator />
            {onViewFullDetail && (
                <Button variant="outline" size="sm" onClick={onViewFullDetail} className="w-full">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {fm({ id: message.systemHierarchy.graph.nodeDetail.viewFullDetail })}
                </Button>
            )}
        </div>
    )
}
