import { ChevronDown, Link2, RotateCcw, Search } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { RELATIONSHIP_TYPE_LABELS, RELATIONSHIP_TYPES } from '../../types/graph'
import { RELATIONSHIP_COLORS, SYSTEM_LEVEL_LABELS } from '../../utils/graphColors'
import type { GraphFilterState } from '../../utils/graphFilters'

interface GraphToolbarProps {
    filters: GraphFilterState
    onSearchChange: (value: string) => void
    onToggleSystemLevel: (level: string) => void
    onSystemTypeChange: (value: string | null) => void
    onToggleRelationshipType: (type: string) => void
    onResetFilters: () => void
    systemTypes: string[]
    systemLevels: string[]
    selectionMode: boolean
    onToggleSelectionMode: () => void
    children?: ReactNode
}

const ALL = '__all__'

const FIXED_RELATIONSHIP_TYPES = Object.values(RELATIONSHIP_TYPES)

export const GraphToolbar: FC<GraphToolbarProps> = ({
    filters,
    onSearchChange,
    onToggleSystemLevel,
    onSystemTypeChange,
    onToggleRelationshipType,
    onResetFilters,
    systemTypes,
    systemLevels,
    selectionMode,
    onToggleSelectionMode,
    children,
}) => {
    const { formatMessage: fm } = useIntl()

    const levelCount = filters.systemLevels.length
    const relCount = filters.relationshipTypes.length

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

            {/* System Level multi-select */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                        {fm({ id: message.systemHierarchy.graph.filters.allLevels })}
                        {levelCount > 0 && (
                            <span className="ml-0.5 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">
                                {levelCount}
                            </span>
                        )}
                        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {systemLevels.map(level => (
                        <DropdownMenuCheckboxItem
                            key={level}
                            checked={filters.systemLevels.includes(level)}
                            onCheckedChange={() => onToggleSystemLevel(level)}
                            onSelect={e => e.preventDefault()}
                            className="text-xs"
                        >
                            {SYSTEM_LEVEL_LABELS[level] ?? level.replace(/_/g, ' ')}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

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

            {/* Relationship Type multi-select */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                        {fm({ id: message.systemHierarchy.graph.filters.allRelationships })}
                        {relCount > 0 && (
                            <span className="ml-0.5 rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">
                                {relCount}
                            </span>
                        )}
                        <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {FIXED_RELATIONSHIP_TYPES.map(type => (
                        <DropdownMenuCheckboxItem
                            key={type}
                            checked={filters.relationshipTypes.includes(type)}
                            onCheckedChange={() => onToggleRelationshipType(type)}
                            onSelect={e => e.preventDefault()}
                            className="text-xs"
                        >
                            <span
                                className="inline-block w-3 h-1 rounded-full mr-1.5 shrink-0"
                                style={{
                                    backgroundColor:
                                        RELATIONSHIP_COLORS[type as RelationshipType],
                                }}
                            />
                            {RELATIONSHIP_TYPE_LABELS[type as RelationshipType] ?? type}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

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
