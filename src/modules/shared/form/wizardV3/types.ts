import type { FieldValues } from 'react-hook-form'

export interface WizardStepProps<T extends FieldValues> {
    id: string
    title: string
    children: React.ReactNode | ((context: WizardStepContext<T>) => React.ReactNode)
    validate?: (data: T) => boolean
    shouldShow?: (data: T) => boolean
    onStepComplete?: (data: T) => void | Promise<void>
    hideDefaultNavigation?: boolean
}

export interface WizardStepContext<T extends FieldValues> {
    values: T
    isValid: boolean
    handleNext: () => void
    handleBack: () => void
    isProcessing: boolean
    isLastStep: boolean
    currentStepIndex: number
}

export interface VisibleStep {
    id: string
    title: string
}
