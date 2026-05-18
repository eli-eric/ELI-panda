import { RELATIONSHIP_COLORS } from '../../types/graph'
import {
    getEdgeColor,
    getNodeClasses,
    SYSTEM_LEVEL_LABELS,
    SYSTEM_LEVEL_LEGEND_COLORS,
    SYSTEM_LEVEL_NODE_CLASSES,
} from '../graphColors'

describe('getNodeClasses', () => {
    it('returns specific classes for known systemLevel', () => {
        expect(getNodeClasses('KEY_SYSTEMS')).toBe(SYSTEM_LEVEL_NODE_CLASSES.KEY_SYSTEMS)
        expect(getNodeClasses('TECHNOLOGY_UNIT')).toBe(SYSTEM_LEVEL_NODE_CLASSES.TECHNOLOGY_UNIT)
        expect(getNodeClasses('SUBSYSTEMS_AND_PARTS')).toBe(
            SYSTEM_LEVEL_NODE_CLASSES.SUBSYSTEMS_AND_PARTS,
        )
        expect(getNodeClasses('TRASH')).toBe(SYSTEM_LEVEL_NODE_CLASSES.TRASH)
    })

    it('falls back to default gray classes for unknown systemLevel', () => {
        expect(getNodeClasses('NOPE')).toContain('border-gray-400')
    })
})

describe('getEdgeColor', () => {
    it('returns hex color from RELATIONSHIP_COLORS by type', () => {
        const known = Object.keys(RELATIONSHIP_COLORS)[0]
        expect(getEdgeColor(known)).toBe(
            RELATIONSHIP_COLORS[known as keyof typeof RELATIONSHIP_COLORS],
        )
    })

    it('falls back to default slate color for unknown relationship', () => {
        expect(getEdgeColor('UNKNOWN_REL')).toBe('#94a3b8')
    })
})

describe('SYSTEM_LEVEL_LEGEND_COLORS + LABELS', () => {
    it('has hex codes for all 4 levels', () => {
        for (const lvl of ['KEY_SYSTEMS', 'TECHNOLOGY_UNIT', 'SUBSYSTEMS_AND_PARTS', 'TRASH']) {
            expect(SYSTEM_LEVEL_LEGEND_COLORS[lvl]).toMatch(/^#[0-9a-f]{6}$/i)
        }
    })

    it('has human labels for all 4 levels', () => {
        expect(SYSTEM_LEVEL_LABELS.KEY_SYSTEMS).toBe('Key Systems')
        expect(SYSTEM_LEVEL_LABELS.TECHNOLOGY_UNIT).toBe('Technology Unit')
        expect(SYSTEM_LEVEL_LABELS.SUBSYSTEMS_AND_PARTS).toBe('Subsystems & Parts')
        expect(SYSTEM_LEVEL_LABELS.TRASH).toBe('Trash')
    })
})
