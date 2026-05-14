import {
    cleanRooms,
    clientRequirements,
    operationalStateColorMapping,
    possibleParameters,
    statusColorMapping,
} from '../constants'

describe('roomCard constants lists', () => {
    it('cleanRooms covers expected codes', () => {
        const codes = cleanRooms.map(c => c.code)
        expect(codes).toEqual(
            expect.arrayContaining([
                'purityClass',
                'prescribedClothing',
                'entryToHvacTent',
                'additionalRequirements',
                'cleaningSchedule',
            ]),
        )
    })

    it('possibleParameters and clientRequirements have unique codes', () => {
        const allCodes = [...possibleParameters, ...clientRequirements].map(p => p.code)
        expect(new Set(allCodes).size).toBe(allCodes.length)
    })
})

describe('statusColorMapping', () => {
    it('only the matching status entry resolves to a class', () => {
        const result = statusColorMapping('DIRTY_MODE' as any).filter(Boolean)
        expect(result).toEqual(['bg-red-200 dark:bg-red-500'])
    })
})

describe('operationalStateColorMapping', () => {
    it('returns gray fallback when state has no code', () => {
        expect(operationalStateColorMapping()).toContain('bg-gray-200')
        expect(operationalStateColorMapping({ uid: 'x', name: 'X', code: '' })).toContain(
            'bg-gray-200',
        )
    })

    it('matches IN_OPERATION code', () => {
        const result = (operationalStateColorMapping({
            uid: 'x',
            name: 'X',
            code: 'IN_OPERATION',
        }) as (string | false)[]).filter(Boolean)
        expect(result).toEqual(['bg-green-200 dark:bg-green-500'])
    })

    it('matches POWER_SHUTDOWN code', () => {
        const result = (operationalStateColorMapping({
            uid: 'x',
            name: 'X',
            code: 'POWER_SHUTDOWN',
        }) as (string | false)[]).filter(Boolean)
        expect(result).toEqual(['bg-gray-400 dark:bg-gray-700'])
    })
})
