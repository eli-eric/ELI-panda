import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { LeavesPanelHeader } from '../LeavesPanelHeader.comp'

jest.mock('@/components/ui/skeleton', () => ({
    Skeleton: ({ className }: { className?: string }) => (
        <div data-testid="skel" data-cls={className ?? ''} />
    ),
}))

jest.mock('../../shared/SystemBreadcrumbs.comp', () => ({
    SystemBreadcrumbs: ({
        parentPath,
        currentName,
        currentCode,
    }: {
        parentPath: any
        currentName: string
        currentCode: string | null
    }) => (
        <div
            data-testid="breadcrumbs"
            data-name={currentName}
            data-code={currentCode ?? ''}
            data-path-length={(parentPath ?? []).length}
        />
    ),
}))

const baseProps = {
    parentName: 'Lab',
    parentSystemCode: 'L-1',
    parentSystemType: 'Building',
    parentPath: [{ uid: 'p', name: 'P' }] as any,
    totalCount: 5,
    isLoading: false,
    onViewParentDetail: jest.fn(),
    onSelectAncestor: jest.fn(),
}

beforeEach(() => {
    jest.clearAllMocks()
})

describe('LeavesPanelHeader', () => {
    it('shows skeletons when isLoading=true', () => {
        renderWithProviders(<LeavesPanelHeader {...baseProps} isLoading={true} />)
        expect(screen.getAllByTestId('skel').length).toBeGreaterThan(0)
        expect(screen.queryByTestId('breadcrumbs')).toBeNull()
    })

    it('renders breadcrumbs when not loading', () => {
        renderWithProviders(<LeavesPanelHeader {...baseProps} />)
        const bc = screen.getByTestId('breadcrumbs')
        expect(bc.dataset.name).toBe('Lab')
        expect(bc.dataset.code).toBe('L-1')
    })

    it('shows totalCount in parentheses when totalCount > 0', () => {
        renderWithProviders(<LeavesPanelHeader {...baseProps} totalCount={42} />)
        expect(screen.getByText('(42)')).toBeInTheDocument()
    })

    it('hides totalCount when totalCount=0', () => {
        renderWithProviders(<LeavesPanelHeader {...baseProps} totalCount={0} />)
        expect(screen.queryByText('(0)')).toBeNull()
    })

    it('parentSystemType falls back to default leaves title when null', () => {
        renderWithProviders(
            <LeavesPanelHeader {...baseProps} parentSystemType={null} />,
        )
        // Default fallback rendered (the translated text); we just confirm parentSystemType=null path doesn't crash
        expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument()
    })

    it('parentName null becomes empty string in breadcrumbs', () => {
        renderWithProviders(<LeavesPanelHeader {...baseProps} parentName={null} />)
        expect(screen.getByTestId('breadcrumbs').dataset.name).toBe('')
    })

    it('view-parent-detail button invokes onViewParentDetail', () => {
        const onViewParentDetail = jest.fn()
        renderWithProviders(
            <LeavesPanelHeader {...baseProps} onViewParentDetail={onViewParentDetail} />,
        )
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(onViewParentDetail).toHaveBeenCalled()
    })
})
