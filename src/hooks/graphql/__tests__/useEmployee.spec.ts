import { useGraphQL } from '../../fetch/useGraphQL'
import { useEmployee } from '../useEmployee'

jest.mock('../../fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useEmployee', () => {
    it('calls useGraphQL with uid variable', () => {
        mockUseGraphQL.mockReturnValue({ data: null, isLoading: true })

        useEmployee('user-123')

        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                variables: { uid: 'user-123' },
                enabled: true,
            }),
        )
    })

    it('disables query when uid is null', () => {
        mockUseGraphQL.mockReturnValue({ data: null, isLoading: false })

        useEmployee(null)

        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                enabled: false,
            }),
        )
    })

    it('returns first employee from data', () => {
        const employee = { uid: '1', fullName: 'John Doe' }
        mockUseGraphQL.mockReturnValue({
            data: { employees: [employee] },
            isLoading: false,
        })

        const result = useEmployee('1')
        expect(result.employee).toEqual(employee)
        expect(result.isLoading).toBe(false)
    })

    it('returns undefined employee when no data', () => {
        mockUseGraphQL.mockReturnValue({ data: undefined, isLoading: true })

        const result = useEmployee('1')
        expect(result.employee).toBeUndefined()
    })
})
