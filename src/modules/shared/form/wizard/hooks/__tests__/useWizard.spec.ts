import { act, renderHook } from '@testing-library/react'

import { useWizardStore } from '../../store/useWizardStore'
import { useWizard } from '../useWizard'

const reset = () => act(() => useWizardStore.getState().resetWizard())

const steps = [{ id: 1 }, { id: 2 }, { id: 3 }] as any

describe('useWizard', () => {
    beforeEach(reset)

    it('goNext advances when not at the last step', () => {
        const handleFinish = jest.fn()
        const handleCancel = jest.fn()
        const { result } = renderHook(() => useWizard({ steps, handleFinish, handleCancel }))

        act(() => result.current.goNext())
        expect(useWizardStore.getState().currentStep).toBe(2)
        expect(handleFinish).not.toHaveBeenCalled()
    })

    it('goNext on the final step calls handleFinish with current formData', () => {
        const handleFinish = jest.fn()
        const handleCancel = jest.fn()
        act(() => useWizardStore.getState().setCurrentStep(steps.length))
        act(() => useWizardStore.getState().updateFormData({ x: 'y' }))

        const { result } = renderHook(() => useWizard({ steps, handleFinish, handleCancel }))

        act(() => result.current.goNext())
        expect(handleFinish).toHaveBeenCalledWith({ x: 'y' })
    })

    it('goBack from step > 1 decrements the step', () => {
        act(() => useWizardStore.getState().setCurrentStep(2))
        const { result } = renderHook(() =>
            useWizard({ steps, handleFinish: jest.fn(), handleCancel: jest.fn() }),
        )
        act(() => result.current.goBack())
        expect(useWizardStore.getState().currentStep).toBe(1)
    })

    it('goBack at step 1 resets wizard and calls handleCancel', () => {
        const handleCancel = jest.fn()
        act(() => useWizardStore.getState().updateFormData({ a: 1 }))
        const { result } = renderHook(() =>
            useWizard({ steps, handleFinish: jest.fn(), handleCancel }),
        )
        act(() => result.current.goBack())
        expect(handleCancel).toHaveBeenCalled()
        expect(useWizardStore.getState().formData).toEqual({})
        expect(useWizardStore.getState().currentStep).toBe(1)
    })
})
