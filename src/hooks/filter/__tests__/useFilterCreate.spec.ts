import { useGraphQLMutation } from '../../fetch/useGraphQL'
import { useFilterCreate } from '../useFilterCreate'
import { useFilterDetails } from '../useFilterDetails'

jest.mock('../../fetch/useGraphQL', () => ({
  useGraphQLMutation: jest.fn(),
}))

jest.mock('../useFilterDetails', () => ({
  useFilterDetails: jest.fn(),
}))

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock
const mockUseFilterDetails = useFilterDetails as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useFilterCreate', () => {
  it('returns createUserSettings and loading', () => {
    const mockMutate = jest.fn()
    const mockRefetch = jest.fn()
    mockUseFilterDetails.mockReturnValue({ refetch: mockRefetch })
    mockUseGraphQLMutation.mockReturnValue({ mutate: mockMutate, isPending: false })

    const result = useFilterCreate({ tableId: 'test' })

    expect(result.createUserSettings).toBe(mockMutate)
    expect(result.loading).toBe(false)
  })

  it('passes onSuccess that calls refetch', () => {
    const mockRefetch = jest.fn()
    mockUseFilterDetails.mockReturnValue({ refetch: mockRefetch })
    mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })

    useFilterCreate({ tableId: 'test' })

    // Verify onSuccess option was passed
    const mutationOptions = mockUseGraphQLMutation.mock.calls[0][1]
    expect(mutationOptions.onSuccess).toBeDefined()

    // Call onSuccess to verify it refetches
    mutationOptions.onSuccess()
    expect(mockRefetch).toHaveBeenCalled()
  })
})
