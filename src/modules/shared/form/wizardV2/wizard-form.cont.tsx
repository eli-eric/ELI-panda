import { useMemo, useState } from 'react'
import type {
  DefaultValues,
  FieldValues,
  Path,
  UseFormReset
} from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import FormStep from './components/form-step'
import { StepIndicator } from './components/step-indicator'
import type { WizardStepConfig } from './types'

interface FormWizardProps<T extends FieldValues> {
  steps: WizardStepConfig<T>[]
  onSubmit: (data: T, reset: UseFormReset<T>) => void
  initialData?: Partial<T>
}

export const FormWizard = <T extends Record<string, any>>({
  steps,
  onSubmit,
  initialData
}: FormWizardProps<T>) => {
  const { formatMessage: fm } = useIntl()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const methods = useForm<T>({
    defaultValues: initialData as DefaultValues<T>
  })
  const { handleSubmit, getValues, watch, reset, unregister } = methods

  // Watch all form values to trigger re-calculation of visible steps
  const formValues = watch()

  // Filter out steps that shouldn't be shown
  const visibleSteps = useMemo(
    () => steps.filter(step => !step.shouldShow || step.shouldShow(formValues)),
    [steps, formValues]
  )

  const currentStep = steps[currentStepIndex]

  // Determine if current step is the last VISIBLE step
  const currentStepIndexInVisible = visibleSteps.findIndex(
    step => step.id === currentStep?.id
  )
  const isLastStep = currentStepIndexInVisible === visibleSteps.length - 1

  const isCurrentStepValid = useMemo(() => {
    if (!currentStep) return false
    const currentFields = currentStep.fields

    // Kontrola fields (existující logika)
    if (currentFields) {
      const fieldsValid = currentFields.every(field => {
        if (!field.field.required) {
          return true
        }
        const fieldValue = watch(field.field.name as Path<T>)
        if (Array.isArray(fieldValue)) {
          return fieldValue.length > 0
        }
        return (
          fieldValue !== undefined && fieldValue !== null && fieldValue !== ''
        )
      })
      if (!fieldsValid) return false
    }

    // Kontrola custom validation
    if (currentStep.validation) {
      return currentStep.validation(getValues())
    }

    return true
  }, [currentStep, getValues, watch])

  const handleNext = async () => {
    if (!currentStep) return

    const currentData = getValues()
    // Check if current step has validation
    if (currentStep.validation) {
      const isValid = currentStep.validation(currentData)
      if (!isValid) {
        return
      }
    }

    setIsProcessing(true)
    try {
      // Wait for onStepComplete if it's defined
      if (currentStep.onStepComplete) {
        await currentStep.onStepComplete(currentData, unregister)
      }

      if (isLastStep) {
        handleSubmit(data => onSubmit(data, reset))()
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
    } finally {
      setIsProcessing(false)
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

  if (!currentStep) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        {fm({ id: message.common.forms.loadingStep })}
      </div>
    )
  }

  return (
    <div>
      <StepIndicator
        steps={visibleSteps}
        currentStep={currentStepIndex}
        totalSteps={visibleSteps.length}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(data => onSubmit(data, reset))}>
          <FormStep
            fields={currentStep.fields}
            component={currentStep.component}
          />
          <div className="mt-6 flex justify-between">
            {currentStepIndex > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isProcessing}
              >
                {fm({ id: message.common.forms.previous })}
              </Button>
            ) : (
              <div />
            )}
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isCurrentStepValid || isProcessing}
            >
              {isProcessing ? 'Processing...' : isLastStep ? 'Submit' : 'Next'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
