import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { request } from 'graphql-request'
import React from 'react'

jest.mock('graphql-request', () => ({ request: jest.fn() }))
jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))
jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockRequest = request as jest.Mock

describe('useCatalogueItemPropertyValueUpdate', () => {
    const createWrapper = () => {
        const qc = new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: qc }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
        mockRequest.mockResolvedValue({ updateCatalogueItems: { catalogueItems: [{ uid: 'i1' }] } })
    })

    it('sends property value update targeting propertiesConnection', async () => {
        const { useCatalogueItemPropertyValueUpdate } = await import(
            '../useCatalogueItemPropertyValueUpdate'
        )

        const { result } = renderHook(() => useCatalogueItemPropertyValueUpdate('i1'), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updatePropertyValue('prop-1', '240V')
        })

        await waitFor(() => expect(mockRequest).toHaveBeenCalledTimes(1))
        const vars = mockRequest.mock.calls[0][2]
        expect(vars).toEqual({
            where: { uid: 'i1' },
            update: {
                propertiesConnection: {
                    where: { node: { uid: 'prop-1' } },
                    update: { edge: { value: '240V' } },
                },
            },
        })
    })
})
