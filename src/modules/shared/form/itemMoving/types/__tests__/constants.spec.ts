// Step components import a Zustand store that references MOVE_TYPE itself (circular dep).
// We mock all step components so the constants module loads cleanly for testing.
jest.mock('../../../wizard/types/wizard', () => ({}))
jest.mock('../../../itemAssign/steps/item-assign-summary.step', () => ({
    ItemAssignSummaryStep: () => null,
}))
jest.mock('../../../itemAssign/steps/select-item.step', () => ({ SelectItemStep: () => null }))
jest.mock('../../steps/InitWizardPath.step', () => ({ InitWizardPath: () => null }))
jest.mock('../../steps/OldItemDestination.step', () => ({
    OldItemDestinationStep: () => null,
}))
jest.mock('../../steps/Summary.step', () => ({ SummaryStep: () => null }))
jest.mock('../../steps/SystemDetail.step', () => ({ SystemDetailStep: () => null }))
jest.mock('../../steps/SystemSelect.step', () => ({ SelectSystemContainer: () => null }))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {
    MOVE_TYPE,
    assignSteps,
    defaultSteps,
    destinationSystemSteps,
    exchangeSteps,
    newSystemSteps,
    stepComponentsMap,
} = require('../constants')

describe('itemMoving constants', () => {
    it('MOVE_TYPE enum has expected string values', () => {
        expect(MOVE_TYPE.NEW_SYSTEM).toBe('new-system')
        expect(MOVE_TYPE.DESTINATION_SYSTEM).toBe('destination-system')
        expect(MOVE_TYPE.ASSIGN).toBe('assign')
        expect(MOVE_TYPE.EXCHANGE).toBe('exchange')
        expect(MOVE_TYPE.DEFAULT).toBe('default')
    })

    it.each([
        ['defaultSteps', defaultSteps, 4],
        ['newSystemSteps', newSystemSteps, 4],
        ['destinationSystemSteps', destinationSystemSteps, 4],
        ['exchangeSteps', exchangeSteps, 5],
        ['assignSteps', assignSteps, 2],
    ])('%s has expected length %d with sequential ids', (_name, steps: any, expectedLen) => {
        expect(steps.length).toBe(expectedLen)
        const ids = steps.map((s: any) => s.id)
        expect(ids).toEqual(Array.from({ length: expectedLen as number }, (_, i) => i + 1))
        steps.forEach((step: any) => expect(step.name.length).toBeGreaterThan(0))
    })

    it('stepComponentsMap has an entry for every MOVE_TYPE', () => {
        for (const type of Object.values(MOVE_TYPE)) {
            expect(stepComponentsMap[type as string]).toBeDefined()
        }
    })

    it('EXCHANGE map has 5 steps; ASSIGN map has 2', () => {
        expect(Object.keys(stepComponentsMap[MOVE_TYPE.EXCHANGE]).length).toBe(5)
        expect(Object.keys(stepComponentsMap[MOVE_TYPE.ASSIGN]).length).toBe(2)
    })

    it('NEW_SYSTEM / DESTINATION_SYSTEM / DEFAULT maps share the same 4-step shape', () => {
        const newKeys = Object.keys(stepComponentsMap[MOVE_TYPE.NEW_SYSTEM])
        const destKeys = Object.keys(stepComponentsMap[MOVE_TYPE.DESTINATION_SYSTEM])
        const defaultKeys = Object.keys(stepComponentsMap[MOVE_TYPE.DEFAULT])
        expect(newKeys).toEqual(['1', '2', '3', '4'])
        expect(destKeys).toEqual(newKeys)
        expect(defaultKeys).toEqual(newKeys)
    })
})
