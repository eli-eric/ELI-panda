import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'

import { SelectSystemComboBox } from '../../systemSelect/SelectSystem.combo'
import type { WizardField } from '../types'

interface StepFieldProps {
  field: WizardField
}
export const StepField = ({ field }: StepFieldProps) => {
  switch (field.componentType) {
    case 'input':
      return <Input {...field.field} rounded="rounded-md" />
    case 'component':
      return <>{field.component}</>
    case 'textarea':
      return <TextArea {...field.field} rounded="rounded-md" />
    case 'select':
      return <Listbox {...field.field} />
    case 'combo':
      return <Combobox {...field.field} />
    case 'combo-system':
      return <SelectSystemComboBox selectSystemField={{ ...field.field }} />
    default:
      return null
  }
}
