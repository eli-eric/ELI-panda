import { renderHook } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'

import { useFormFields } from '../useFormFields'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/hooks/form/useMakeFormFields', () => ({
    useMakeFormFields: (fields: Record<string, unknown>) => fields,
}))

const mockUsePermission = usePermission as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useFormFields (itemMoving)', () => {
    it('returns name/location/itemUsage/itemConditionStatus keys', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useFormFields())
        expect(Object.keys(result.current as Record<string, unknown>)).toEqual(
            expect.arrayContaining([
                'name',
                'location',
                'itemUsage',
                'itemConditionStatus',
            ]),
        )
    })

    it('SYSTEM_EDIT permission → fields enabled', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useFormFields())
        const fields = result.current as Record<string, { disabled: boolean }>
        for (const f of Object.values(fields)) {
            expect(f.disabled).toBe(false)
        }
    })

    it('No SYSTEM_EDIT permission → all fields disabled', () => {
        mockUsePermission.mockReturnValue(false)
        const { result } = renderHook(() => useFormFields())
        const fields = result.current as Record<string, { disabled: boolean }>
        for (const f of Object.values(fields)) {
            expect(f.disabled).toBe(true)
        }
    })

    it('itemConditionStatus uses field name "conditionStatus"', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useFormFields())
        const f = result.current as any
        expect(f.itemConditionStatus.name).toBe('conditionStatus')
    })
})
