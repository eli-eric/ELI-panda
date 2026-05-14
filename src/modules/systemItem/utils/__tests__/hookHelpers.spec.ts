import {
    combineAndDeduplicateUsers,
    createConnections,
    getUniqueByUid,
    showErrorToast,
    showSuccessToast,
    validateSystemForm,
} from '../hookHelpers'

jest.mock('sonner', () => ({
    toast: { success: jest.fn(), error: jest.fn() },
}))

import { toast } from 'sonner'

const mockToast = toast as unknown as { success: jest.Mock; error: jest.Mock }

const fakeIntl = {
    formatMessage: jest.fn((descriptor, values) =>
        values ? `${descriptor.id}|${JSON.stringify(values)}` : descriptor.id,
    ),
} as any

describe('getUniqueByUid', () => {
    it('keeps last entry per uid', () => {
        const out = getUniqueByUid([
            { uid: 'a', name: 'old' },
            { uid: 'b', name: 'B' },
            { uid: 'a', name: 'new' },
        ])
        expect(out).toHaveLength(2)
        expect(out.find(i => i.uid === 'a')).toEqual({ uid: 'a', name: 'new' })
    })

    it('returns empty for empty input', () => {
        expect(getUniqueByUid([])).toEqual([])
    })
})

describe('createConnections', () => {
    it('builds GraphQL connect payload', () => {
        expect(createConnections([{ uid: 'a' }, { uid: 'b' }])).toEqual({
            connect: [
                { where: { node: { uid: 'a' } } },
                { where: { node: { uid: 'b' } } },
            ],
        })
    })

    it('returns undefined for empty array', () => {
        expect(createConnections([])).toBeUndefined()
    })
})

describe('showSuccessToast / showErrorToast', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('dispatches toast.success with formatted message id', () => {
        showSuccessToast(fakeIntl, 'msg.success')
        expect(mockToast.success).toHaveBeenCalledWith('msg.success')
    })

    it('dispatches toast.error with formatted message + values', () => {
        showErrorToast(fakeIntl, 'msg.error', { name: 'foo' })
        const arg = mockToast.error.mock.calls[0][0]
        expect(typeof arg).toBe('string')
        expect(arg).toContain('msg.error')
    })
})

describe('validateSystemForm', () => {
    beforeEach(() => jest.clearAllMocks())

    it('returns true when name is non-empty', () => {
        expect(validateSystemForm({ name: 'Sys' }, fakeIntl)).toBe(true)
        expect(mockToast.error).not.toHaveBeenCalled()
    })

    it('returns false and fires error toast when name missing/empty', () => {
        expect(validateSystemForm({}, fakeIntl)).toBe(false)
        expect(validateSystemForm({ name: null }, fakeIntl)).toBe(false)
        expect(validateSystemForm({ name: '' }, fakeIntl)).toBe(false)
        expect(mockToast.error).toHaveBeenCalledTimes(3)
    })
})

describe('combineAndDeduplicateUsers', () => {
    it('merges and de-dupes by uid', () => {
        const out = combineAndDeduplicateUsers(
            [{ uid: 'a' }, { uid: 'b' }],
            [{ uid: 'b' }, { uid: 'c' }],
        )
        expect(out.map(u => u.uid).sort()).toEqual(['a', 'b', 'c'])
    })

    it('handles null/undefined first arg', () => {
        expect(combineAndDeduplicateUsers(undefined, [{ uid: 'a' }])).toEqual([{ uid: 'a' }])
        expect(combineAndDeduplicateUsers(null, [{ uid: 'a' }])).toEqual([{ uid: 'a' }])
    })
})
