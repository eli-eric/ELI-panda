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
        const column = getSystemPathColumn({ parentUid: 'x' })
        renderCell(column, leaf(fullPath))

        expect(screen.getByText('Chamber A')).toBeInTheDocument()
        // Already in the breadcrumbs above the table — repeating it wastes the column.
        expect(screen.queryByText('Facility')).toBeNull()
        expect(screen.queryByText('Beamline X')).toBeNull()
    })

    it('names the selected node when nothing sits in between', () => {
        const column = getSystemPathColumn({ parentUid: 'a' })
        renderCell(column, leaf(fullPath))

        expect(screen.getByText('Chamber A')).toBeInTheDocument()
    })

    it('takes the fallback name from the row, not from the selected system query', () => {
        // useSystemDetail keeps previous data, so mid-navigation it still holds the node
        // we came from. Reading the name off the row's own path cannot go stale that way.
        const column = getSystemPathColumn({ parentUid: 'a' })
        renderCell(column, leaf([...fullPath.slice(0, 2), { uid: 'a', name: 'Renamed A' }]))

        expect(screen.getByText('Renamed A')).toBeInTheDocument()
    })

    it('keeps the absolute path in the tooltip', () => {
        const column = getSystemPathColumn({ parentUid: 'x' })
        renderCell(column, leaf(fullPath))

        expect(screen.getByTestId('tooltip').dataset.content).toBe(
            'Facility → Beamline X → Chamber A',
        )
    })

    it('accessor mirrors what the cell shows, including the fallback', () => {
        const column = getSystemPathColumn({ parentUid: 'x' })
        const accessor = (column as any).accessorFn as (row: SystemLeaf) => string | undefined

        expect(accessor(leaf(fullPath))).toBe('Chamber A')
        expect(accessor(leaf([{ uid: 'x', name: 'Beamline X' }]))).toBe('Beamline X')
    })

    it('accessor is undefined where the cell renders nothing', () => {
        // A root-level system shows an empty cell; carrying a value here would sort and
        // filter it under a name that is nowhere on screen.
        const column = getSystemPathColumn({ parentUid: 'x' })
        const accessor = (column as any).accessorFn as (row: SystemLeaf) => string | undefined

        expect(accessor(leaf(null))).toBeUndefined()
        expect(renderCell(column, leaf(null)).container).toBeEmptyDOMElement()
    })

    it('is not sortable — the server has no sort key for this column', () => {
        // systemPath is absent from the leaves order-by allowlist, so the backend would
        // quietly order by name instead.
        expect(getSystemPathColumn({ parentUid: 'x' }).enableSorting).toBe(false)
    })
})
