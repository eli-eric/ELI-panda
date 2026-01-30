import { Grid } from '@/components/grid/Grid'

import type { WizardField } from '../types'
import { StepField } from './step-field'

interface FormStepProps {
    fields?: WizardField[]
    component?: React.ReactElement
}

export default function FormStep({ fields, component }: FormStepProps) {
    if (component) {
        return component
    }

    return (
        <Grid>
            {fields?.map(field => (
                <StepField key={field.field.name} field={field} />
            ))}
        </Grid>
    )
}
