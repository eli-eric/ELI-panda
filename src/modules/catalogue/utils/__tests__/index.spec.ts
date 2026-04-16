import type { CategoryFormType } from '../../components/categoryEdit/types'
import { formatData } from '../index'

const baseCategory = (overrides: Partial<CategoryFormType> = {}): CategoryFormType => ({
    name: 'Category',
    code: 'cat',
    ...overrides,
})

describe('formatData', () => {
    describe('branch: has groups', () => {
        it('preserves all fields and maps groups + properties', () => {
            const input = baseCategory({
                uid: 'c-1',
                groups: [
                    {
                        uid: 'g-1',
                        name: 'Group A',
                        properties: [
                            { name: 'prop1', listOfValues: ['a', 'b'] },
                            { name: 'prop2' },
                        ],
                    },
                ],
            })

            const result = formatData(input, 'parent-x')

            expect(result.name).toBe('Category')
            expect(result.groups).toHaveLength(1)
            expect(result.groups?.[0].properties).toHaveLength(2)
            expect(result.groups?.[0].properties[0].listOfValues).toEqual(['a', 'b'])
            expect(result.groups?.[0].properties[1].listOfValues).toBeUndefined()
        })

        it('uses data.parentUID when present over parentUID argument', () => {
            const input = baseCategory({
                parentUID: 'data-parent',
                groups: [{ name: 'G', properties: [] }],
            })
            const result = formatData(input, 'arg-parent') as { parentPath?: string }
            expect(result.parentPath).toBe('data-parent')
        })

        it('falls back to parentUID argument when data.parentUID absent', () => {
            const input = baseCategory({ groups: [{ name: 'G', properties: [] }] })
            const result = formatData(input, 'arg-parent') as { parentPath?: string }
            expect(result.parentPath).toBe('arg-parent')
        })

        it('maps physicalItemProperties with listOfValues', () => {
            const input = baseCategory({
                groups: [{ name: 'G', properties: [] }],
                physicalItemProperties: [
                    { name: 'phys1', listOfValues: ['x'] },
                    { name: 'phys2' },
                ],
            })
            const result = formatData(input, 'p')
            expect(result.physicalItemProperties?.[0].listOfValues).toEqual(['x'])
            expect(result.physicalItemProperties?.[1].listOfValues).toBeUndefined()
        })
    })

    describe('branch: no groups', () => {
        it('uses minimal shape and falls back to parentUID argument', () => {
            const input = baseCategory({ uid: 'c-1', image: 'img' })
            const result = formatData(input, 'arg-parent') as Record<string, unknown>
            expect(result.name).toBe('Category')
            expect(result.parentUID).toBe('arg-parent')
            expect(result.uid).toBe('c-1')
            expect(result.image).toBe('img')
        })

        it('uses data.parentUID when present', () => {
            const input = baseCategory({ parentUID: 'data-parent' })
            const result = formatData(input, 'arg-parent') as { parentUID?: string }
            expect(result.parentUID).toBe('data-parent')
        })

        it('handles empty groups array same as missing groups', () => {
            const input = baseCategory({ groups: [] })
            const result = formatData(input, 'p') as { parentUID?: string; parentPath?: string }
            expect(result.parentUID).toBe('p')
            expect(result.parentPath).toBeUndefined()
        })

        it('maps physicalItemProperties with listOfValues in no-groups branch', () => {
            const input = baseCategory({
                physicalItemProperties: [
                    { name: 'phys1', listOfValues: ['x', 'y'] },
                    { name: 'phys2' },
                ],
            })
            const result = formatData(input, 'p')
            expect(result.physicalItemProperties?.[0].listOfValues).toEqual(['x', 'y'])
            expect(result.physicalItemProperties?.[1].listOfValues).toBeUndefined()
        })
    })
})
