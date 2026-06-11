import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemImagePanel } from '../SystemImagePanel.comp'

const uploadImages = jest.fn()
const deleteImage = jest.fn()
let mockState: {
    images: Array<{ id: string; name: string; url: string; size: number }>
    isLoading: boolean
    isMutating: boolean
}

jest.mock('@/modules/shared/imageManager/utils/useImageAutoSave', () => ({
    useImageAutoSave: () => ({ ...mockState, uploadImages, deleteImage }),
}))

const mockHasPermission = jest.fn()
jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: () => mockHasPermission(),
}))

// run the warning-modal callback immediately so we can assert deleteImage is called
jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default:
        () =>
        (callback: (...args: unknown[]) => unknown) =>
        (...args: unknown[]) =>
            callback(...args),
}))

const img = (id: string) => ({ id, name: `img-${id}`, url: `http://x/${id}.png`, size: 1 })

beforeEach(() => {
    jest.clearAllMocks()
    mockState = { images: [], isLoading: false, isMutating: false }
    mockHasPermission.mockReturnValue(true)
})

describe('SystemImagePanel', () => {
    it('renders the thumbnail strip when there are multiple images', () => {
        mockState.images = [img('1'), img('2'), img('3')]
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        // 3 thumbnails + the large image
        expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(3)
        expect(screen.getByText('1/3')).toBeInTheDocument()
    })

    it('hides upload/delete controls without edit role', () => {
        mockHasPermission.mockReturnValue(false)
        mockState.images = [img('1')]
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        expect(screen.queryByRole('button', { name: /upload/i })).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
    })

    it('shows upload/delete controls with edit role', () => {
        mockState.images = [img('1')]
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
    })

    it('deletes the current image after confirm', () => {
        mockState.images = [img('1')]
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        fireEvent.click(screen.getByRole('button', { name: /delete/i }))
        expect(deleteImage).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }))
    })

    it('renders the editable empty state', () => {
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        expect(screen.getByText(/upload an image/i)).toBeInTheDocument()
    })

    it('renders the read-only empty state without edit role', () => {
        mockHasPermission.mockReturnValue(false)
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        expect(screen.getByText(/no images available/i)).toBeInTheDocument()
    })
})
