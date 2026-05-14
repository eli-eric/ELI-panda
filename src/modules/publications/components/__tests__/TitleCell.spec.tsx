import { render, screen } from '@testing-library/react'

import { useAccessControl } from '@/hooks/useAccessControl'
import useWarningModal from '@/hooks/useWarningModal'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { usePublicationDelete } from '../../hooks/usePublicationDelete'
import { TitleCell } from '../TitleCell'

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../../hooks/usePublicationDelete', () => ({
    usePublicationDelete: jest.fn(),
}))

const mockUseAccessControl = useAccessControl as jest.Mock
const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUsePublicationDelete = usePublicationDelete as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseAccessControl.mockReturnValue(() => true)
    mockUseWarningModal.mockReturnValue((cb: () => void) => () => cb())
    mockUsePublicationDelete.mockReturnValue(jest.fn())
})

const cellProps = (title: string, uid = 'pub-1') => ({
    getValue: () => title,
    row: { original: { uid } } as any,
}) as any

describe('TitleCell', () => {
    it('renders title with link to /publication/{uid}', () => {
        renderWithProviders(<TitleCell {...cellProps('My Publication')} />)
        const link = screen.getByText('My Publication').closest('a')
        expect(link).toHaveAttribute('href', '/publication/pub-1')
    })

    it('truncates titles longer than 40 chars', () => {
        const long = 'a'.repeat(60)
        const { container } = renderWithProviders(<TitleCell {...cellProps(long)} />)
        expect(container.textContent).toContain('a'.repeat(40) + '...')
    })

    it('shows actions dropdown trigger when permission granted', () => {
        renderWithProviders(<TitleCell {...cellProps('t')} />)
        expect(
            screen.getByRole('button', { name: 'Publication actions' }),
        ).toBeInTheDocument()
    })

    it('hides actions dropdown when permission denied', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        renderWithProviders(<TitleCell {...cellProps('t')} />)
        expect(
            screen.queryByRole('button', { name: 'Publication actions' }),
        ).toBeNull()
    })
})
