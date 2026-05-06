import { Fragment, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Heading } from '@/components/layout/Heading'
import { Button } from '@/components/ui/button'
import { Table } from '@/components/ui/table'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { useRelationshipItemUsage } from '@/modules/systemHierarchy/hooks/queries/useRelationshipItemUsage'
import type { RelationshipRow } from '@/modules/systemHierarchy/hooks/queries/useSystemRelationships'
import { useSystemRelationships } from '@/modules/systemHierarchy/hooks/queries/useSystemRelationships'
import {
    getRelationshipDirectionLabel,
    RELATIONSHIP_COLORS,
    RELATIONSHIP_TYPE_RANK,
} from '@/modules/systemHierarchy/types/graph'
import { ROLE } from '@/types/constants/roles'

import { useSystemDetail } from '../../hooks/useSystemDetail'
import { useRelationshipsColumns } from './Relationships.columns'
import type { RelationshipTableRow } from './types'

const FALLBACK_COLOR = '#94a3b8'

export const RelationshipsContainer = () => {
    const { formatMessage: fm } = useIntl()
    const { systemDetail } = useSystemDetail()
    const canEdit = !!usePermission([ROLE.SYSTEM_EDIT])
    const columns = useRelationshipsColumns(canEdit, systemDetail?.uid)

    const isSystemReady = !!systemDetail?.uid
    const { inbound, outbound, relatedUids, isLoading, isError, refetch } = useSystemRelationships(
        systemDetail?.uid,
    )
    const { itemUsageMap } = useRelationshipItemUsage(relatedUids)

    const rows = useMemo<RelationshipTableRow[]>(() => {
        const build = (r: RelationshipRow): RelationshipTableRow => {
            const labelId = getRelationshipDirectionLabel(r.edge.relationship, r.direction)
            return {
                edgeUid: r.edge.uid,
                direction: r.direction,
                relationship: r.edge.relationship,
                directionLabel: labelId ? fm({ id: labelId }) : r.edge.relationship,
                color:
                    RELATIONSHIP_COLORS[
                        r.edge.relationship as keyof typeof RELATIONSHIP_COLORS
                    ] ?? FALLBACK_COLOR,
                nodeUid: r.node.uid,
                nodeName: r.node.name,
                nodeSystemCode: r.node.systemCode,
                nodeSystemTypeName: r.node.systemType?.name ?? null,
                itemUsage: itemUsageMap[r.node.uid],
            }
        }
        return [...inbound.map(build), ...outbound.map(build)].sort((a, b) => {
            if (a.direction !== b.direction) return a.direction === 'inbound' ? -1 : 1
            const rankDelta =
                (RELATIONSHIP_TYPE_RANK[a.relationship] ?? 99) -
                (RELATIONSHIP_TYPE_RANK[b.relationship] ?? 99)
            if (rankDelta !== 0) return rankDelta
            return a.nodeName.localeCompare(b.nodeName)
        })
    }, [inbound, outbound, itemUsageMap, fm])

    if (isError) {
        return (
            <Fragment>
                <Heading
                    customText={fm({ id: message.systemHierarchy.relationships.title })}
                    showBorder={false}
                />
                <div className="space-y-3 px-3">
                    <p className="text-sm text-muted-foreground">
                        {fm({ id: message.common.errors.somethingWentWrong })}
                    </p>
                    <Button size="sm" variant="outline" onClick={() => refetch()}>
                        {fm({ id: message.common.buttons.retry })}
                    </Button>
                </div>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Heading
                customText={fm({ id: message.systemHierarchy.relationships.title })}
                showBorder={false}
            />
            <Table<RelationshipTableRow>
                columns={columns}
                data={!isSystemReady || isLoading ? undefined : rows}
                enablePagination
                emptyMessage={fm({ id: message.systemHierarchy.relationships.noRelationships })}
                className="relative overflow-x-auto mb-0 pb-0"
            />
        </Fragment>
    )
}
