import { useGraphQLMutation } from '../../fetch/useGraphQL'
import { useFilterUpdate } from '../useFilterUpdate'

jest.mock('../../fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useFilterUpdate', () => {
    it('returns updateSavedFilter and loading', () => {
        const mockMutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate: mockMutate, isPending: false })

        const result = useFilterUpdate()

        expect(result.updateSavedFilter).toBe(mockMutate)
        expect(result.loading).toBe(false)
    })

    it('reflects pending state', () => {
        mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn(), isPending: true })

        const result = useFilterUpdate()
        expect(result.loading).toBe(true)
    })
})
