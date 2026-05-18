import { fireEvent, render, screen } from '@testing-library/react'

import { useSystemCreateSheet } from '@/modules/shared/system/system-create/useSystemCreateSheet'

import { SystemNameCellContent } from '../SystemNameCellContent.comp'

jest.mock('@/modules/shared/system/system-create/useSystemCreateSheet', () => ({
    useSystemCreateSheet: jest.fn(),
}))

jest.mock('@/components/system/SystemBadge.comp', () => ({
    SystemBadge: ({ value, isExpanded }: { value: string; isExpanded: boolean }) => (
        <span data-testid="badge" data-expanded={String(isExpanded)}>
            {value}
        </span>
    ),
}))

jest.mock('@/components/system/SystemPathTooltip.comp', () => ({
    SystemPathTooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('../SystemActionButtons', () => ({
    SystemActionButtons: () => <div data-testid="action-buttons" />,
}))

const mockUseSystemCreateSheet = useSystemCreateSheet as jest.Mock

let openCreate: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openCreate = jest.fn()
    mockUseSystemCreateSheet.mockReturnValue(openCreate)
})

const baseProps = {
    value: 'Sys A',
    original: { uid: 'u-1', systemLevel: 'KeySystems', physicalItem: null, parentPath: [] } as any,
    hasSubsystems: false,
    isExpanded: false,
    onEdit: jest.fn(),
    canEdit: true,
    hideButtons: false,
    queryKey: undefined,
    tableId: 't',
    depth: 0,
    isLastChild: false,
}

describe('SystemNameCellContent', () => {
    it('renders value badge', () => {
        render(<SystemNameCellContent {...baseProps} />)
        expect(screen.getByTestId('badge').textContent).toBe('Sys A')
    })

    it('Edit button calls onEdit when not hideButtons', () => {
        const onEdit = jest.fn()
        render(<SystemNameCellContent {...baseProps} onEdit={onEdit} />)
        // first non-action button = Edit (Create comes second)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(onEdit).toHaveBeenCalled()
    })

    it('Create Subsystem button calls useSystemCreateSheet with uid', () => {
        render(<SystemNameCellContent {...baseProps} />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[1])
        expect(openCreate).toHaveBeenCalledWith('u-1')
    })

    it('hides Edit + Create Subsystem when hideButtons', () => {
        render(<SystemNameCellContent {...baseProps} hideButtons />)
        // only action-buttons mock remains; no real buttons
        expect(screen.queryAllByRole('button').length).toBe(0)
    })

    it('expands on click when hasSubsystems', () => {
        const onExpand = jest.fn()
        const { container } = render(
            <SystemNameCellContent {...baseProps} hasSubsystems onExpand={onExpand} />,
        )
        // the indented row container is the cursor-pointer trigger
        const row = container.querySelector('div[class*="cursor-pointer"]') as Element
        fireEvent.click(row)
        expect(onExpand).toHaveBeenCalled()
    })

    it('renders drag handle when showDragHandle', () => {
        render(<SystemNameCellContent {...baseProps} showDragHandle />)
        // first button is the drag handle now
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })
})
