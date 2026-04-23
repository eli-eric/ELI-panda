import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { messages } from '@/i18n/src/messages'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import type { ServiceLine } from '@/modules/orderItem/types/form'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: () => true,
    usePermission: () => true,
}))

jest.mock('@/modules/services/hooks/useServiceTypeList', () => ({
    useServiceTypeList: () => ({ data: [{ uid: 'svc-1', name: 'Repair' }] }),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: () => jest.fn().mockResolvedValue({ data: [] }),
    queryMutate: () => jest.fn().mockResolvedValue({ data: {} }),
}))

import { ServiceLineEditSheet } from '../ServiceLineEditSheet.comp'

const makeDetail = (
    uid: string,
    name: string,
    typeUid: string,
    value: unknown,
    propertyGroup = 'General',
): CatalogueItemDetail =>
    ({
        propertyGroup,
        value,
        property: {
            uid,
            name,
            type: { uid: typeUid, name: 'type' },
        },
    }) as CatalogueItemDetail

const makeServiceLine = (details: CatalogueItemDetail[]): ServiceLine => ({
    uuid: 'sl-1',
    uid: 'sl-1',
    name: 'Service Line 1',
    serviceType: { uid: 'svc-1', name: 'Repair' },
    item: { uid: 'item-1', name: 'Item 1' },
    price: 100,
    currency: 'EUR',
    notes: '',
    details,
})

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

const renderSheet = (serviceLine: ServiceLine, onSubmit: jest.Mock) =>
    render(
        <IntlProvider locale="en" messages={messages.en}>
            <QueryClientProvider client={queryClient}>
                <ServiceLineEditSheet serviceLine={serviceLine} onSubmit={onSubmit} />
            </QueryClientProvider>
        </IntlProvider>,
    )

describe('ServiceLineEditSheet — dynamic details edit', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders existing detail values from serviceLine prop', () => {
        const sl = makeServiceLine([
            makeDetail('p-text', 'Material', PROPERTY_TYPE.TEXT, 'steel'),
            makeDetail('p-num', 'Weight', PROPERTY_TYPE.NUMBER, 42),
        ])
        renderSheet(sl, jest.fn())

        expect(screen.getByLabelText('Material')).toHaveValue('steel')
        expect(screen.getByLabelText('Weight')).toHaveValue(42)
    })

    it('propagates edited TEXT detail value to onSubmit as array', async () => {
        const onSubmit = jest.fn()
        const sl = makeServiceLine([makeDetail('p-text', 'Material', PROPERTY_TYPE.TEXT, 'steel')])
        renderSheet(sl, onSubmit)

        fireEvent.change(screen.getByLabelText('Material'), { target: { value: 'aluminum' } })
        fireEvent.click(screen.getByText('Update Service Line'))

        await waitFor(() => expect(onSubmit).toHaveBeenCalled())
        const submitted = onSubmit.mock.calls[0][0]
        expect(Array.isArray(submitted.details)).toBe(true)
        expect(submitted.details).toHaveLength(1)
        expect(submitted.details[0].property.uid).toBe('p-text')
        expect(submitted.details[0].value).toBe('aluminum')
    })

    it('propagates edited NUMBER detail value to onSubmit as array', async () => {
        const onSubmit = jest.fn()
        const sl = makeServiceLine([makeDetail('p-num', 'Weight', PROPERTY_TYPE.NUMBER, 42)])
        renderSheet(sl, onSubmit)

        fireEvent.change(screen.getByLabelText('Weight'), { target: { value: '99' } })
        fireEvent.click(screen.getByText('Update Service Line'))

        await waitFor(() => expect(onSubmit).toHaveBeenCalled())
        const submitted = onSubmit.mock.calls[0][0]
        expect(submitted.details[0].value).toBe('99')
    })

    it('editing one detail must not affect another detail (cross-parameter guard)', async () => {
        const onSubmit = jest.fn()
        const sl = makeServiceLine([
            makeDetail('p-a', 'Alpha', PROPERTY_TYPE.TEXT, 'original-A'),
            makeDetail('p-b', 'Beta', PROPERTY_TYPE.TEXT, 'original-B'),
            makeDetail('p-c', 'Gamma', PROPERTY_TYPE.TEXT, 'original-C'),
        ])
        renderSheet(sl, onSubmit)

        fireEvent.change(screen.getByLabelText('Beta'), { target: { value: 'edited-B' } })
        fireEvent.click(screen.getByText('Update Service Line'))

        await waitFor(() => expect(onSubmit).toHaveBeenCalled())
        const submitted = onSubmit.mock.calls[0][0]
        const byUid: Record<string, string> = {}
        submitted.details.forEach((d: CatalogueItemDetail) => {
            byUid[d.property.uid] = d.value
        })
        expect(byUid['p-a']).toBe('original-A')
        expect(byUid['p-b']).toBe('edited-B')
        expect(byUid['p-c']).toBe('original-C')
    })

    it('submits empty details array when serviceLine has no details', async () => {
        const onSubmit = jest.fn()
        const sl = makeServiceLine([])
        renderSheet(sl, onSubmit)

        fireEvent.click(screen.getByText('Update Service Line'))

        await waitFor(() => expect(onSubmit).toHaveBeenCalled())
        const submitted = onSubmit.mock.calls[0][0]
        expect(Array.isArray(submitted.details)).toBe(true)
        expect(submitted.details).toHaveLength(0)
    })
})
