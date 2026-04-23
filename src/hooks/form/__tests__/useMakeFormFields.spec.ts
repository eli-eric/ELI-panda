import { renderHook } from '@testing-library/react'

import { useMakeFormFields } from '../useMakeFormFields'

jest.mock('react-intl', () => ({
    useIntl: () => ({
        formatMessage: ({ id }: { id: string }) => `translated:${id}`,
    }),
}))

describe('useMakeFormFields', () => {
    it('translates label via intl', () => {
        const fields = {
            name: { name: 'name', label: 'field.name' },
        }
        const { result } = renderHook(() => useMakeFormFields(fields))
        expect(result.current.name.label).toBe('translated:field.name')
    })

    it('uses customLabel when present', () => {
        const fields = {
            name: { name: 'name', label: 'field.name', customLabel: 'Custom' },
        }
        const { result } = renderHook(() => useMakeFormFields(fields))
        expect(result.current.name.label).toBe('Custom')
    })

    it('translates placeholder via intl', () => {
        const fields = {
            search: { name: 'search', placeholder: 'field.search.placeholder' },
        }
        const { result } = renderHook(() => useMakeFormFields(fields))
        expect(result.current.search.placeholder).toBe('translated:field.search.placeholder')
    })

    it('sets data-testid from name when not provided', () => {
        const fields = {
            email: { name: 'email' },
        }
        const { result } = renderHook(() => useMakeFormFields(fields))
        expect(result.current.email['data-testid']).toBe('email')
    })

    it('preserves explicit data-testid', () => {
        const fields = {
            email: { name: 'email', 'data-testid': 'custom-test-id' },
        }
        const { result } = renderHook(() => useMakeFormFields(fields))
        expect(result.current.email['data-testid']).toBe('custom-test-id')
    })

    it('preserves codebook property', () => {
        const fields = {
            type: { name: 'type', codebook: 'MATERIAL_TYPE' as any },
        }
        const { result } = renderHook(() => useMakeFormFields(fields))
        expect(result.current.type.codebook).toBe('MATERIAL_TYPE')
    })
})
