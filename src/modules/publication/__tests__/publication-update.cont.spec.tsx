import { render, screen } from '@testing-library/react'

import { usePublication } from '../hooks/usePublication'
import { PublicationUpdateContainer } from '../publication-update.cont'

jest.mock('../hooks/usePublication', () => ({
    usePublication: jest.fn(),
}))

jest.mock('../publication-detail.cont', () => ({
    PublicationDetailContainer: ({ publication }: { publication: any }) => (
        <div data-testid="detail" data-uid={publication.uid} />
    ),
}))

jest.mock('@/components/loader.comp', () => ({
    __esModule: true,
    default: () => <div data-testid="loader" />,
}))

jest.mock('@/components/error/ErrorPage', () => ({
    __esModule: true,
    default: () => <div data-testid="error-page" />,
}))

jest.mock('@/components/pages/record-not-found.comp', () => ({
    __esModule: true,
    default: ({ returnUrl }: { returnUrl: string }) => (
        <div data-testid="not-found" data-url={returnUrl} />
    ),
}))

jest.mock('sonner', () => ({ toast: { error: jest.fn() } }))
const sonner = jest.requireMock('sonner')

const mockUsePublication = usePublication as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('PublicationUpdateContainer', () => {
    it('renders loader while loading', () => {
        mockUsePublication.mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
        })
        render(<PublicationUpdateContainer />)
        expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    it('renders 404 RecordNotFound on response 404', () => {
        mockUsePublication.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            error: { response: { status: 404 } },
        })
        render(<PublicationUpdateContainer />)
        expect(screen.getByTestId('not-found').dataset.url).toBe('/publications/overview')
    })

    it('renders ErrorPage + toast on other error', () => {
        mockUsePublication.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            error: { response: { status: 500 } },
        })
        render(<PublicationUpdateContainer />)
        expect(screen.getByTestId('error-page')).toBeInTheDocument()
        expect(sonner.toast.error).toHaveBeenCalled()
    })

    it('renders loader when not loading but data undefined', () => {
        mockUsePublication.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: false,
        })
        render(<PublicationUpdateContainer />)
        expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    it('renders PublicationDetailContainer when data ready', () => {
        mockUsePublication.mockReturnValue({
            data: { uid: 'p-1' },
            isLoading: false,
            isError: false,
            refetch: jest.fn(),
        })
        render(<PublicationUpdateContainer />)
        expect(screen.getByTestId('detail').dataset.uid).toBe('p-1')
    })
})
