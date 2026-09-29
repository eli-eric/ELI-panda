import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { fetchRequest } from '@/core/http/fetchClient'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { WOS_ERROR_CODES } from '../../types/wos-import'
import fixture from '../../wos-import/__fixtures__/wos-lookup-preview.json'
import { resetWosAvailability } from '../../wos-import/hooks/useWosAvailability'
import { WOS_IMPORT_MODAL_ID } from '../../wos-import/hooks/useWosImportDialog'
import { WosImportButton } from '../wos-import.button'

const mockRoles = { current: ['publications-edit'] }
jest.mock('next-auth/react', () => ({
    useSession: () => ({ data: { user: { roles: mockRoles.current } } }),
}))
jest.mock('@/core/http/fetchClient', () => ({ fetchRequest: jest.fn() }))
jest.mock('sonner', () => ({ toast: { success: jest.fn(), error: jest.fn(), info: jest.fn() } }))

const mockFetchRequest = fetchRequest as jest.Mock
const DOI = '10.1103/physrevresearch.6.013126'

const DoiError = () => {
    const {
        formState: { errors },
    } = useFormContext()
    return <output data-testid="doi-error">{String(errors.doi?.message ?? '')}</output>
}

const renderButton = (defaultValues: Record<string, unknown> = { doi: DOI }) =>
    renderWithProviders(
        <>
            <WosImportButton />
            <DoiError />
        </>,
        { withForm: true, formProps: { defaultValues } },
    )

const isDialogOpen = () => Boolean(useDynamicModalStore.getState().modals[WOS_IMPORT_MODAL_ID])
const fetchButton = () => screen.getByRole('button', { name: 'Fetch from Web of Science' })

beforeEach(() => {
    jest.clearAllMocks()
    mockRoles.current = ['publications-edit']
    useDynamicModalStore.setState({ modals: {}, modalOrder: [] })
})
afterEach(() => resetWosAvailability())

describe('WosImportButton', () => {
    it('is labelled by sheet mode and disabled until the DOI passes the format check', () => {
        const { unmount } = renderButton({ doi: 'not a doi' })
        expect(fetchButton()).toBeDisabled()
        unmount()
        renderButton({ doi: `https://doi.org/${DOI}`, uid: 'publication-1' })
        expect(screen.getByRole('button', { name: 'Refresh from Web of Science' })).toBeEnabled()
    })

    it('is available to view-only users and hidden without publication roles', () => {
        mockRoles.current = ['publications-view']
        const { unmount } = renderButton()
        expect(fetchButton()).toBeInTheDocument()
        unmount()
        mockRoles.current = ['basics']
        renderButton()
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('opens the wos-import dialog at once and looks up the normalized DOI', async () => {
        mockFetchRequest.mockResolvedValue(fixture)
        renderButton({ doi: `doi: ${DOI.toUpperCase()}` })

        fireEvent.click(fetchButton())

        expect(isDialogOpen()).toBe(true)
        expect(useDynamicModalStore.getState().modals[WOS_IMPORT_MODAL_ID].props?.doi).toBe(DOI)
        await waitFor(() => expect(mockFetchRequest).toHaveBeenCalledTimes(1))
        const [url, options] = mockFetchRequest.mock.calls[0]
        expect(url).toMatch(
            /\/publications\/wos\/lookup\?doi=10\.1103%2Fphysrevresearch\.6\.013126$/u,
        )
        expect(options.signal).toBeInstanceOf(AbortSignal)
        await waitFor(() => expect(fetchButton()).toBeEnabled())
        expect(isDialogOpen()).toBe(true)
        expect(toast.error).not.toHaveBeenCalled()
    })

    it('shows DOI_INVALID inline under the DOI field', async () => {
        mockFetchRequest.mockRejectedValue({ code: WOS_ERROR_CODES.DOI_INVALID, status: 400 })
        renderButton()

        fireEvent.click(fetchButton())

        await waitFor(() =>
            expect(screen.getByTestId('doi-error')).toHaveTextContent(
                'That does not look like a DOI.',
            ),
        )
        expect(isDialogOpen()).toBe(false)
        expect(toast.error).not.toHaveBeenCalled()
    })

    it.each([
        [WOS_ERROR_CODES.WOS_NOT_FOUND, 'No Web of Science record for this DOI.'],
        [WOS_ERROR_CODES.WOS_RATE_LIMITED, 'Web of Science limit reached. Try again in a minute.'],
    ])('closes the dialog and toasts %s', async (code, text) => {
        mockFetchRequest.mockRejectedValue({ code })
        renderButton()

        fireEvent.click(fetchButton())

        await waitFor(() => expect(toast.error).toHaveBeenCalledWith(text))
        expect(isDialogOpen()).toBe(false)
    })

    it('offers Retry for upstream failures', async () => {
        mockFetchRequest.mockRejectedValueOnce({ code: WOS_ERROR_CODES.WOS_UPSTREAM_ERROR })
        renderButton()

        fireEvent.click(fetchButton())

        await waitFor(() =>
            expect(toast.error).toHaveBeenCalledWith('Web of Science is not responding.', {
                action: expect.objectContaining({ label: 'Retry' }),
            }),
        )
        expect(isDialogOpen()).toBe(false)

        mockFetchRequest.mockResolvedValueOnce(fixture)
        const [, { action }] = (toast.error as jest.Mock).mock.calls[0]
        await act(async () => action.onClick())
        expect(isDialogOpen()).toBe(true)
        expect(mockFetchRequest).toHaveBeenCalledTimes(2)
        await waitFor(() => expect(fetchButton()).toBeEnabled())
    })

    it('hides the button for the rest of the session on WOS_NOT_CONFIGURED', async () => {
        mockFetchRequest.mockRejectedValue({ code: WOS_ERROR_CODES.WOS_NOT_CONFIGURED })
        const { unmount } = renderButton()

        fireEvent.click(fetchButton())

        await waitFor(() => expect(screen.queryByRole('button')).not.toBeInTheDocument())
        expect(isDialogOpen()).toBe(false)
        expect(toast.info).toHaveBeenCalledWith(
            'Web of Science import is not configured for PANDA.',
        )
        unmount()
        renderButton()
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
        expect(mockFetchRequest).toHaveBeenCalledTimes(1)
    })

    it('aborts the request and stays silent when the editor cancels', async () => {
        let lookupSignal: AbortSignal | undefined
        mockFetchRequest.mockImplementation((_url: string, { signal }: { signal: AbortSignal }) => {
            const { promise, reject } = Promise.withResolvers()
            lookupSignal = signal
            signal.addEventListener('abort', () =>
                reject(new DOMException('Aborted', 'AbortError')),
            )
            return promise
        })
        renderButton()

        fireEvent.click(fetchButton())
        await waitFor(() => expect(mockFetchRequest).toHaveBeenCalledTimes(1))
        await act(async () => useDynamicModalStore.getState().closeModal(WOS_IMPORT_MODAL_ID))

        await waitFor(() => expect(fetchButton()).toBeEnabled())
        expect(lookupSignal?.aborted).toBe(true)
        expect(toast.error).not.toHaveBeenCalled()
        expect(toast.info).not.toHaveBeenCalled()
    })
})
