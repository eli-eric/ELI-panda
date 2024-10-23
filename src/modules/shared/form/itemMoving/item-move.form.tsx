import { type FC } from 'react'

import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import type { ModalButtons } from '@/types/form'

import { StepIndicator } from '../wizard/components/StepsIndicator'
import { useWizard } from '../wizard/hooks/useWizard'
import type { Step } from './constants/steps'
import { DestinationSystem } from './steps/DestinationSystem'
import { InitWizardPath } from './steps/InitWizardPath'

const steps: Step[] = [
  { id: 1, name: 'Select or create' },
  { id: 2, name: 'Parent/Destination System' },
  { id: 3, name: 'System Detail' },
  { id: 4, name: 'Summary' }
]

type Props = {
  setShow: (show: boolean) => void
}

export const ItemMoveForm: FC<Props> = ({ setShow }) => {
  const handleFinish = () => setShow(false)

  const handleCancel = () => setShow(false)

  const { next, back, currentStep, nextButtonMessage, backButtonMessage } =
    useWizard({
      steps,
      handleFinish,
      handleCancel
    })

  const buttons: ModalButtons = {
    goNext: {
      text: nextButtonMessage,
      onClick: next,
      hidden: currentStep === 1
    },
    goBack: {
      text: backButtonMessage,
      onClick: back
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InitWizardPath />
      case 2:
        return <DestinationSystem />
      case 3:
        return <div>System Detail</div>
      case 4:
        return <div>Summary</div>
      default:
        return <div>Smth went wrong</div>
    }
  }

  return (
    <div>
      <StepIndicator steps={steps} />
      <div className="h-[451px]">{renderStep()}</div>
      <ModalButtonsComponent buttons={buttons} />
    </div>
  )
}
