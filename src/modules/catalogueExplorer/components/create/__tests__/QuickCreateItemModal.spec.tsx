import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

const submitMock = jest.fn()

jest.mock('@/modules/catalogueItem/hooks/useItemCreate', () => ({
    useItemCreate: () => ({ submit: submitMock, loading: false }),
}))

import { QuickCreateItemModal } from '../QuickCreateItemModal.comp'

const renderModal = (props: Partial<React.ComponentProps<typeof QuickCreateItemModal>> = {}) =>
    render(
        <IntlProvider locale="en" messages={{}}>
            <QueryClientProvider client={new QueryClient()}>
                <QuickCreateItemModal
                    onClose={props.onClose ?? jest.fn()}
                    onCreated={props.onCreated ?? jest.fn()}
                    categoryUid={props.categoryUid ?? 'cat-1'}
                    categoryName={props.categoryName ?? 'Widgets'}
                />
            </QueryClientProvider>
        </IntlProvider>,
    )

describe('QuickCreateItemModal', () => {
    beforeEach(() => submitMock.mockReset())

    it('submits with categoryUid preset', async () => {
        submitMock.mockImplementation(
            (
                _payload: unknown,
                { onSuccess }: { onSuccess: (r: { data: { uid: string } }) => void },
            ) => onSuccess({ data: { uid: 'item-1' } }),
        )
        const onCreated = jest.fn()
        renderModal({ onCreated })

        fireEvent.change(screen.getByTestId('quick-create-item-name'), { target: { value: 'N' } })
        fireEvent.change(screen.getByTestId('quick-create-item-number'), {
            target: { value: '001' },
        })
        fireEvent.submit(screen.getByTestId('quick-create-item-form'))

        await waitFor(() => expect(submitMock).toHaveBeenCalled())
        const payload = submitMock.mock.calls[0][0]
        expect(payload).toMatchObject({
            name: 'N',
            catalogueNumber: '001',
            category: { uid: 'cat-1' },
        })
        await waitFor(() => expect(onCreated).toHaveBeenCalledWith('item-1'))
    })

    it('blocks submit when required fields empty', async () => {
        renderModal()
        fireEvent.submit(screen.getByTestId('quick-create-item-form'))
        await waitFor(() => expect(submitMock).not.toHaveBeenCalled())
    })
})
