import { type FC, useEffect } from 'react'

import { useModalWizardStore } from '../itemMoving/store/useModalWizardStore'
import {
  assignSteps,
  MOVE_TYPE,
  stepComponentsMap
} from '../itemMoving/types/constants'
import { StepIndicator } from '../wizard/components/StepsIndicator'
import { useWizardStore } from '../wizard/store/useWizardStore'

export const ItemAssignContainer: FC = () => {
  const { moveType, setMoveType } = useModalWizardStore()
  const { currentStep } = useWizardStore()

  useEffect(() => {
    setMoveType(MOVE_TYPE.ASSIGN)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <StepIndicator steps={assignSteps} />
      {stepComponentsMap[moveType]?.[currentStep]}
    </div>
  )
}
