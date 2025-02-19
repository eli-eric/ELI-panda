import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/Buttons'

import FormStep from './components/form-step'
import { StepIndicator } from './components/step-indicator'
import useFormWizard from './hooks/useFormWizard'
import type { WizardStep } from './types'

interface FormWizardProps {
  steps: WizardStep[]
  onSubmit: (data: any) => void
}

export const FormWizard = ({ steps, onSubmit }: FormWizardProps) => {
  const methods = useForm()
  const { watch } = methods
  const { currentStep, isFirstStep, isLastStep, next, prev } = useFormWizard(
    steps.length
  )

  // check if the current step is valid
  const isCurrentStepValid = () => {
    const currentFields = steps[currentStep].fields
    return currentFields.every(field => {
      if (!field.field.required) {
        return true
      }
      const fieldValue = watch(field.field.name)
      return fieldValue !== undefined && fieldValue !== ''
    })
  }

  // handle form submit
  const handleSubmit = methods.handleSubmit(data => {
    if (isLastStep) {
      onSubmit(data)
    } else {
      next()
    }
  })

  return (
    <div className="">
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        totalSteps={steps.length}
      />
      <h2 className="text-2xl font-semibold mb-4">
        {steps[currentStep].title}
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <FormStep fields={steps[currentStep].fields} />
          <div className="mt-6 flex justify-between">
            {!isFirstStep ? (
              <Button type="button" buttonSize="large" onClick={prev}>
                Previous
              </Button>
            ) : (
              <div />
            )}
            <Button
              buttonSize="large"
              primary={isLastStep}
              type="submit"
              disabled={!isCurrentStepValid()}
            >
              {isLastStep ? 'Submit' : 'Next'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
