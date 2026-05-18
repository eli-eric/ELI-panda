import { act } from '@testing-library/react'

import { useWizardStore } from '../useWizardStore'

const reset = () => act(() => useWizardStore.getState().resetWizard())

describe('useWizardStore', () => {
    beforeEach(reset)

    it('defaults to step 1 with empty formData', () => {
        const s = useWizardStore.getState()
        expect(s.currentStep).toBe(1)
        expect(s.formData).toEqual({})
    })

    it('goNext / goBack adjust currentStep by 1', () => {
        act(() => useWizardStore.getState().goNext())
        expect(useWizardStore.getState().currentStep).toBe(2)
        act(() => useWizardStore.getState().goNext())
        expect(useWizardStore.getState().currentStep).toBe(3)
        act(() => useWizardStore.getState().goBack())
        expect(useWizardStore.getState().currentStep).toBe(2)
    })

    it('setCurrentStep jumps directly', () => {
        act(() => useWizardStore.getState().setCurrentStep(5))
        expect(useWizardStore.getState().currentStep).toBe(5)
    })

    it('updateFormData merges, setFormData replaces', () => {
        act(() => useWizardStore.getState().updateFormData({ a: 1 }))
        act(() => useWizardStore.getState().updateFormData({ b: 2 }))
        expect(useWizardStore.getState().formData).toEqual({ a: 1, b: 2 })

        act(() => useWizardStore.getState().setFormData({ c: 3 }))
        expect(useWizardStore.getState().formData).toEqual({ c: 3 })
    })

    it('resetWizard returns to initial state', () => {
        act(() => {
            useWizardStore.getState().setCurrentStep(4)
            useWizardStore.getState().updateFormData({ a: 1 })
        })
        act(() => useWizardStore.getState().resetWizard())
        expect(useWizardStore.getState()).toMatchObject({ currentStep: 1, formData: {} })
    })
})
