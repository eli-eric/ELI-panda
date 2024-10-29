import { type FC, useEffect, useState } from 'react'

import { StepIndicator } from '../wizard/components/StepsIndicator'
import { useWizard } from '../wizard/hooks/useWizard'
import type { Step } from './constants/steps'
import { InitWizardPath } from './steps/InitWizardPath.step'
import { SummaryStep } from './steps/Summary.step'
import { SelectSystemContainer } from './steps/system-selection/SystemSelect.cont'
import { SystemDetailStep } from './steps/SystemDetail.step'
import { useModalWizardStore } from './store/useModalWizardStore'

const defaultSteps: Step[] = [
  { id: 1, name: 'Select or create' },
  { id: 2, name: 'Parent/Destination System' },
  { id: 3, name: 'System Detail' },
  { id: 4, name: 'Summary' }
]

export const ItemMoveForm: FC = () => {
  const handleFinish = () => {}

  const { isMovingToNewSystem } = useModalWizardStore()

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

  const handleCancel = () => {}

  const { currentStep } = useWizard({
    steps,
    handleFinish,
    handleCancel
  })

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
        return <div>Smth went wrong</div>
    }
  }

  return (
    <div>
      <StepIndicator steps={steps} />
      {renderStep()}
    </div>
  )
}
