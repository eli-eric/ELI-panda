import { act } from '@testing-library/react'

// Mock step components to break the constants.tsx circular import chain
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
const { MOVE_TYPE } = require('../../types/constants')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useModalWizardStore } = require('../useModalWizardStore')

const reset = () =>
    act(() =>
        useModalWizardStore.setState({
            open: false,
            isMovingToNewSystem: null,
            selectedSystem: null,
            oldItemParentSystem: null,
            moveType: MOVE_TYPE.DEFAULT,
        }),
    )

describe('useModalWizardStore', () => {
    beforeEach(reset)

    it('has the expected defaults', () => {
        const s = useModalWizardStore.getState()
        expect(s.open).toBe(false)
        expect(s.isMovingToNewSystem).toBeNull()
        expect(s.selectedSystem).toBeNull()
        expect(s.oldItemParentSystem).toBeNull()
        expect(s.moveType).toBe(MOVE_TYPE.DEFAULT)
    })

    it('setOpen flips the flag', () => {
        act(() => useModalWizardStore.getState().setOpen(true))
        expect(useModalWizardStore.getState().open).toBe(true)
    })

    it('setIsMovingToNewSystem stores boolean or null', () => {
        act(() => useModalWizardStore.getState().setIsMovingToNewSystem(true))
        expect(useModalWizardStore.getState().isMovingToNewSystem).toBe(true)
        act(() => useModalWizardStore.getState().setIsMovingToNewSystem(false))
        expect(useModalWizardStore.getState().isMovingToNewSystem).toBe(false)
        act(() => useModalWizardStore.getState().setIsMovingToNewSystem(null))
        expect(useModalWizardStore.getState().isMovingToNewSystem).toBeNull()
    })

    it('setSelectedSystem / setOldItemParentSystem store + clear with null', () => {
        const system = { uid: 's', name: 'S' } as any
        act(() => useModalWizardStore.getState().setSelectedSystem(system))
        expect(useModalWizardStore.getState().selectedSystem).toBe(system)
        act(() => useModalWizardStore.getState().setSelectedSystem(null))
        expect(useModalWizardStore.getState().selectedSystem).toBeNull()

        act(() => useModalWizardStore.getState().setOldItemParentSystem(system))
        expect(useModalWizardStore.getState().oldItemParentSystem).toBe(system)
    })

    it('setMoveType swaps between MOVE_TYPE enum values', () => {
        act(() => useModalWizardStore.getState().setMoveType(MOVE_TYPE.EXCHANGE))
        expect(useModalWizardStore.getState().moveType).toBe(MOVE_TYPE.EXCHANGE)
        act(() => useModalWizardStore.getState().setMoveType(MOVE_TYPE.ASSIGN))
        expect(useModalWizardStore.getState().moveType).toBe(MOVE_TYPE.ASSIGN)
    })
})
