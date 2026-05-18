import { render, screen, waitFor } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useResearcher } from '../../hooks/useResearcher'
import { ResearcherEditContainer } from '../researcher-edit.cont'

jest.mock('../../hooks/useResearcher', () => ({
    useResearcher: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

let lastFormProps: any = null
jest.mock('../researcher-form.cont', () => ({
    ResearcherFormContainer: (props: any) => {
        lastFormProps = props
        return <div data-testid="form-cont" />
    },
}))

jest.mock('@/components/pages/record-not-found.comp', () => ({
    __esModule: true,
    default: ({ onClick }: { onClick: () => void }) => (
        <button data-testid="not-found" onClick={onClick}>
            not-found
        </button>
    ),
}))

jest.mock('@/components/error/ErrorPage', () => ({
    __esModule: true,
    default: () => <div data-testid="error-page" />,
}))

jest.mock('@/components/ui/skeleton', () => ({
    Skeleton: () => <div data-testid="skel" />,
}))

jest.mock('sonner', () => ({ toast: { error: jest.fn() } }))
const sonner = jest.requireMock('sonner')

const mockUseResearcher = useResearcher as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let closeModal: jest.Mock
let refetch: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    lastFormProps = null
    closeModal = jest.fn()
    refetch = jest.fn()
    mockUseDynamicModalStore.mockReturnValue({ closeModal })
})

describe('ResearcherEditContainer', () => {
    it('skeleton while loading', () => {
        mockUseResearcher.mockReturnValue({
            data: null,
            isLoading: true,
            isFetching: false,
            isError: false,
            error: null,
            refetch,
        })
        render(<ResearcherEditContainer uid="r-1" />)
        expect(screen.getAllByTestId('skel').length).toBeGreaterThan(0)
    })

    it('404 → RecordNotFound; click closes modal by uid-specific id', () => {
        mockUseResearcher.mockReturnValue({
            data: null,
            isLoading: false,
            isFetching: false,
            isError: true,
            error: { response: { status: 404 } },
            refetch,
        })
        render(<ResearcherEditContainer uid="r-99" />)
        screen.getByTestId('not-found').click()
        expect(closeModal).toHaveBeenCalledWith('researcher-edit-r-99')
    })

    it('non-404 isError → ErrorPage + toast.error', async () => {
        mockUseResearcher.mockReturnValue({
            data: null,
            isLoading: false,
            isFetching: false,
            isError: true,
            error: { response: { status: 500 } },
            refetch,
        })
        render(<ResearcherEditContainer uid="r-1" />)
        expect(screen.getByTestId('error-page')).toBeInTheDocument()
        await waitFor(() =>
            expect(sonner.toast.error).toHaveBeenCalledWith('Failed to load researcher'),
        )
    })

    it('renders ResearcherFormContainer with researcher + refetch', () => {
        const researcher = { uid: 'r-1', firstName: 'J', lastName: 'D' }
        mockUseResearcher.mockReturnValue({
            data: researcher,
            isLoading: false,
            isFetching: false,
            isError: false,
            error: null,
            refetch,
        })
        render(<ResearcherEditContainer uid="r-1" />)
        expect(lastFormProps.researcher).toBe(researcher)
        expect(lastFormProps.onSuccess).toBe(refetch)
    })
})
