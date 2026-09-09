import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { messages } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import type { Zone, ZonesResponse } from '../types/zone.types'

const mockMutateAsync = jest.fn().mockResolvedValue({ data: {} })
const mockCloseModal = jest.fn()

jest.mock('../hooks/useZoneMutation', () => ({
    useZoneMutation: () => ({
        mutateAsync: mockMutateAsync,
        isPending: false,
    }),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: () => ({
        openModal: jest.fn(),
        closeModal: mockCloseModal,
    }),
}))

jest.mock('@/store/useModalFormStateStore', () => ({
    useModalFormStateStore: () => ({
        setIsDirty: jest.fn(),
        reset: jest.fn(),
    }),
}))

jest.mock('@/hooks/useFormDirtyProtection', () => ({
    useFormDirtyProtection: () => ({
        withDirtyProtection: (fn: () => void) => fn,
    }),
}))

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: () => true,
    usePermission: () => true,
}))

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: (role: string) => () => role === ROLE.ZONES_EDIT,
}))

jest.mock('sonner', () => ({
    toast: {
        promise: jest.fn(),
        error: jest.fn(),
        success: jest.fn(),
    },
}))

const mockAllZones: ZonesResponse = {
    data: [
        { uid: 'root-1', name: 'Root Zone', code: 'RZ', notes: 'Root notes', parentZone: null },
        {
            uid: 'child-1',
            name: 'Child Zone',
            code: 'CZ',
            notes: null,
            parentZone: { uid: 'root-1', name: 'Root Zone' },
        },
    ],
    totalCount: 2,
}

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: () => jest.fn().mockResolvedValue(mockAllZones),
}))

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
})

const renderForm = (zone?: Zone) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { ZoneFormContainer } = require('../form/zone-form.cont')

    return render(
        <IntlProvider locale="en" messages={messages.en}>
            <QueryClientProvider client={queryClient}>
                <ZoneFormContainer zone={zone} onSuccess={jest.fn()} />
            </QueryClientProvider>
        </IntlProvider>,
    )
}

describe('ZoneFormContainer', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders create form with empty fields', () => {
        renderForm()

        const nameInput = screen.getByPlaceholderText('Enter zone name')
        const codeInput = screen.getByPlaceholderText('Enter zone code')

        expect(nameInput).toHaveValue('')
        expect(codeInput).toHaveValue('')
    })

    it('renders edit form with pre-filled values', () => {
        const zone: Zone = {
            uid: '1',
            name: 'Existing Zone',
            code: 'EZ',
            notes: 'Some notes',
            parentZone: { uid: 'root-1', name: 'Root Zone' },
        }

        renderForm(zone)

        const nameInput = screen.getByPlaceholderText('Enter zone name')
        const codeInput = screen.getByPlaceholderText('Enter zone code')
        const notesInput = screen.getByPlaceholderText('Enter zone notes')

        expect(nameInput).toHaveValue('Existing Zone')
        expect(codeInput).toHaveValue('EZ')
        expect(notesInput).toHaveValue('Some notes')
    })

    it('shows create label for new zone', () => {
        renderForm()
        expect(screen.getByText('Create Zone')).toBeInTheDocument()
    })

    it('shows save label for existing zone', () => {
        renderForm({ uid: '1', name: 'Zone', code: 'Z', parentZone: null })
        expect(screen.getByText('Save Zone')).toBeInTheDocument()
    })

    it('validates required fields on submit', async () => {
        renderForm()

        const submitButton = screen.getByText('Create Zone')
        fireEvent.click(submitButton)

        // Form should not call mutate with empty required fields
        await waitFor(() => {
            expect(mockMutateAsync).not.toHaveBeenCalled()
        })
    })

    it('submits form with valid data', async () => {
        renderForm()

        const nameInput = screen.getByPlaceholderText('Enter zone name')
        const codeInput = screen.getByPlaceholderText('Enter zone code')

        fireEvent.change(nameInput, { target: { value: 'New Zone' } })
        fireEvent.change(codeInput, { target: { value: 'NZ' } })

        const submitButton = screen.getByText('Create Zone')
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockMutateAsync).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: 'New Zone',
                    code: 'NZ',
                }),
            )
        })
    })

    describe('tri-state relationship fields', () => {
        const submitWithNameAndCode = async () => {
            fireEvent.change(screen.getByPlaceholderText('Enter zone name'), {
                target: { value: 'New Zone' },
            })
            fireEvent.change(screen.getByPlaceholderText('Enter zone code'), {
                target: { value: 'NZ' },
            })
            fireEvent.click(screen.getByText('Create Zone'))
            await waitFor(() => expect(mockMutateAsync).toHaveBeenCalled())
            return mockMutateAsync.mock.calls[0][0]
        }

        it("sends '' — not null — when nothing is selected", async () => {
            // The API reads null as "leave the link untouched", so null would silently
            // preserve a stale parent instead of disconnecting it.
            renderForm()
            const payload = await submitWithNameAndCode()

            expect(payload.parentUid).toBe('')
            expect(payload.defaultParentSystemUid).toBe('')
        })

        it('flattens an existing default parent system to its uid', async () => {
            const zone: Zone = {
                uid: '1',
                name: 'Existing Zone',
                code: 'EZ',
                parentZone: { uid: 'root-1', name: 'Root Zone' },
                defaultParentSystem: { uid: 'sys-1', name: '01 - L1 laser system' },
            }
            renderForm(zone)

            fireEvent.click(screen.getByText('Save Zone'))
            await waitFor(() => expect(mockMutateAsync).toHaveBeenCalled())

            expect(mockMutateAsync.mock.calls[0][0]).toEqual(
                expect.objectContaining({
                    parentUid: 'root-1',
                    defaultParentSystemUid: 'sys-1',
                }),
            )
        })

        it('never sends the nested object the picker holds in form state', async () => {
            renderForm()
            const payload = await submitWithNameAndCode()

            expect(payload).not.toHaveProperty('defaultParentSystem')
            expect(Object.keys(payload).sort()).toEqual([
                'code',
                'defaultParentSystemUid',
                'name',
                'notes',
                'parentUid',
            ])
        })
    })
})
