import type { FC } from 'react'

import type { GraphLayoutMode } from '../../types/graph'
import type { GraphFilterState } from '../../utils/graphFilters'
import { GraphToolbar } from './GraphToolbar.comp'
import { LayoutSwitcher } from './LayoutSwitcher.comp'

interface RelationshipGraphHeaderProps {
    filters: GraphFilterState
    systemTypes: string[]
    systemLevels: string[]
    layoutMode: GraphLayoutMode
    onLayoutChange: (mode: GraphLayoutMode) => void
    onSearchChange: (value: string) => void
    onToggleSystemLevel: (level: string) => void
    onSystemTypeChange: (value: string | null) => void
    onToggleRelationshipType: (type: string) => void
    onResetFilters: () => void
}

export const RelationshipGraphHeader: FC<RelationshipGraphHeaderProps> = ({
    filters,
    systemTypes,
    systemLevels,
    layoutMode,
    onLayoutChange,
    onSearchChange,
    onToggleSystemLevel,
    onSystemTypeChange,
    onToggleRelationshipType,
    onResetFilters,
}) => (
    <GraphToolbar
        filters={filters}
        onSearchChange={onSearchChange}
        onToggleSystemLevel={onToggleSystemLevel}
        onSystemTypeChange={onSystemTypeChange}
        onToggleRelationshipType={onToggleRelationshipType}
        onResetFilters={onResetFilters}
        systemTypes={systemTypes}
        systemLevels={systemLevels}
    >
        <LayoutSwitcher activeLayout={layoutMode} onLayoutChange={onLayoutChange} />
    </GraphToolbar>
)
