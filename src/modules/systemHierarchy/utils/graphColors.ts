import type { RelationshipType } from '../types/graph'
import { RELATIONSHIP_TYPES } from '../types/graph'

// Node Tailwind classes by systemLevel — matches src/utils/systemLevel.ts
export const SYSTEM_LEVEL_NODE_CLASSES: Record<string, string> = {
    KEY_SYSTEMS:
        'border-orange-600 bg-orange-50 text-orange-900 dark:border-orange-300 dark:bg-orange-950 dark:text-orange-100',
    TECHNOLOGY_UNIT:
        'border-lime-600 bg-lime-50 text-lime-900 dark:border-lime-300 dark:bg-lime-950 dark:text-lime-100',
    SUBSYSTEMS_AND_PARTS:
        'border-sky-600 bg-sky-50 text-sky-900 dark:border-sky-300 dark:bg-sky-950 dark:text-sky-100',
    TRASH: 'border-red-600 bg-red-50 text-red-900 dark:border-red-300 dark:bg-red-950 dark:text-red-100',
}

const DEFAULT_NODE_CLASSES =
    'border-gray-400 bg-gray-50 text-gray-900 dark:border-gray-500 dark:bg-gray-900 dark:text-gray-100'

// Legend dot colors (hex) — used for legend swatches and edge strokes
export const SYSTEM_LEVEL_LEGEND_COLORS: Record<string, string> = {
    KEY_SYSTEMS: '#ea580c',
    TECHNOLOGY_UNIT: '#65a30d',
    SUBSYSTEMS_AND_PARTS: '#0284c7',
    TRASH: '#dc2626',
}

export const SYSTEM_LEVEL_LABELS: Record<string, string> = {
    KEY_SYSTEMS: 'Key Systems',
    TECHNOLOGY_UNIT: 'Technology Unit',
    SUBSYSTEMS_AND_PARTS: 'Subsystems & Parts',
    TRASH: 'Trash',
}

// Edge colors by relationship type
export const RELATIONSHIP_COLORS: Record<RelationshipType, string> = {
    [RELATIONSHIP_TYPES.IS_SPARE_FOR]: '#10b981',
    [RELATIONSHIP_TYPES.IS_COOLED_BY]: '#3b82f6',
    [RELATIONSHIP_TYPES.IS_POWERED_BY]: '#f59e0b',
    [RELATIONSHIP_TYPES.IS_CONTROLLED_BY]: '#ef4444',
    [RELATIONSHIP_TYPES.HAS_SUBSYSTEM]: '#8b5cf6',
}

export const getNodeClasses = (systemLevel: string): string =>
    SYSTEM_LEVEL_NODE_CLASSES[systemLevel] ?? DEFAULT_NODE_CLASSES

export const getEdgeColor = (relationship: string): string =>
    RELATIONSHIP_COLORS[relationship as RelationshipType] ?? '#94a3b8'
