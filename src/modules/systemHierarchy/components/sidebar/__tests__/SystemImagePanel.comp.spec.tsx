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

const mockCanEditSystem = jest.fn()
jest.mock('@/modules/shared/system/edit-permission/hooks/useSystemEditPermission', () => ({
    useSystemEditPermission: () => ({
        canEdit: mockCanEditSystem(),
        responsibles: [],
        status: 'allowed',
        refetch: jest.fn(),
    }),
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
    mockCanEditSystem.mockReturnValue(true)
})

describe('SystemImagePanel', () => {
    it('renders the thumbnail strip when there are multiple images', () => {
        mockState.images = [img('1'), img('2'), img('3')]
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        // 1 large image + 3 thumbnails
        expect(screen.getAllByRole('img')).toHaveLength(4)
        expect(screen.getByText('1/3')).toBeInTheDocument()
    })

    it('focuses an image when its thumbnail is clicked', () => {
        mockState.images = [img('1'), img('2'), img('3')]
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        expect(screen.getByText('1/3')).toBeInTheDocument()
        fireEvent.click(screen.getByRole('button', { name: 'img-2' }))
        expect(screen.getByText('2/3')).toBeInTheDocument()
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

    it('hides upload/delete controls when not responsible for the system', () => {
        mockCanEditSystem.mockReturnValue(false)
        mockState.images = [img('1')]
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        expect(screen.queryByRole('button', { name: /upload/i })).not.toBeInTheDocument()
        expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
    })

    it('disables delete while the selected image is an optimistic temp entry', () => {
        mockState.images = [{ id: 'temp-abc', name: 'pending', url: 'x', size: 0 }]
        renderWithProviders(<SystemImagePanel systemUid="s1" />)
        expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled()
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
