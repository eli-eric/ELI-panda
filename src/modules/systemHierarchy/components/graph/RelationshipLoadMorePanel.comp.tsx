import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import type { RelationshipType } from '../../types/graph'
import { RELATIONSHIP_TYPE_LABELS } from '../../types/graph'
import { RELATIONSHIP_COLORS } from '../../utils/graphColors'

export interface RelationshipLoadMoreRow {
    type: string
    shown: number
    total: number
    isLoading: boolean
}

interface RelationshipLoadMorePanelProps {
    hiddenTotal: number
    rows: RelationshipLoadMoreRow[]
    showBackToGraph?: boolean
    onLoadMore: (type: string) => void
    onBackToGraph?: () => void
}

export const RelationshipLoadMorePanel: FC<RelationshipLoadMorePanelProps> = ({
    hiddenTotal,
    rows,
    showBackToGraph = false,
    onLoadMore,
    onBackToGraph,
}) => {
    const { formatMessage: fm } = useIntl()

    if (rows.length === 0) return null

    return (
        <div className="absolute top-4 right-4 bg-background border border-border rounded-lg shadow-sm z-10 w-72">
            <div className="px-3 py-2 border-b border-border space-y-1">
                <div className="text-xs font-semibold">
                    {fm({ id: message.systemHierarchy.graph.loadMore.title })}
                </div>
                <div className="text-[11px] text-muted-foreground">
                    {fm(
                        { id: message.systemHierarchy.graph.loadMore.hidden },
                        { count: hiddenTotal },
                    )}
                </div>
                {showBackToGraph && onBackToGraph && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-1.5 text-[11px]"
                        onClick={onBackToGraph}
                    >
                        {fm({ id: message.systemHierarchy.graph.loadMore.backToGraph })}
                    </Button>
                )}
            </div>
            <div className="p-2 space-y-1.5">
                {rows.map(row => (
                    <div
                        key={row.type}
                        className="flex items-center gap-2 rounded border border-border/60 px-2 py-1.5"
                        data-testid={`load-more-row-${row.type}`}
                    >
                        <span
                            className="inline-block h-1.5 w-3 rounded-full shrink-0"
                            style={{
                                backgroundColor: RELATIONSHIP_COLORS[row.type as RelationshipType],
                            }}
                        />
                        <span className="text-[11px] truncate flex-1" title={row.type}>
                            {RELATIONSHIP_TYPE_LABELS[row.type as RelationshipType] ?? row.type}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                            {fm(
                                { id: message.systemHierarchy.graph.loadMore.shownOfTotal },
                                { shown: row.shown, total: row.total },
                            )}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-6 px-2 text-[10px]"
                            onClick={() => onLoadMore(row.type)}
                            disabled={row.isLoading}
                        >
                            {row.isLoading
                                ? fm({ id: message.systemHierarchy.graph.loadMore.loading })
                                : fm({ id: message.systemHierarchy.graph.loadMore.button })}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
