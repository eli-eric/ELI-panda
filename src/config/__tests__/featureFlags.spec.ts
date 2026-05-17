import { featureFlags, isFeatureEnabled } from '../featureFlags'

describe('featureFlags', () => {
    it('exposes all four flags', () => {
        expect(featureFlags).toEqual(
            expect.objectContaining({
                enableHttpLogging: expect.any(Boolean),
                enableMutationLogging: expect.any(Boolean),
                enableSparePartsAssignment: expect.any(Boolean),
                enableGraphqlLogging: expect.any(Boolean),
            }),
        )
    })

    it('disables HTTP and mutation logging by default', () => {
        expect(featureFlags.enableHttpLogging).toBe(false)
        expect(featureFlags.enableMutationLogging).toBe(false)
    })
})

describe('isFeatureEnabled', () => {
    it('returns the flag value', () => {
        expect(isFeatureEnabled('enableHttpLogging')).toBe(featureFlags.enableHttpLogging)
        expect(isFeatureEnabled('enableMutationLogging')).toBe(
            featureFlags.enableMutationLogging,
        )
    })
})
