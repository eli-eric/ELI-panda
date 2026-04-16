import { useGraphQL } from '../../fetch/useGraphQL'
import { useSystemList } from '../useSystemList'

jest.mock('../../fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useSystemList', () => {
    it('calls useGraphQL with systemCode filter', () => {
        mockUseGraphQL.mockReturnValue({ data: null })

        useSystemList('SYS-001')

        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                variables: {
                    where: { systemCode_CONTAINS: 'SYS-001' },
                },
            }),
        )
    })

    it('returns useGraphQL result directly', () => {
        const mockResult = { data: { systems: [{ uid: '1' }] } }
        mockUseGraphQL.mockReturnValue(mockResult)

        const result = useSystemList('SYS')
        expect(result).toBe(mockResult)
    })
})
