import { Link2, RotateCcw, Search } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { message } from '@/i18n/src/messages'

import type { RelationshipType } from '../../types/graph'
import { RELATIONSHIP_TYPE_LABELS } from '../../types/graph'
import type { GraphFilterState } from '../../utils/graphFilters'

interface GraphToolbarProps {
    filters: GraphFilterState
    onSearchChange: (value: string) => void
    onSystemLevelChange: (value: string | null) => void
    onSystemTypeChange: (value: string | null) => void
    onRelationshipTypeChange: (value: string | null) => void
    onResetFilters: () => void
    systemTypes: string[]
    systemLevels: string[]
    relationshipTypes: string[]
    selectionMode: boolean
    onToggleSelectionMode: () => void
    children?: ReactNode
}

const ALL = '__all__'

export const GraphToolbar: FC<GraphToolbarProps> = ({
    filters,
    onSearchChange,
    onSystemLevelChange,
    onSystemTypeChange,
    onRelationshipTypeChange,
    onResetFilters,
    systemTypes,
    systemLevels,
    relationshipTypes,
    selectionMode,
    onToggleSelectionMode,
    children,
}) => {
    const { formatMessage: fm } = useIntl()

    return (
        <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-border bg-background shrink-0">
            {/* Search */}
            <div className="relative w-48">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                    placeholder={fm({ id: message.systemHierarchy.graph.searchPlaceholder })}
                    value={filters.search}
                    onChange={e => onSearchChange(e.target.value)}
                    className="pl-8 h-8 text-xs"
                />
            </div>

            {/* System Level filter */}
            <Select
                value={filters.systemLevel ?? ALL}
                onValueChange={v => onSystemLevelChange(v === ALL ? null : v)}
            >
                <SelectTrigger className="w-36 h-8 text-xs">
                    <SelectValue
                        placeholder={fm({
                            id: message.systemHierarchy.graph.filters.allLevels,
                        })}
                    />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL}>
                        {fm({ id: message.systemHierarchy.graph.filters.allLevels })}
                    </SelectItem>
                    {systemLevels.map(level => (
                        <SelectItem key={level} value={level}>
                            {level.replace(/_/g, ' ')}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* System Type filter */}
            {systemTypes.length > 0 && (
                <Select
                    value={filters.systemType ?? ALL}
                    onValueChange={v => onSystemTypeChange(v === ALL ? null : v)}
                >
                    <SelectTrigger className="w-36 h-8 text-xs">
                        <SelectValue
                            placeholder={fm({
                                id: message.systemHierarchy.graph.filters.allTypes,
                            })}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={ALL}>
                            {fm({ id: message.systemHierarchy.graph.filters.allTypes })}
                        </SelectItem>
                        {systemTypes.map(type => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {/* Relationship Type filter */}
            {relationshipTypes.length > 0 && (
                <Select
                    value={filters.relationshipType ?? ALL}
                    onValueChange={v => onRelationshipTypeChange(v === ALL ? null : v)}
                >
                    <SelectTrigger className="w-40 h-8 text-xs">
                        <SelectValue
                            placeholder={fm({
                                id: message.systemHierarchy.graph.filters.allRelationships,
                            })}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={ALL}>
                            {fm({
                                id: message.systemHierarchy.graph.filters.allRelationships,
                            })}
                        </SelectItem>
                        {relationshipTypes.map(type => (
                            <SelectItem key={type} value={type}>
                                {RELATIONSHIP_TYPE_LABELS[type as RelationshipType] ?? type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {/* Create relationship mode */}
            <Button
                variant={selectionMode ? 'default' : 'outline'}
                size="sm"
                onClick={onToggleSelectionMode}
                className="text-xs h-8"
            >
                <Link2 className="h-3.5 w-3.5 mr-1" />
                {fm({ id: message.systemHierarchy.graph.createRelationship.title })}
            </Button>

            {/* Reset */}
            <Button variant="ghost" size="sm" onClick={onResetFilters} className="text-xs h-8">
                <RotateCcw className="h-3.5 w-3.5" />
            </Button>

            <div className="ml-auto flex items-center gap-2">{children}</div>
        </div>
    )
}
