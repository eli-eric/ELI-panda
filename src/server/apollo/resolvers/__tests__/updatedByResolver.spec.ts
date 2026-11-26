import updatedByResolver, { AUDITED_NODE_LABELS } from '../updatedByResolver'

const makeContext = (isAuthenticated = true) => {
    const run = jest.fn().mockResolvedValue(undefined)
    const transaction = { run, commit: jest.fn(), rollback: jest.fn() }
    const session = { beginTransaction: jest.fn(() => transaction), close: jest.fn() }
    const driver = { session: jest.fn(() => session) }
    return {
        run,
        driver,
        context: {
            executor: { executionContext: driver },
            authorization: { isAuthenticated, jwt: { sub: 'user-1' } },
        } as never,
    }
}

const args = (node: string) => ({ node, nodeUid: 'n-1', action: 'UPDATE', changes: '[]' })

describe('updatedByResolver', () => {
    it.each([...AUDITED_NODE_LABELS])('writes the audit edge for %s with a parameterized uid', async label => {
        const { run, context } = makeContext()
        await updatedByResolver(null, args(label), context, null)
        const [query, params] = run.mock.calls[0]
        expect(query).toContain(`MATCH (a:${label}), (u:User)`)
        expect(params).toEqual(expect.objectContaining({ nodeUid: 'n-1', userUid: 'user-1' }))
    })

    it('rejects a label outside the allowlist before touching the database', async () => {
        const { driver, context } = makeContext()
        const injected = 'System) DETACH DELETE a //'
        await expect(updatedByResolver(null, args(injected), context, null)).rejects.toThrow(
            'Unsupported node',
        )
        expect(driver.session).not.toHaveBeenCalled()
    })

    it('rejects unauthenticated calls without opening a session', async () => {
        const { driver, context } = makeContext(false)
        await expect(updatedByResolver(null, args('System'), context, null)).rejects.toThrow(
            'Unauthorized',
        )
        expect(driver.session).not.toHaveBeenCalled()
    })
})
