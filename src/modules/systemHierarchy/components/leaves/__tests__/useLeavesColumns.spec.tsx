import type { ColumnDef } from '@tanstack/react-table'
import { screen } from '@testing-library/react'

import {
    renderHookWithProviders,
    renderWithProviders as render,
} from '@/testutils/wrappers/renderWithProviders'

import type { SystemLeaf } from '../../../types'
import { useLeavesColumns } from '../useLeavesColumns'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children, content }: { children: React.ReactNode; content?: string }) => (
        <div data-testid="tooltip" data-content={content}>
            {children}
        </div>
    ),
}))

const leaf = (parentPath: SystemLeaf['parentPath']): SystemLeaf =>
    ({ uid: 'leaf-1', name: 'Pump', parentPath }) as SystemLeaf

const fullPath = [
    { uid: 'root', name: 'Facility' },
    { uid: 'x', name: 'Beamline X' },
    { uid: 'a', name: 'Chamber A' },
]

const getSystemPathColumn = (args?: Parameters<typeof useLeavesColumns>[0]) => {
    const { result } = renderHookWithProviders(() => useLeavesColumns(args))
    return result.current.columns.find(c => c.id === 'systemPath') as ColumnDef<SystemLeaf, any>
}

const renderCell = (column: ColumnDef<SystemLeaf, any>, row: SystemLeaf) => {
    const cell = column.cell as (ctx: any) => React.ReactElement | null
    return render(<>{cell({ row: { original: row } })}</>)
}

describe('useLeavesColumns — System Path', () => {
    it('shows only the segment below the selected node', () => {
        const column = getSystemPathColumn({ parentUid: 'x', parentName: 'Beamline X' })
        renderCell(column, leaf(fullPath))

        expect(screen.getByText('Chamber A')).toBeInTheDocument()
        // Already in the breadcrumbs above the table — repeating it wastes the column.
        expect(screen.queryByText('Facility')).toBeNull()
        expect(screen.queryByText('Beamline X')).toBeNull()
    })

    it('names the selected node when nothing sits in between', () => {
        const column = getSystemPathColumn({ parentUid: 'a', parentName: 'Chamber A' })
        renderCell(column, leaf(fullPath))

        expect(screen.getByText('Chamber A')).toBeInTheDocument()
    })

    it('renders nothing while the selected node has no name yet', () => {
        // Parent detail still loading: better an empty cell than a placeholder that
        // pops into a different value a moment later.
        const column = getSystemPathColumn({ parentUid: 'a', parentName: undefined })
        const { container } = renderCell(column, leaf(fullPath))

        expect(container).toBeEmptyDOMElement()
    })

    it('keeps the absolute path in the tooltip', () => {
        const column = getSystemPathColumn({ parentUid: 'x', parentName: 'Beamline X' })
        renderCell(column, leaf(fullPath))

        expect(screen.getByTestId('tooltip').dataset.content).toBe(
            'Facility → Beamline X → Chamber A',
        )
    })

    it('accessor mirrors what the cell shows', () => {
        const column = getSystemPathColumn({ parentUid: 'x', parentName: 'Beamline X' })
        const accessor = (column as any).accessorFn as (row: SystemLeaf) => string | undefined

        expect(accessor(leaf(fullPath))).toBe('Chamber A')
        expect(accessor(leaf([{ uid: 'x', name: 'Beamline X' }]))).toBe('Beamline X')
    })

    it('renders nothing when the system has no path at all', () => {
        const column = getSystemPathColumn({ parentUid: 'x', parentName: 'Beamline X' })
        const { container } = renderCell(column, leaf(null))

        expect(container).toBeEmptyDOMElement()
    })
})
