import { useState } from 'react'
import type { DefaultValues, Path } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'

import { Button } from '@/components/Buttons'

import FormStep from './components/form-step'
import { StepIndicator } from './components/step-indicator'
import type { WizardStepConfig } from './types'

interface FormWizardProps<T> {
  steps: WizardStepConfig<T>[]
  onSubmit: (data: T) => void
  initialData?: Partial<T>
}

export const FormWizard = <T extends Record<string, any>>({
  steps,
  onSubmit,
  initialData
}: FormWizardProps<T>) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const methods = useForm<T>({
    defaultValues: initialData as DefaultValues<T>
  })
  const { handleSubmit, getValues, watch } = methods

  const currentStep = steps[currentStepIndex]
  const isLastStep = currentStepIndex === steps.length - 1

  const isCurrentStepValid = () => {
    const currentFields = steps[currentStepIndex].fields
    return currentFields.every(field => {
      if (!field.field?.required) {
        return true
      }
      const fieldValue = watch(field.field.name as Path<T>)
      return fieldValue !== undefined && fieldValue !== ''
    })
  }

  const handleNext = () => {
    const currentData = getValues()
    // Check if current step has validation
    if (currentStep.validation) {
      const isValid = currentStep.validation(currentData)
      if (!isValid) {
        // Handle validation failure (maybe show an error message)
        return
      }
    }
    // Call onStepComplete if defined
    currentStep.onStepComplete?.(currentData)
    if (isLastStep) {
      handleSubmit(onSubmit)()
    } else {
      // Find next visible step
      let nextIndex = currentStepIndex + 1
      while (nextIndex < steps.length) {
        const nextStep = steps[nextIndex]
        if (!nextStep.shouldShow || nextStep.shouldShow(currentData)) {
          break
        }
        nextIndex++
      }
      setCurrentStepIndex(nextIndex)
    }
  }

  const handleBack = () => {
    // Find previous visible step
    let prevIndex = currentStepIndex - 1
    while (prevIndex >= 0) {
      const prevStep = steps[prevIndex]
      if (!prevStep.shouldShow || prevStep.shouldShow(getValues())) {
        break
      }
      prevIndex--
    }
    setCurrentStepIndex(Math.max(0, prevIndex))
  }

  // Filter out steps that shouldn't be shown
  const visibleSteps = steps.filter(
    step => !step.shouldShow || step.shouldShow(getValues())
  )

  return (
    <div className="">
      <StepIndicator
        steps={visibleSteps}
        currentStep={currentStepIndex}
        totalSteps={visibleSteps.length}
      />
      <h2 className="text-2xl font-semibold mb-4">{currentStep.title}</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormStep fields={currentStep.fields} />
          <div className="mt-6 flex justify-between">
            {currentStepIndex > 0 ? (
              <Button type="button" buttonSize="large" onClick={handleBack}>
                Previous
              </Button>
            ) : (
              <div />
            )}
            <Button
              buttonSize="large"
              primary={isLastStep}
              type="button"
              onClick={handleNext}
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
