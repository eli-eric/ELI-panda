import type { FieldValues } from 'react-hook-form'

import type { WizardStepProps } from './types'

/**
 * WizardStep component - used as a child of FormWizard
 * This component doesn't render anything directly - its props are extracted by FormWizard
 */
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WizardStep = <T extends FieldValues>(_props: WizardStepProps<T>) => {
  return null
}
