import type { TeamDetail } from '../../types/team.types'
import { applyTeamDetailResponse } from '../teamCache'

const makeClient = () => ({
    setQueryData: jest.fn(),
    invalidateQueries: jest.fn().mockResolvedValue(undefined),
})

const detail = (over: Partial<TeamDetail> = {}): TeamDetail => ({
    uid: 't-1',
    name: 'Alpha',
    code: null,
    description: null,
    members: [],
    ...over,
})

describe('applyTeamDetailResponse', () => {
    it('shallow-merges the response over the cache, preserving omitted fields', () => {
        const qc = makeClient()
        // Partial payload (no name/code/description) must not drop those fields.
        applyTeamDetailResponse(qc as any, 't-1', {
            uid: 't-1',
            members: [],
        } as unknown as TeamDetail)

        expect(qc.setQueryData).toHaveBeenCalledWith(['team', { uid: 't-1' }], expect.any(Function))
        const updater = qc.setQueryData.mock.calls[0][1]
        expect(
            updater(detail({ name: 'Alpha', code: 'A', description: 'd', members: [{} as any] })),
        ).toEqual(detail({ name: 'Alpha', code: 'A', description: 'd', members: [] }))
    })

    it('uses the response as-is when there is no cached entry yet', () => {
        const qc = makeClient()
        applyTeamDetailResponse(qc as any, 't-1', {
            uid: 't-1',
            members: [],
        } as unknown as TeamDetail)
        const updater = qc.setQueryData.mock.calls[0][1]
        expect(updater(undefined)).toEqual({ uid: 't-1', members: [] })
    })

    it('invalidates both the detail and the list', () => {
        const qc = makeClient()
        applyTeamDetailResponse(qc as any, 't-1', detail())
        expect(qc.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['team', { uid: 't-1' }] })
        expect(qc.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['teams'] })
    })

    it('skips priming on a 204/empty body but still invalidates', () => {
        const qc = makeClient()
        applyTeamDetailResponse(qc as any, 't-1', undefined)
        expect(qc.setQueryData).not.toHaveBeenCalled()
        expect(qc.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['team', { uid: 't-1' }] })
    })
})
