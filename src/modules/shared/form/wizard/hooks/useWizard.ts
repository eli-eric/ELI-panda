import { useWizardStore } from '../store/useWizardStore'
import type { Step } from '../types/wizard'

type WizzardSettings = {
  steps: Step[]
  handleFinish: (formData: any) => void
  handleCancel: () => void
}

export const useWizard = ({
  steps,
  handleFinish,
  handleCancel
}: WizzardSettings) => {
  const { currentStep, goNext, goBack, formData, resetWizard } =
    useWizardStore()

  const handleNext = () => {
    if (currentStep === steps.length) {
      handleFinish(formData)
    } else {
      goNext()
    }
  }

  const handleBack = () => {
    if (currentStep === 1) {
      resetWizard()
      handleCancel()
    } else {
      goBack()
    }
  }

  return {
    goNext: handleNext,
    goBack: handleBack,
    currentStep
  }
}
