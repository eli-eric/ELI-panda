import { useGraphQLMutation } from '../../fetch/useGraphQL'
import { useFilterDelete } from '../useFilterDelete'

jest.mock('../../fetch/useGraphQL', () => ({
  useGraphQLMutation: jest.fn(),
}))

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
})

describe('useFilterDelete', () => {
  it('returns deleteSavedFilter and loading', () => {
    const mockMutate = jest.fn()
    mockUseGraphQLMutation.mockReturnValue({ mutate: mockMutate, isPending: false })

    const result = useFilterDelete()

    expect(result.deleteSavedFilter).toBe(mockMutate)
    expect(result.loading).toBe(false)
  })

  it('reflects pending state', () => {
    mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn(), isPending: true })

    const result = useFilterDelete()
    expect(result.loading).toBe(true)
  })
})
