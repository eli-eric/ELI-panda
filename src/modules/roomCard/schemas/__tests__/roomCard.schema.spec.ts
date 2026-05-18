import { roomCardSchema } from '../roomCard.schema'

const baseValid = {
    status: 'CLEAN_MODE',
    name: 'Lab 1',
    purityClass: 'CLASS_100',
    entryToHvacTent: 'yes',
    additionalRequirements: '',
    coolingWater: '',
    indoorEnvironmentQuality: '',
    compressedAirDistribution: '',
    nitrogenCentralDistribution: '',
    maxPressureInColdDistribution: '',
    coolingWaterClient: '',
    indoorEnvironmentQualityClient: '',
    compressedAirDistributionClient: '',
    nitrogenCentralDistributionClient: '',
    maxPressureInColdDistributionClient: '',
}

describe('roomCardSchema', () => {
    it('accepts a minimally valid payload', () => {
        expect(roomCardSchema.safeParse(baseValid).success).toBe(true)
    })

    it('rejects empty name', () => {
        const r = roomCardSchema.safeParse({ ...baseValid, name: '' })
        expect(r.success).toBe(false)
        if (!r.success) {
            expect(r.error.issues.some(i => i.message === 'Name is required')).toBe(true)
        }
    })

    it('rejects non-string status', () => {
        const r = roomCardSchema.safeParse({ ...baseValid, status: 123 })
        expect(r.success).toBe(false)
    })

    it('rejects missing required scalars (entryToHvacTent)', () => {
        const { entryToHvacTent, ...rest } = baseValid
        expect(roomCardSchema.safeParse(rest).success).toBe(false)
    })

    it('accepts null operationalState', () => {
        expect(
            roomCardSchema.safeParse({ ...baseValid, operationalState: null }).success,
        ).toBe(true)
    })

    it('accepts optional arrays as undefined', () => {
        expect(
            roomCardSchema.safeParse({ ...baseValid, prescribedClothing: undefined }).success,
        ).toBe(true)
        expect(
            roomCardSchema.safeParse({ ...baseValid, cleaningScheduleDays: undefined }).success,
        ).toBe(true)
    })
})
