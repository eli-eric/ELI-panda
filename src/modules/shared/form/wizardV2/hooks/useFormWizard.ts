import { useState } from 'react'

export default function useFormWizard(totalSteps: number) {
    const [currentStep, setCurrentStep] = useState(0)

    const next = () => {
        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1))
    }

    const prev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0))
    }

    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === totalSteps - 1

    return {
        currentStep,
        next,
        prev,
        isFirstStep,
        isLastStep,
    }
}
