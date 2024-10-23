import { type FC, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import type { ModalButtons } from '@/types/form'

import { DestinationSystem } from './steps/DestinationSystem'
import { StepIndicator } from './steps/StepsIndicator'

const steps = [
  { id: 1, name: 'Select or create' },
  { id: 2, name: 'Destination System' },
  { id: 3, name: 'Detail information' },
  { id: 4, name: 'Summary' }
]

export const ItemMoveForm: FC = () => {
  const formMethods = useForm()
  const [currentStepId, setCurrentStepId] = useState(1)

  const handleStepClick = (stepId: number) => {
    // handle step click
    console.log('Step Clicked:', stepId)
  }

  const handleNext = () => {
    // handle next
    setCurrentStepId(prev => {
      const nextStep = prev + 1
      const lastStepId = steps[steps.length - 1]?.id
      if (nextStep > lastStepId) {
        return lastStepId
      }
      return nextStep
    })
  }

  const handleBack = () => {
    // handle back
    setCurrentStepId(prev => {
      const prevStep = prev - 1
      if (prevStep < 1) {
        return 1
      }
      return prevStep
    })
  }

  const buttons: ModalButtons = {
    goNext: {
      text: 'Next',
      onClick: handleNext
    },
    goBack: {
      text: 'Back',
      onClick: handleBack
    }
  }

  return (
    <div>
      <StepIndicator
        steps={steps}
        onStepClick={handleStepClick}
        currentStepId={currentStepId}
      />
      <Form formMethods={formMethods}>
        {currentStepId === 1 && <DestinationSystem />}
        <ModalButtonsComponent buttons={buttons} />
      </Form>
    </div>
  )
}
