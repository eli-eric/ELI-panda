import { type FC, useEffect, useState } from 'react'

import { StepIndicator } from '../wizard/components/StepsIndicator'
import { useWizardStore } from '../wizard/store/useWizardStore'
import type { Step } from '../wizard/types/wizard'
import { useModalWizardStore } from './store/useModalWizardStore'
import {
  defaultSteps,
  destinationSystemSteps,
  exchangeSteps,
  MOVE_TYPE,
  newSystemSteps,
  stepComponentsMap
} from './types/constants'

export const ItemMoveContainer: FC = () => {
  const { moveType } = useModalWizardStore()
  const { currentStep } = useWizardStore()

  const [steps, setSteps] = useState<Step[]>(defaultSteps)

  const getSteps = (moveType: MOVE_TYPE): Step[] => {
    switch (moveType) {
      case MOVE_TYPE.NEW_SYSTEM:
        return newSystemSteps
      case MOVE_TYPE.DESTINATION_SYSTEM:
        return destinationSystemSteps
      case MOVE_TYPE.EXCHANGE:
        return exchangeSteps
      case MOVE_TYPE.DEFAULT:
        return defaultSteps
      default:
        return defaultSteps
    }
  }

  useEffect(() => {
    const steps = getSteps(moveType)
    setSteps(steps)
  }, [moveType])

  return (
    <div>
      <StepIndicator steps={steps} />
      {stepComponentsMap[moveType]?.[currentStep]}
    </div>
  )
}
