import { render } from '@testing-library/react'

import { SystemsComponent } from '../Systems.comp'

let lastSystemsTableProps: any = null

jest.mock('../components/table/Systems.table', () => ({
    SystemsTable: (props: any) => {
        lastSystemsTableProps = props
        return <div data-testid="systems-table" />
    },
}))

jest.mock('@/components/layout/TableLayoutContainer', () => ({
    TableLayoutContainer: ({
        children,
        className,
    }: {
        children: React.ReactNode
        className?: string
    }) => <div data-testid="layout" data-class={className ?? ''}>{children}</div>,
}))

beforeEach(() => {
    lastSystemsTableProps = null
})

describe('SystemsComponent', () => {
    it('passes default tableId=systems + settings', () => {
        render(<SystemsComponent />)
        expect(lastSystemsTableProps.tableId).toBe('systems')
        expect(lastSystemsTableProps.settings.enableSorting).toBe(true)
        expect(lastSystemsTableProps.settings.manualFiltering).toBe(true)
        expect(lastSystemsTableProps.settings.enableQueryURL).toBe(true)
    })

    it('honors tableId + enableQueryURL overrides', () => {
        render(<SystemsComponent tableId="inventory" enableQueryURL={false} />)
        expect(lastSystemsTableProps.tableId).toBe('inventory')
        expect(lastSystemsTableProps.settings.enableQueryURL).toBe(false)
    })

    it('getRowProps applies font-bold when physicalItem present', () => {
        render(<SystemsComponent />)
        const props = lastSystemsTableProps.getRowProps({
            original: { physicalItem: { uid: 'p-1' }, statistics: {} },
        })
        expect(props.className).toContain('font-bold')
    })

    it('getRowProps applies red-bold when sp_coverage < 1', () => {
        render(<SystemsComponent />)
        const props = lastSystemsTableProps.getRowProps({
            original: { physicalItem: null, statistics: { sp_coverage: 0.5 } },
        })
        expect(props.className).toContain('text-red-500')
    })

    it('forwards dropsettings to getRowProps', () => {
        const dropsettings = { accept: 'x', onDropHandler: jest.fn() }
        render(<SystemsComponent dropsettings={dropsettings} />)
        expect(
            lastSystemsTableProps.getRowProps({
                original: { physicalItem: null, statistics: {} },
            }).dropsettings,
        ).toBe(dropsettings)
    })
})
