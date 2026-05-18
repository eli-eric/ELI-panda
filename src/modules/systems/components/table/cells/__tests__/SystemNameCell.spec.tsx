import { render, screen } from '@testing-library/react'

import { useSystemCellActions } from '../../../../hooks/useSystemCellActions'
import { SystemNameCell } from '../SystemNameCell'

jest.mock('../../../../hooks/useSystemCellActions', () => ({
    useSystemCellActions: jest.fn(),
}))

let lastContentProps: any = null

jest.mock('../SystemNameCellContent.comp', () => ({
    SystemNameCellContent: (props: any) => {
        lastContentProps = props
        return <div data-testid="content" />
    },
}))

jest.mock('../SystemNameCellDraggable.comp', () => ({
    SystemNameCellDraggable: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="draggable-wrap">{children}</div>
    ),
}))

const mockUseActions = useSystemCellActions as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastContentProps = null
})

const baseCellProps = {
    row: {
        original: { uid: 'u-1', sparesIn: 1, sparesOut: 2 } as any,
        getParentRow: () => null,
        getIsExpanded: () => false,
        depth: 2,
        id: 'r-1',
    },
    getValue: () => 'My System',
    tableId: 't-1',
} as any

describe('SystemNameCell', () => {
    it('renders SystemNameCellContent with derived props (no DnD)', () => {
        mockUseActions.mockReturnValue({
            handleExpand: jest.fn(),
            handleOpenEdit: jest.fn(),
            hasSubsystems: true,
        })
        render(<SystemNameCell {...baseCellProps} />)
        expect(screen.queryByTestId('draggable-wrap')).toBeNull()
        expect(screen.getByTestId('content')).toBeInTheDocument()
        expect(lastContentProps.value).toBe('My System')
        expect(lastContentProps.hasSubsystems).toBe(true)
        expect(lastContentProps.depth).toBe(2)
        expect(lastContentProps.sparesIn).toBe(1)
        expect(lastContentProps.sparesOut).toBe(2)
    })

    it('wraps in Draggable when enableDragAndDrop=true', () => {
        mockUseActions.mockReturnValue({
            handleExpand: jest.fn(),
            handleOpenEdit: jest.fn(),
            hasSubsystems: false,
        })
        render(<SystemNameCell {...baseCellProps} enableDragAndDrop />)
        expect(screen.getByTestId('draggable-wrap')).toBeInTheDocument()
        expect(lastContentProps.showDragHandle).toBe(true)
    })

    it('defaults canEdit=true / hideButtons=false when not provided', () => {
        mockUseActions.mockReturnValue({
            handleExpand: jest.fn(),
            handleOpenEdit: jest.fn(),
            hasSubsystems: false,
        })
        render(<SystemNameCell {...baseCellProps} />)
        expect(lastContentProps.canEdit).toBe(true)
        expect(lastContentProps.hideButtons).toBe(false)
    })

    it('computes isLastChild from parent subRows.at(-1)', () => {
        mockUseActions.mockReturnValue({
            handleExpand: jest.fn(),
            handleOpenEdit: jest.fn(),
            hasSubsystems: false,
        })
        const parentRow = {
            subRows: [{ id: 'r-0' }, { id: 'r-1' }],
        }
        render(
            <SystemNameCell
                {...baseCellProps}
                row={{
                    ...baseCellProps.row,
                    getParentRow: () => parentRow,
                }}
            />,
        )
        expect(lastContentProps.isLastChild).toBe(true)
    })
})
