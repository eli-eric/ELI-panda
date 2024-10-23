import { message } from '@/i18n/src/messages'

import { useWizardStore } from '../store/useWizardStore'
import type { Step } from '../types/wizard'

type WizzardSettings = {
  steps: Step[]
  handleFinish: (formData: any) => void
  handleCancel: () => void
}

const messages = message.common.buttons

export const useWizard = ({
  steps,
  handleFinish,
  handleCancel
}: WizzardSettings) => {
  const { currentStep, setNextStep, setPrevStep, formData, resetWizard } =
    useWizardStore()

  const lastStepId = steps.length

  const handleNext = () => {
    if (currentStep === steps.length) {
      handleFinish(formData)
    } else {
      setNextStep()
    }
  }

  const handleBack = () => {
    if (currentStep === 1) {
      resetWizard()
      handleCancel()
    } else {
      setPrevStep()
    }
  }

  return {
    next: handleNext,
    back: handleBack,
    currentStep,
    nextButtonMessage:
      currentStep === lastStepId ? messages.finish : messages.next,
    backButtonMessage: currentStep === 1 ? messages.cancel : messages.back
  }
}
