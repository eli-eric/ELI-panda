import { create } from 'zustand'

import type { Step } from '../constants/steps'

type WizardState = {
  currentStepId: number
  nextStep: () => void
  prevStep: () => void
  setStep: (stepId: number) => void
  stepPath: Step[]
  setStepPath: (steps: Step[]) => void
  reset: () => void
}

export const useItemWizardStore = create<WizardState>(set => ({
  currentStepId: 1,
  stepPath: [],
  nextStep: () => set(state => ({ currentStepId: state.currentStepId + 1 })),
  prevStep: () => set(state => ({ currentStepId: state.currentStepId - 1 })),
  setStep: (stepId: number) => set({ currentStepId: stepId }),
  setStepPath: (steps: Step[]) => set({ stepPath: steps }),
  reset: () => set({ currentStepId: 1, stepPath: [] })
}))
