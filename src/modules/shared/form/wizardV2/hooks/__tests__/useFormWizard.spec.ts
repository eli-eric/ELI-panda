import { act, renderHook } from '@testing-library/react'

import useFormWizard from '../useFormWizard'

describe('useFormWizard (V2)', () => {
    it('starts on step 0', () => {
        const { result } = renderHook(() => useFormWizard(3))
        expect(result.current.currentStep).toBe(0)
        expect(result.current.isFirstStep).toBe(true)
        expect(result.current.isLastStep).toBe(false)
    })

    it('advances with next() up to totalSteps - 1', () => {
        const { result } = renderHook(() => useFormWizard(3))
        act(() => result.current.next())
        expect(result.current.currentStep).toBe(1)
        act(() => result.current.next())
        expect(result.current.currentStep).toBe(2)
        expect(result.current.isLastStep).toBe(true)

        // capped at totalSteps - 1
        act(() => result.current.next())
        expect(result.current.currentStep).toBe(2)
    })

    it('decrements with prev() but never below 0', () => {
        const { result } = renderHook(() => useFormWizard(3))
        act(() => result.current.prev())
        expect(result.current.currentStep).toBe(0)

        act(() => result.current.next())
        act(() => result.current.next())
        act(() => result.current.prev())
        expect(result.current.currentStep).toBe(1)
    })

    it('flags isFirstStep / isLastStep correctly across moves', () => {
        const { result } = renderHook(() => useFormWizard(2))
        expect(result.current.isFirstStep).toBe(true)
        expect(result.current.isLastStep).toBe(false)
        act(() => result.current.next())
        expect(result.current.isFirstStep).toBe(false)
        expect(result.current.isLastStep).toBe(true)
    })

    it('handles totalSteps=1 (always first and last)', () => {
        const { result } = renderHook(() => useFormWizard(1))
        expect(result.current.isFirstStep).toBe(true)
        expect(result.current.isLastStep).toBe(true)
        act(() => result.current.next())
        expect(result.current.currentStep).toBe(0)
    })
})
