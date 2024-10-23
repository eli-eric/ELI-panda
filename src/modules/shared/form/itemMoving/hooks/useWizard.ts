import { message } from '@/i18n/src/messages'

import type { Step } from '../constants/steps'
import { useItemWizardStore } from '../store/useItemWizardState'

type WizzardSettings = {
  steps: Step[]
  handleFinish: () => void
  handleCancel: () => void
}

const messages = message.common.buttons

export const useWizard = ({
  steps,
  handleFinish,
  handleCancel
}: WizzardSettings) => {
  const { setStep, nextStep, prevStep, currentStepId } = useItemWizardStore()

  const lastStepId = steps.length

  const handleNext = () => {
    if (currentStepId === steps.length) {
      handleFinish()
    } else {
      nextStep()
    }
  }

  const handleBack = () => {
    if (currentStepId === 1) {
      handleCancel()
    } else {
      prevStep()
    }
  }

  return {
    setStep,
    next: handleNext,
    back: handleBack,
    currentStepId,
    nextButtonMessage:
      currentStepId === lastStepId ? messages.finish : messages.next,
    backButtonMessage: currentStepId === 1 ? messages.cancel : messages.back
  }
}
