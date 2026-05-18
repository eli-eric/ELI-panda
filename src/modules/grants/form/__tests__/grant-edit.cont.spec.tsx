import { render, screen, waitFor } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useGrant } from '../../hooks/useGrant'
import { GrantEditContainer } from '../grant-edit.cont'

jest.mock('../../hooks/useGrant', () => ({
    useGrant: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

let lastFormProps: any = null
jest.mock('../grant-form.cont', () => ({
    GrantFormContainer: (props: any) => {
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
    Skeleton: ({ className }: { className?: string }) => (
        <div data-testid="skel" data-cls={className ?? ''} />
    ),
}))

jest.mock('sonner', () => ({ toast: { error: jest.fn() } }))
const sonner = jest.requireMock('sonner')

const mockUseGrant = useGrant as jest.Mock
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

describe('GrantEditContainer', () => {
    it('shows skeleton while loading', () => {
        mockUseGrant.mockReturnValue({
            data: null,
            isLoading: true,
            isFetching: false,
            isError: false,
            error: null,
            refetch,
        })
        render(<GrantEditContainer uid="g-1" />)
        expect(screen.getAllByTestId('skel').length).toBe(3)
    })

    it('shows skeleton when isFetching', () => {
        mockUseGrant.mockReturnValue({
            data: null,
            isLoading: false,
            isFetching: true,
            isError: false,
            error: null,
            refetch,
        })
        render(<GrantEditContainer uid="g-1" />)
        expect(screen.getAllByTestId('skel').length).toBe(3)
    })

    it('shows record-not-found on 404 + onClick closes modal', () => {
        mockUseGrant.mockReturnValue({
            data: null,
            isLoading: false,
            isFetching: false,
            isError: true,
            error: { response: { status: 404 } },
            refetch,
        })
        render(<GrantEditContainer uid="g-1" />)
        const nf = screen.getByTestId('not-found')
        nf.click()
        expect(closeModal).toHaveBeenCalledWith('grant-edit-g-1')
    })

    it('shows ErrorPage on other errors', () => {
        mockUseGrant.mockReturnValue({
            data: null,
            isLoading: false,
            isFetching: false,
            isError: true,
            error: { response: { status: 500 } },
            refetch,
        })
        render(<GrantEditContainer uid="g-1" />)
        expect(screen.getByTestId('error-page')).toBeInTheDocument()
    })

    it('toast.error fires when isError flips true', async () => {
        mockUseGrant.mockReturnValue({
            data: null,
            isLoading: false,
            isFetching: false,
            isError: true,
            error: { response: { status: 500 } },
            refetch,
        })
        render(<GrantEditContainer uid="g-1" />)
        await waitFor(() => expect(sonner.toast.error).toHaveBeenCalledWith('Failed to load grant'))
    })

    it('renders GrantFormContainer with loaded grant + refetch onSuccess', () => {
        const grant = { uid: 'g-1', name: 'G' }
        mockUseGrant.mockReturnValue({
            data: grant,
            isLoading: false,
            isFetching: false,
            isError: false,
            error: null,
            refetch,
        })
        render(<GrantEditContainer uid="g-1" />)
        expect(lastFormProps.grant).toBe(grant)
        expect(lastFormProps.onSuccess).toBe(refetch)
    })
})
