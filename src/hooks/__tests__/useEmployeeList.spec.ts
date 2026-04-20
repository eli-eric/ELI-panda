import { renderHook } from '@testing-library/react'

import { useGraphQL } from '../fetch/useGraphQL'
import { useEmployeeList } from '../useEmployeeList'

jest.mock('../fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useEmployeeList', () => {
    it('calls useGraphQL with workplace filter', () => {
        mockUseGraphQL.mockReturnValue({ data: null, isLoading: true })

        renderHook(() => useEmployeeList('LAB-01'))

        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                variables: {
                    where: { workplaceName_CONTAINS: 'LAB-01' },
                },
            }),
        )
    })

    it('returns useGraphQL result', () => {
        const mockResult = { data: { employees: [] }, isLoading: false }
        mockUseGraphQL.mockReturnValue(mockResult)

        const { result } = renderHook(() => useEmployeeList('LAB-01'))
        expect(result.current).toBe(mockResult)
    })
})
