import { fireEvent, render, screen } from '@testing-library/react'

import { useAccessControl } from '@/hooks/useAccessControl'
import useWarningModal from '@/hooks/useWarningModal'
import { usePublicationEditSheet } from '@/modules/shared/publications/publication-edit/usePublicationEditSheet'

import { usePublicationDelete } from '../../hooks/usePublicationDelete'
import { ActionButtons } from '../action-buttons.comp'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/modules/shared/publications/publication-edit/usePublicationEditSheet', () => ({
    usePublicationEditSheet: jest.fn(),
}))

jest.mock('../../hooks/usePublicationDelete', () => ({
    usePublicationDelete: jest.fn(),
}))

const mockUseAccessControl = useAccessControl as jest.Mock
const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUsePublicationEditSheet = usePublicationEditSheet as jest.Mock
const mockUsePublicationDelete = usePublicationDelete as jest.Mock

let openEdit: jest.Mock
let deletePub: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openEdit = jest.fn()
    deletePub = jest.fn()
    mockUsePublicationEditSheet.mockReturnValue([openEdit, jest.fn()])
    mockUsePublicationDelete.mockReturnValue(deletePub)
    mockUseWarningModal.mockReturnValue(
        (cb: (data: any) => void) => (data: any) => cb(data),
    )
    mockUseAccessControl.mockReturnValue(() => true)
})

describe('ActionButtons (publications)', () => {
    it('renders Edit button + Delete button when canEdit', () => {
        render(<ActionButtons uid="p-1" />)
        expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('Edit click invokes openEdit', () => {
        render(<ActionButtons uid="p-1" />)
        const [edit] = screen.getAllByRole('button')
        fireEvent.click(edit)
        expect(openEdit).toHaveBeenCalled()
    })

    it('Delete click invokes warning-wrapped deletePublication', () => {
        render(<ActionButtons uid="p-1" />)
        const [, del] = screen.getAllByRole('button')
        fireEvent.click(del)
        expect(deletePub).toHaveBeenCalledWith({})
    })

    it('disables Delete button when permission denied (still rendered)', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        render(<ActionButtons uid="p-1" />)
        const [, del] = screen.getAllByRole('button')
        expect(del).toBeDisabled()
    })

    it('passes uid into usePublicationEditSheet + usePublicationDelete', () => {
        render(<ActionButtons uid="p-99" />)
        expect(mockUsePublicationEditSheet).toHaveBeenCalledWith('p-99')
        expect(mockUsePublicationDelete).toHaveBeenCalledWith('p-99')
    })
})
