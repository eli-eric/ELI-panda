import { type FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import type { ModalButtons } from '@/types/form'

import type { Step } from './constants/steps'
import { useWizard } from './hooks/useWizard'
import { DestinationSystem } from './steps/DestinationSystem'
import { InitWizardPath } from './steps/InitWizardPath'
import { StepIndicator } from './steps/StepsIndicator'

const steps: Step[] = [
  { id: 1, name: 'Init Wizard Path' },
  { id: 2, name: 'Destination System' },
  { id: 3, name: 'Detail information' },
  { id: 4, name: 'Summary' }
]

type Props = {
  setShow: (show: boolean) => void
}

export const ItemMoveForm: FC<Props> = ({ setShow }) => {
  const formMethods = useForm()

  const { handleSubmit } = formMethods

  const submit = data => {
    console.log(data)
  }

  const handleFinish = () => handleSubmit(submit)()

  const handleCancel = () => setShow(false)

  const {
    next,
    back,
    setStep,
    currentStepId,
    nextButtonMessage,
    backButtonMessage
  } = useWizard({
    steps,
    handleFinish,
    handleCancel
  })

  const buttons: ModalButtons = {
    goNext: {
      text: nextButtonMessage,
      onClick: next,
      hidden: currentStepId === 1
    },
    goBack: {
      text: backButtonMessage,
      onClick: back
    }
  }

  return (
    <div>
      <StepIndicator
        steps={steps}
        onStepClick={setStep}
        currentStepId={currentStepId}
      />
      <Form formMethods={formMethods} className="mt-5">
        <div className="h-[451px]">
          {currentStepId === 1 && <InitWizardPath />}
          {currentStepId === 2 && <DestinationSystem />}
        </div>
        <ModalButtonsComponent buttons={buttons} />
      </Form>
    </div>
  )
}
