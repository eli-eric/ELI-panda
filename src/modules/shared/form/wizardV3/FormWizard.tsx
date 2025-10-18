import type { ReactElement } from 'react'
import { Children, useMemo, useState } from 'react'
import type { DefaultValues, FieldValues, UseFormReset } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import { StepIndicator } from './components/StepIndicator'
import type { VisibleStep, WizardStepProps } from './types'

interface FormWizardProps<T extends FieldValues> {
  children: ReactElement<WizardStepProps<T>>[]
  onSubmit: (data: T, reset: UseFormReset<T>) => void | Promise<void>
  initialValues?: Partial<T>
}

export const FormWizard = <T extends FieldValues>({
  children,
  onSubmit,
  initialValues
}: FormWizardProps<T>) => {
  const { formatMessage: fm } = useIntl()
  const [currentAllStepsIndex, setCurrentAllStepsIndex] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const methods = useForm<T>({
    defaultValues: initialValues as DefaultValues<T>,
    mode: 'onChange'
  })

  const { handleSubmit, watch, reset } = methods
  const formValues = watch()

  // Extract step configurations from children
  const steps = useMemo(() => {
    return Children.map(children, child => child.props) || []
  }, [children])

  // Filter visible steps based on shouldShow
  const visibleSteps = useMemo<VisibleStep[]>(() => {
    return steps
      .filter(step => !step.shouldShow || step.shouldShow(formValues as T))
      .map(step => ({ id: step.id, title: step.title }))
  }, [steps, formValues])

  const currentStep = steps[currentAllStepsIndex]
  const currentVisibleStepIndex = visibleSteps.findIndex(
    step => step.id === currentStep?.id
  )
  const isLastStep = currentVisibleStepIndex === visibleSteps.length - 1

  // Check if current step is valid
  const isCurrentStepValid = useMemo(() => {
    if (!currentStep) return false
    if (currentStep.validate) {
      return currentStep.validate(formValues as T)
    }
    return true
  }, [currentStep, formValues])

  const handleNext = async () => {
    if (!currentStep) return

    setIsProcessing(true)
    setError(null) // Clear previous errors

    try {
      // Call onStepComplete if defined
      if (currentStep.onStepComplete) {
        await currentStep.onStepComplete(formValues as T)
      }

      if (isLastStep) {
        // Submit the form
        await handleSubmit(data => onSubmit(data, reset))()
      } else {
        // Find next visible step
        let nextIndex = currentAllStepsIndex + 1
        while (nextIndex < steps.length) {
          const nextStep = steps[nextIndex]
          if (!nextStep.shouldShow || nextStep.shouldShow(formValues as T)) {
            break
          }
          nextIndex++
        }
        setCurrentAllStepsIndex(nextIndex)
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      // eslint-disable-next-line no-console
      console.error('Wizard step error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBack = () => {
    // Find previous visible step
    let prevIndex = currentAllStepsIndex - 1
    while (prevIndex >= 0) {
      const prevStep = steps[prevIndex]
      if (!prevStep.shouldShow || prevStep.shouldShow(formValues as T)) {
        break
      }
      prevIndex--
    }
    setCurrentAllStepsIndex(Math.max(0, prevIndex))
    setError(null) // Clear errors when going back
  }

  if (!currentStep) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        {fm({ id: message.common.forms.loadingStep })}
      </div>
    )
  }

  // Render current step content
  const stepContent =
    typeof currentStep.children === 'function'
      ? currentStep.children({
          values: formValues as T,
          isValid: isCurrentStepValid
        })
      : currentStep.children

  return (
    <div>
      <StepIndicator
        steps={visibleSteps}
        currentStep={currentVisibleStepIndex}
        totalSteps={visibleSteps.length}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(data => onSubmit(data, reset))}>
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="py-6">{stepContent}</div>
          <div className="mt-6 flex justify-between">
            {currentAllStepsIndex > 0 ? (
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
              {isProcessing
                ? 'Processing...'
                : isLastStep
                  ? 'Submit'
                  : 'Next'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
