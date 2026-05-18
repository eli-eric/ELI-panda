import { renderHook } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'

import { useSystemMovingFormFields } from '../SystemMoving.fields'

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

describe('useSystemMovingFormFields', () => {
    it('returns expected field keys', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useSystemMovingFormFields())
        expect(Object.keys(result.current as Record<string, unknown>)).toEqual(
            expect.arrayContaining([
                'name',
                'responsible',
                'importance',
                'location',
                'zone',
                'systemType',
                'description',
                'systemCode',
            ]),
        )
    })

    it('has SYSTEM_EDIT permission → all fields enabled', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useSystemMovingFormFields())
        const fields = result.current as Record<string, { disabled: boolean }>
        for (const f of Object.values(fields)) {
            expect(f.disabled).toBe(false)
        }
    })

    it('lacks SYSTEM_EDIT permission → all fields disabled', () => {
        mockUsePermission.mockReturnValue(false)
        const { result } = renderHook(() => useSystemMovingFormFields())
        const fields = result.current as Record<string, { disabled: boolean }>
        for (const f of Object.values(fields)) {
            expect(f.disabled).toBe(true)
        }
    })
})
