jest.mock('../../../itemAssign/steps/item-assign-summary.step', () => ({
    ItemAssignSummaryStep: () => null,
}))
jest.mock('../../../itemAssign/steps/select-item.step', () => ({
    SelectItemStep: () => null,
}))
jest.mock('../../steps/InitWizardPath.step', () => ({
    InitWizardPath: () => null,
}))
jest.mock('../../steps/OldItemDestination.step', () => ({
    OldItemDestinationStep: () => null,
}))
jest.mock('../../steps/Summary.step', () => ({
    SummaryStep: () => null,
}))
jest.mock('../../steps/SystemDetail.step', () => ({
    SystemDetailStep: () => null,
}))
jest.mock('../../steps/SystemSelect.step', () => ({
    SelectSystemContainer: () => null,
}))

import {
    assignSteps,
    defaultSteps,
    destinationSystemSteps,
    exchangeSteps,
    MOVE_TYPE,
    newSystemSteps,
    stepComponentsMap,
} from '../constants'

describe('itemMoving constants', () => {
    it('MOVE_TYPE enum values', () => {
        expect(MOVE_TYPE.NEW_SYSTEM).toBe('new-system')
        expect(MOVE_TYPE.DESTINATION_SYSTEM).toBe('destination-system')
        expect(MOVE_TYPE.ASSIGN).toBe('assign')
        expect(MOVE_TYPE.EXCHANGE).toBe('exchange')
        expect(MOVE_TYPE.DEFAULT).toBe('default')
    })

    it('stepComponentsMap has entries for every MOVE_TYPE', () => {
        Object.values(MOVE_TYPE).forEach(t => {
            expect(stepComponentsMap[t]).toBeDefined()
        })
    })

    it('exchangeSteps has 5 entries; others have 4 (assign has 2)', () => {
        expect(defaultSteps.length).toBe(4)
        expect(newSystemSteps.length).toBe(4)
        expect(destinationSystemSteps.length).toBe(4)
        expect(exchangeSteps.length).toBe(5)
        expect(assignSteps.length).toBe(2)
    })

    it('default/new/destination steps share step structure', () => {
        const names = (steps: any[]) => steps.map(s => s.name)
        expect(names(defaultSteps)).toContain('Select or create')
        expect(names(newSystemSteps)).toContain('Parent System')
        expect(names(destinationSystemSteps)).toContain('Destination System')
    })
})
