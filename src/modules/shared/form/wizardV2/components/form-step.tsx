import type { WizardField } from '../types'
import { StepField } from './step-field'

interface FormStepProps {
  fields: WizardField[]
}

export default function FormStep({ fields }: FormStepProps) {
  return (
    <div className="space-y-4">
      {fields.map(field => (
        <StepField key={field.field.name} field={field} />
      ))}
    </div>
  )
}
