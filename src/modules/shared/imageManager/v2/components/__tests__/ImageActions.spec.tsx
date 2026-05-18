import { fireEvent, screen } from '@testing-library/react'

import useWarningModal from '@/hooks/useWarningModal'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { ImageActions } from '../ImageActions'

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockUseWarningModal = useWarningModal as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseWarningModal.mockReturnValue((cb: () => void) => () => cb())
})

const img = { id: 'i-1', name: 'photo.png' } as any

describe('ImageActions', () => {
    it('returns null without edit role', () => {
        const { container } = renderWithProviders(
            <ImageActions currentImage={img} hasEditRole={false} onDelete={jest.fn()} />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('returns null without currentImage even if hasEditRole', () => {
        const { container } = renderWithProviders(
            <ImageActions hasEditRole onDelete={jest.fn()} />,
        )
        expect(container).toBeEmptyDOMElement()
    })

    it('renders a delete button when both edit role + image present', () => {
        renderWithProviders(
            <ImageActions currentImage={img} hasEditRole onDelete={jest.fn()} />,
        )
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click invokes onDelete with imageId + name via warning wrapper', () => {
        const onDelete = jest.fn()
        renderWithProviders(
            <ImageActions currentImage={img} hasEditRole onDelete={onDelete} />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(onDelete).toHaveBeenCalledWith('i-1', 'photo.png')
    })

    it('click is no-op when no onDelete handler passed', () => {
        renderWithProviders(<ImageActions currentImage={img} hasEditRole />)
        expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow()
    })
})
