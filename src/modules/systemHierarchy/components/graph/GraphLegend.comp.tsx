import { ChevronDown, ChevronUp } from 'lucide-react'
import type { FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import { RELATIONSHIP_TYPE_LABELS } from '../../types/graph'
import {
    RELATIONSHIP_COLORS,
    SYSTEM_LEVEL_LABELS,
    SYSTEM_LEVEL_LEGEND_COLORS,
} from '../../utils/graphColors'

export const GraphLegend: FC = () => {
    const { formatMessage: fm } = useIntl()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="absolute bottom-4 right-4 bg-background border border-border rounded-lg shadow-sm z-10 text-xs">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(prev => !prev)}
                className="w-full flex items-center justify-between px-3 py-1.5 h-auto"
            >
                <span className="font-semibold">
                    {fm({ id: message.systemHierarchy.graph.legend.title })}
                </span>
                {collapsed ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                )}
            </Button>
            {!collapsed && (
                <div className="px-3 pb-3 space-y-3">
                    <div>
                        <div className="font-medium text-muted-foreground mb-1">
                            {fm({ id: message.systemHierarchy.graph.legend.nodes })}
                        </div>
                        <div className="space-y-1">
                            {Object.entries(SYSTEM_LEVEL_LEGEND_COLORS).map(([level, color]) => (
                                <div key={level} className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-sm border"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span>{SYSTEM_LEVEL_LABELS[level] ?? level}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="font-medium text-muted-foreground mb-1">
                            {fm({ id: message.systemHierarchy.graph.legend.edges })}
                        </div>
                        <div className="space-y-1">
                            {Object.entries(RELATIONSHIP_COLORS).map(([type, color]) => (
                                <div key={type} className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-0.5"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span>
                                        {RELATIONSHIP_TYPE_LABELS[
                                            type as keyof typeof RELATIONSHIP_TYPE_LABELS
                                        ] ?? type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
