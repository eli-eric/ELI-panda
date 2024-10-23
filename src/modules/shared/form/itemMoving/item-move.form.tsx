import { type FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import type { ModalButtons } from '@/types/form'

import type { Step } from './constants/steps'
import { useWizard } from './hooks/useWizard'
import { DestinationSystem } from './steps/DestinationSystem'
import { SelectOrCreate } from './steps/SelectOrCreate'
import { StepIndicator } from './steps/StepsIndicator'

const steps: Step[] = [
  { id: 1, name: 'Select or create' },
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

  const handleFinish = () =>
    handleSubmit(data => {
      console.log(data)
      setShow(false)
    })

  const {
    next,
    back,
    setStep,
    currentStepId,
    nextButtonMessage,
    backButtonMessage
  } = useWizard({
    steps,
    handleFinish: () => console.log('Finish'),
    handleCancel: () => setShow(false)
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
        {currentStepId === 1 && <SelectOrCreate />}
        {currentStepId === 2 && <DestinationSystem />}
        <ModalButtonsComponent buttons={buttons} />
      </Form>
    </div>
  )
}
