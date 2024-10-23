import type { FC } from 'react'
import { Fragment } from 'react'

import { useWizardStore } from '../store/useWizardStore'
import type { Step } from '../types/wizard'

type Props = {
  steps: Step[]
}

export const StepIndicator: FC<Props> = ({ steps }) => {
  const { currentStep, setCurrentStep } = useWizardStore()
  const currentIndex = steps.findIndex(step => step.id === currentStep)

  const onStepClick = (id: number) => {
    setCurrentStep(id)
  }

  return (
    <div className="flex items-center w-full pb-4 border-b">
      {steps.map((step, index) => {
        const isActive = index === currentIndex
        const isCompleted = index < currentIndex

        return (
          <Fragment key={step.id}>
            {/* Step Circle and Name */}
            <div
              className="flex flex-col items-center cursor-pointer pr-2 pl-2"
              onClick={() => onStepClick(step.id)}
            >
              <div
                className={`w-5 h-5 text-sm rounded-full flex items-center justify-center text-white transition-colors duration-200 ${
                  isActive
                    ? 'bg-orange-500'
                    : isCompleted
                      ? 'bg-orange-500'
                      : 'bg-gray-300 hover:bg-gray-400 dark:text-gray-900'
                }`}
              >
                {index + 1}
              </div>
              <div className="mt-1 text-sm font-medium text-center text-gray-900 dark:text-gray-200">
                {step.name}
              </div>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center">
                <div
                  className={`h-1 ${isCompleted ? 'bg-orange-500' : 'bg-gray-300'} w-full`}
                ></div>
                <svg
                  className={`w-4 h-4 ${
                    isCompleted ? 'text-orange-500' : 'text-gray-300'
                  }`}
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <polygon points="0,0 10,5 0,10" fill="currentColor" />
                </svg>
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
