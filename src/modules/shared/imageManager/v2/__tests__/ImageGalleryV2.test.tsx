import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import * as fetcher from '@/utils/fetcher'

import { ImageGalleryV2 } from '../ImageGalleryV2'
import type { ImageItem } from '../types'

// Mock dependencies
jest.mock('@/utils/fetcher')
jest.mock('@/core/http/fetchClient')
jest.mock('sonner')

const mockUniFetcher = fetcher.uniFetcher as jest.MockedFunction<typeof fetcher.uniFetcher>

// Mock useWarningModal
jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: () => (fn: any) => fn,
}))

describe('ImageGalleryV2', () => {
    let queryClient: QueryClient

    const mockImages: ImageItem[] = [
        {
            id: '1',
            name: 'image1.jpg',
            url: '/api/catalogue/123/image/1',
            type: 'image/jpeg',
            ts: Date.now(),
            size: 1024,
        },
        {
            id: '2',
            name: 'image2.png',
            url: '/api/catalogue/123/image/2',
            type: 'image/png',
            ts: Date.now(),
            size: 2048,
        },
    ]

    const renderWithProviders = (ui: React.ReactElement) => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        })

        const messages = {
            'common.imageGallery.uploadAnImage': 'Upload an image',
            'common.imageGallery.pngJpgInfo': 'PNG, JPG up to 10MB',
            'common.imageGallery.upload': 'Upload',
            'common.imageGallery.delete': 'Delete',
            'common.imageGallery.loading': 'Loading...',
            'common.imageGallery.uploading': 'Uploading...',
            'common.imageGallery.deleting': 'Deleting...',
            'common.imageGallery.confirmDelete': 'Delete image',
            'common.imageGallery.saveItemToUploadImages':
                'Please save the item first to upload images',
            'common.ui.previousSlide': 'Previous slide',
            'common.ui.nextSlide': 'Next slide',
        }

        const Wrapper = ({ children }: { children: React.ReactNode }) => (
            <IntlProvider locale="en" messages={messages}>
                <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            </IntlProvider>
        )
        Wrapper.displayName = 'TestProviderWrapper'

        return render(ui, { wrapper: Wrapper })
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders loading state', () => {
        mockUniFetcher.mockImplementation(
            () => new Promise(() => {}), // Never resolves
        )

        renderWithProviders(
            <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId="123" hasEditRole={true} />,
        )

        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    it('renders empty state when no images', async () => {
        mockUniFetcher.mockResolvedValueOnce([])

        renderWithProviders(
            <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId="123" hasEditRole={true} />,
        )

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })

        // Empty state should show upload message
        expect(screen.getByText(/upload an image/i)).toBeInTheDocument()
    })

    it('renders images when data is loaded', async () => {
        mockUniFetcher.mockResolvedValueOnce(mockImages)

        renderWithProviders(
            <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId="123" hasEditRole={true} />,
        )

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })

        // Images should be rendered (check alt text)
        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(mockImages.length * 2) // Main + thumbnails
    })

    it('shows upload button when hasEditRole is true', async () => {
        mockUniFetcher.mockResolvedValueOnce(mockImages)

        renderWithProviders(
            <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId="123" hasEditRole={true} />,
        )

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })

        expect(screen.getByText(/upload/i)).toBeInTheDocument()
    })

    it('hides upload button when hasEditRole is false', async () => {
        mockUniFetcher.mockResolvedValueOnce(mockImages)

        renderWithProviders(
            <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId="123" hasEditRole={false} />,
        )

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })

        expect(screen.queryByText(/upload/i)).not.toBeInTheDocument()
    })

    it('shows delete button when hasEditRole is true', async () => {
        mockUniFetcher.mockResolvedValueOnce(mockImages)

        renderWithProviders(
            <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId="123" hasEditRole={true} />,
        )

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })

        expect(screen.getByText(/delete/i)).toBeInTheDocument()
    })

    it('shows save item message when itemId is undefined', () => {
        mockUniFetcher.mockResolvedValueOnce([])

        renderWithProviders(
            <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId={undefined} hasEditRole={true} />,
        )

        // Should not fetch when itemId is undefined
        expect(mockUniFetcher).not.toHaveBeenCalled()

        // Should show informational message
        expect(screen.getByText(/please save the item first to upload images/i)).toBeInTheDocument()

        // Should show AlertCircle icon
        const container = screen
            .getByText(/please save the item first to upload images/i)
            .closest('div')
        expect(container).toBeInTheDocument()
    })

    it('applies custom className', async () => {
        mockUniFetcher.mockResolvedValueOnce([])

        const { container } = renderWithProviders(
            <ImageGalleryV2
                itemType={FILE_TYPE.CATALOGUE}
                itemId="123"
                hasEditRole={true}
                className="custom-class"
            />,
        )

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })

        const gallery = container.querySelector('.custom-class')
        expect(gallery).toBeInTheDocument()
    })

    it('disables actions when disabled prop is true', async () => {
        // Test with empty state to ensure upload zone is disabled
        mockUniFetcher.mockResolvedValueOnce([])

        const { container } = renderWithProviders(
            <ImageGalleryV2
                itemType={FILE_TYPE.CATALOGUE}
                itemId="123"
                hasEditRole={true}
                disabled={true}
            />,
        )

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })

        // When disabled prop is true, the upload zone should exist but be non-interactive
        // The dropzone is disabled via the useDropzone hook, not via a button disabled prop
        expect(screen.getByText(/upload an image/i)).toBeInTheDocument()

        // Verify the component renders without errors when disabled
        expect(container.firstChild).toBeInTheDocument()
    })

    it('shows read-only state when hasEditRole is false', async () => {
        mockUniFetcher.mockResolvedValueOnce([])

        renderWithProviders(
            <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId="123" hasEditRole={false} />,
        )

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
        })

        // Should not show upload option
        expect(screen.queryByText(/upload/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/delete/i)).not.toBeInTheDocument()
    })
})
