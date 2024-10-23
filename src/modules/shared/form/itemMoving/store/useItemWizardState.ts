import { create } from 'zustand'

type WizardState = {
  currentStepId: number
  nextStep: () => void
  prevStep: () => void
  setStep: (stepId: number) => void
  reset: () => void
  setForbidenStep: (stepId: number | null) => void
  forbidenStep: number | null
}

export const useItemWizardStore = create<WizardState>(set => ({
  currentStepId: 1,
  forbidenStep: null,
  nextStep: () =>
    set(state => {
      const nextState = state.currentStepId + 1
      if (state.forbidenStep === nextState) {
        return { currentStepId: nextState + 2 }
      }
      return { currentStepId: nextState }
    }),
  prevStep: () =>
    set(state => {
      const nextState = state.currentStepId - 1
      if (state.forbidenStep === nextState) {
        return { currentStepId: nextState - 1 }
      }
      return { currentStepId: nextState }
    }),
  setStep: (stepId: number) => set({ currentStepId: stepId }),
  setForbidenStep: (stepId: number | null) => set({ forbidenStep: stepId }),
  reset: () => set({ currentStepId: 1 })
}))
