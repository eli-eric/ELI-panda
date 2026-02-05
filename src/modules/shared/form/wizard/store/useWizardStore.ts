// stores/useWizardStore.ts

import { create } from 'zustand'

interface WizardState {
    currentStep: number
    formData: Record<string, any>
    setCurrentStep: (step: number) => void
    goNext: () => void
    goBack: () => void
    updateFormData: (data: Record<string, any>) => void
    setFormData: (data: Record<string, any>) => void
    resetWizard: () => void
}

export const useWizardStore = create<WizardState>(set => ({
    currentStep: 1,
    formData: {},
    goNext: () => set(state => ({ currentStep: state.currentStep + 1 })),
    goBack: () => set(state => ({ currentStep: state.currentStep - 1 })),
    setCurrentStep: step => set({ currentStep: step }),
    updateFormData: data => set(state => ({ formData: { ...state.formData, ...data } })),
    setFormData: data => set({ formData: data }),
    resetWizard: () => set({ currentStep: 1, formData: {} }),
}))
