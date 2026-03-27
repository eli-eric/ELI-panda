const mockDriver = { session: jest.fn() }
const mockAuth = { basic: jest.fn().mockReturnValue('auth-token') }

jest.mock('neo4j-driver', () => ({
  __esModule: true,
  default: {
    driver: jest.fn().mockReturnValue(mockDriver),
    auth: mockAuth,
  },
}))

// Must import after mock
const originalEnv = process.env

beforeEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
  process.env = {
    ...originalEnv,
    NEO4J_URI: 'bolt://localhost:7687',
    NEO4J_USER: 'neo4j',
    NEO4J_PASSWORD: 'password',
  }
})

afterEach(() => {
  process.env = originalEnv
})

describe('getDriver', () => {
  it('creates and returns a driver', async () => {
    const { default: getDriver } = await import('../neo4j')
    const driver = getDriver()
    expect(driver).toBe(mockDriver)
  })

  it('throws when connection details are missing', async () => {
    process.env = { ...originalEnv, NEO4J_URI: '', NEO4J_USER: '', NEO4J_PASSWORD: '' }
    const { default: getDriver } = await import('../neo4j')
    expect(() => getDriver()).toThrow('Neo4j connection details are missing')
  })
})
