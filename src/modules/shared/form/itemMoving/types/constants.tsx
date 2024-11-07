import type { Step } from '../../wizard/types/wizard'
import { InitWizardPath } from '../steps/InitWizardPath.step'
import { OldItemDestinationStep } from '../steps/OldItemDestination.step'
import { SummaryStep } from '../steps/Summary.step'
import { SystemDetailStep } from '../steps/SystemDetail.step'
import { SelectSystemContainer } from '../steps/SystemSelect.step'

export enum MOVE_TYPE {
  NEW_SYSTEM = 'new-system',
  DESTINATION_SYSTEM = 'destination-system',
  EXCHANGE = 'exchange',
  DEFAULT = 'default'
}

export const stepComponentsMap = {
  [MOVE_TYPE.NEW_SYSTEM]: {
    1: <InitWizardPath />,
    2: <SelectSystemContainer />,
    3: <SystemDetailStep />,
    4: <SummaryStep />
  },
  [MOVE_TYPE.DESTINATION_SYSTEM]: {
    1: <InitWizardPath />,
    2: <SelectSystemContainer />,
    3: <SystemDetailStep />,
    4: <SummaryStep />
  },
  [MOVE_TYPE.EXCHANGE]: {
    1: <InitWizardPath />,
    2: <SelectSystemContainer />,
    3: <SystemDetailStep />,
    4: <OldItemDestinationStep />,
    5: <SummaryStep />
  },
  [MOVE_TYPE.DEFAULT]: {
    1: <InitWizardPath />,
    2: <SelectSystemContainer />,
    3: <SystemDetailStep />,
    4: <SummaryStep />
  }
}

export const defaultSteps: Step[] = [
  { id: 1, name: 'Select or create' },
  { id: 2, name: 'Parent/Destination System' },
  { id: 3, name: 'System Detail' },
  { id: 4, name: 'Summary' }
]

export const newSystemSteps: Step[] = [
  { id: 1, name: 'Select or create' },
  { id: 2, name: 'Parent System' },
  { id: 3, name: 'System Detail' },
  { id: 4, name: 'Summary' }
]

export const destinationSystemSteps: Step[] = [
  { id: 1, name: 'Select or create' },
  { id: 2, name: 'Destination System' },
  { id: 3, name: 'System Detail' },
  { id: 4, name: 'Summary' }
]

export const exchangeSteps: Step[] = [
  { id: 1, name: 'Select or create' },
  { id: 2, name: 'Destination System' },
  { id: 3, name: 'System Detail' },
  { id: 4, name: 'Select Parent for old Item' },
  { id: 5, name: 'Summary' }
]
