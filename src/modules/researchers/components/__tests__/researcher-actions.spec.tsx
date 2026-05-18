import { fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import { useAccessControl } from '@/hooks/useAccessControl'
import useWarningModal from '@/hooks/useWarningModal'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useResearcherDelete } from '../../hooks/useResearcherDelete'
import { ResearcherActionsCell } from '../researcher-actions.comp'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuItem: ({
        onClick,
        children,
    }: {
        onClick?: () => void
        children: ReactNode
    }) => (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    ),
}))

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../hooks/useResearcherDelete', () => ({
    useResearcherDelete: jest.fn(),
}))

const mockUseAccessControl = useAccessControl as jest.Mock
const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock
const mockUseResearcherDelete = useResearcherDelete as jest.Mock

let openModal: jest.Mock
let deleteResearcher: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn()
    deleteResearcher = jest.fn()
    mockUseAccessControl.mockReturnValue(() => true)
    mockUseDynamicModalStore.mockReturnValue({ openModal })
    mockUseResearcherDelete.mockReturnValue(deleteResearcher)
    mockUseWarningModal.mockReturnValue((cb: () => void) => () => cb())
})

const props = (name = 'Doe', uid = 'r-1') => ({
    getValue: () => name,
    row: { original: { uid } } as any,
}) as any

describe('ResearcherActionsCell', () => {
    it('renders researcher last name', () => {
        renderWithProviders(<ResearcherActionsCell {...props('Smith')} />)
        expect(screen.getByText('Smith')).toBeInTheDocument()
    })

    it('hides dropdown trigger when permission denied', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        renderWithProviders(<ResearcherActionsCell {...props()} />)
        expect(screen.queryByRole('button')).toBeNull()
    })

    it('Edit click opens sheet keyed by researcher uid', () => {
        renderWithProviders(<ResearcherActionsCell {...props('X', 'r-77')} />)
        fireEvent.click(screen.getAllByRole('button')[1])
        expect(openModal).toHaveBeenCalledWith(
            'sheet',
            expect.objectContaining({
                id: 'researcher-edit-r-77',
                props: expect.objectContaining({ uid: 'r-77' }),
            }),
        )
    })

    it('Delete click invokes warning-wrapped delete', () => {
        renderWithProviders(<ResearcherActionsCell {...props()} />)
        fireEvent.click(screen.getAllByRole('button')[2])
        expect(deleteResearcher).toHaveBeenCalled()
    })
})
