// stores/useWizardStore.ts

import { create } from 'zustand'

interface WizardState {
  currentStep: number
  formData: Record<string, any>
  setCurrentStep: (step: number) => void
  setNextStep: () => void
  setPrevStep: () => void
  updateFormData: (data: Record<string, any>) => void
  resetWizard: () => void
}

export const useWizardStore = create<WizardState>(set => ({
  currentStep: 1,
  formData: {},
  setNextStep: () => set(state => ({ currentStep: state.currentStep + 1 })),
  setPrevStep: () => set(state => ({ currentStep: state.currentStep - 1 })),
  setCurrentStep: step => set({ currentStep: step }),
  updateFormData: data =>
    set(state => ({ formData: { ...state.formData, ...data } })),
  resetWizard: () => set({ currentStep: 1, formData: {} })
}))
