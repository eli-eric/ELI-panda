import { type FC, useEffect, useState } from 'react'

import { StepIndicator } from '../wizard/components/StepsIndicator'
import { useWizardStore } from '../wizard/store/useWizardStore'
import type { Step } from '../wizard/types/wizard'
import { InitWizardPath } from './steps/InitWizardPath.step'
import { SummaryStep } from './steps/Summary.step'
import { SystemDetailStep } from './steps/SystemDetail.step'
import { SelectSystemContainer } from './steps/SystemSelect.step'
import { useModalWizardStore } from './store/useModalWizardStore'

const defaultSteps: Step[] = [
  { id: 1, name: 'Select or create' },
  { id: 2, name: 'Parent/Destination System' },
  { id: 3, name: 'System Detail' },
  { id: 4, name: 'Summary' }
]

export const ItemMoveContainer: FC = () => {
  const { isMovingToNewSystem } = useModalWizardStore()
  const { currentStep } = useWizardStore()

  const [steps, setSteps] = useState<Step[]>(defaultSteps)

  useEffect(() => {
    if (isMovingToNewSystem === true) {
      setSteps([
        { id: 1, name: 'Select or create' },
        { id: 2, name: 'Parent System' },
        { id: 3, name: 'System Detail' },
        { id: 4, name: 'Summary' }
      ])
    } else if (isMovingToNewSystem === false) {
      setSteps([
        { id: 1, name: 'Select or create' },
        { id: 2, name: 'Destination System' },
        { id: 3, name: 'System Detail' },
        { id: 4, name: 'Summary' }
      ])
    }
  }, [isMovingToNewSystem])

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <InitWizardPath />
      case 2:
        return <SelectSystemContainer />
      case 3:
        return <SystemDetailStep />
      case 4:
        return <SummaryStep />
      default:
        return <div>Something went wrong</div>
    }
  }

  return (
    <div>
      <StepIndicator steps={steps} />
      {renderStep()}
    </div>
  )
}
