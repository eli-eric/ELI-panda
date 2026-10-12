import { act, fireEvent, screen } from '@testing-library/react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { WOS_ERROR_CODES } from '../../types/wos-import'
import { resetWosAvailability } from '../../wos-import/hooks/useWosAvailability'
import { WOS_IMPORT_MODAL_ID } from '../../wos-import/hooks/useWosImportDialog'
import { WosImportButton } from '../wos-import.button'

const mockRoles = { current: ['publications-edit'] }
jest.mock('next-auth/react', () => ({
    useSession: () => ({ data: { user: { roles: mockRoles.current } } }),
}))
jest.mock('sonner', () => ({ toast: { success: jest.fn(), error: jest.fn(), info: jest.fn() } }))

const DOI = '10.1103/physrevresearch.6.013126'

const DoiError = () => {
    const {
        formState: { errors },
    } = useFormContext()
    return <output data-testid="doi-error">{String(errors.doi?.message ?? '')}</output>
}

const DoiInput = () => {
    const { register } = useFormContext()
    return <input aria-label="DOI" {...register('doi')} />
}

const renderButton = (defaultValues: Record<string, unknown> = { doi: DOI }) =>
    renderWithProviders(
        <>
            <WosImportButton />
            <DoiInput />
            <DoiError />
        </>,
        { withForm: true, formProps: { defaultValues } },
    )

const modalProps = () =>
    useDynamicModalStore.getState().modals[WOS_IMPORT_MODAL_ID]?.props as
        | Record<string, unknown>
        | undefined
const isDialogOpen = () => Boolean(modalProps())
const fetchButton = () => screen.getByRole('button', { name: 'Fetch from Web of Science' })

/** The lookup runs inside the dialog; the opener only routes the error it is handed. */
const reportError = (error: unknown) => {
    const onError = modalProps()?.onError as (error: unknown) => void
    act(() => onError(error))
}

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

    it('opens the dialog with a normalized DOI and a form snapshot', () => {
        renderButton({ doi: `doi: ${DOI.toUpperCase()}`, uid: 'publication-1' })

        fireEvent.click(screen.getByRole('button', { name: 'Refresh from Web of Science' }))

        const props = modalProps()
        expect(isDialogOpen()).toBe(true)
        expect(props?.doi).toBe(DOI)
        expect(props?.currentPublicationUid).toBe('publication-1')
        expect(props?.canImport).toBe(true)
        expect(typeof props?.onApply).toBe('function')
        expect(typeof props?.onError).toBe('function')
        expect(screen.getByRole('button', { name: 'Refresh from Web of Science' })).toBeDisabled()
    })

    it('hands import permission to the dialog instead of hiding the lookup', () => {
        mockRoles.current = ['publications-view']
        renderButton()

        fireEvent.click(fetchButton())

        expect(isDialogOpen()).toBe(true)
        expect(modalProps()?.canImport).toBe(false)
    })

    it('routes DOI_INVALID back onto the DOI field and closes the dialog', () => {
        renderButton()
        fireEvent.click(fetchButton())

        reportError({ code: WOS_ERROR_CODES.DOI_INVALID, status: 400 })

        expect(screen.getByTestId('doi-error')).toHaveTextContent('That does not look like a DOI.')
        expect(isDialogOpen()).toBe(false)
        expect(toast.error).not.toHaveBeenCalled()
    })

    it.each([
        [WOS_ERROR_CODES.WOS_NOT_FOUND, 'No Web of Science record for this DOI.'],
        [WOS_ERROR_CODES.WOS_RATE_LIMITED, 'Web of Science limit reached. Try again in a minute.'],
    ])('closes the dialog and toasts %s', (code, text) => {
        renderButton()
        fireEvent.click(fetchButton())

        reportError({ code })

        expect(toast.error).toHaveBeenCalledWith(text)
        expect(isDialogOpen()).toBe(false)
    })

    it('offers Retry for upstream failures', () => {
        renderButton()
        fireEvent.click(fetchButton())

        reportError({ code: WOS_ERROR_CODES.WOS_UPSTREAM_ERROR })

        expect(toast.error).toHaveBeenCalledWith('Web of Science is not responding.', {
            action: expect.objectContaining({ label: 'Retry' }),
        })
        expect(isDialogOpen()).toBe(false)

        const [, { action }] = (toast.error as jest.Mock).mock.calls[0]
        act(() => action.onClick())
        expect(isDialogOpen()).toBe(true)
    })

    it('retries the current DOI when it was edited after a failed lookup', () => {
        renderButton()
        fireEvent.click(fetchButton())
        reportError({ code: WOS_ERROR_CODES.WOS_UPSTREAM_ERROR })
        fireEvent.change(screen.getByRole('textbox', { name: 'DOI' }), {
            target: { value: '10.5555/new' },
        })

        const [, { action }] = (toast.error as jest.Mock).mock.calls[0]
        act(() => action.onClick())

        expect(modalProps()?.doi).toBe('10.5555/new')
    })

    it('hides the button for the rest of the session on WOS_NOT_CONFIGURED', () => {
        renderButton()
        fireEvent.click(fetchButton())

        reportError({ code: WOS_ERROR_CODES.WOS_NOT_CONFIGURED })

        expect(screen.queryByRole('button')).not.toBeInTheDocument()
        expect(isDialogOpen()).toBe(false)
        expect(toast.info).toHaveBeenCalledWith(
            'Web of Science import is not configured for PANDA.',
        )
        // A second mount stays hidden and never retries the lookup.
        renderButton()
        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('stays silent when the editor cancels the dialog', () => {
        renderButton()
        fireEvent.click(fetchButton())

        act(() => useDynamicModalStore.getState().closeModal(WOS_IMPORT_MODAL_ID))

        expect(fetchButton()).toBeEnabled()
        expect(toast.error).not.toHaveBeenCalled()
        expect(toast.info).not.toHaveBeenCalled()
    })

    it('ignores lookups that fail after the dialog was already closed', () => {
        renderButton()
        fireEvent.click(fetchButton())
        const onError = modalProps()?.onError as (error: unknown) => void
        act(() => useDynamicModalStore.getState().closeModal(WOS_IMPORT_MODAL_ID))

        act(() => onError({ code: WOS_ERROR_CODES.WOS_UPSTREAM_ERROR }))

        expect(toast.error).not.toHaveBeenCalled()
    })

    it('ignores an old lookup error after a new dialog opens with the same ID', () => {
        renderButton()
        fireEvent.click(fetchButton())
        const oldOnError = modalProps()?.onError as (error: unknown) => void
        act(() => useDynamicModalStore.getState().closeModal(WOS_IMPORT_MODAL_ID))
        fireEvent.click(fetchButton())

        act(() => oldOnError({ code: WOS_ERROR_CODES.DOI_INVALID }))

        expect(isDialogOpen()).toBe(true)
        expect(screen.getByTestId('doi-error')).toHaveTextContent('')
        expect(toast.error).not.toHaveBeenCalled()
        reportError({ code: WOS_ERROR_CODES.WOS_NOT_FOUND })
        expect(isDialogOpen()).toBe(false)
        expect(toast.error).toHaveBeenCalledWith('No Web of Science record for this DOI.')
    })
})
