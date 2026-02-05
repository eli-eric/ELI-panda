import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col } from '@/components/grid/Grid'

import { SelectSystemComboBox } from '../../systemSelect/SelectSystem.combo'
import type { WizardField } from '../types'

interface StepFieldProps {
    field: WizardField
}
export const StepField = ({ field }: StepFieldProps) => {
    const { colSpan = 12 } = field
    switch (field.componentType) {
        case 'input':
            return (
                <Col md={colSpan} sm={12}>
                    <Input {...field.field} rounded="rounded-md" />
                </Col>
            )
        case 'component':
            return (
                <Col md={colSpan} sm={12}>
                    {field.component}
                </Col>
            )
        case 'textarea':
            return (
                <Col md={colSpan} sm={12}>
                    <TextArea {...field.field} rounded="rounded-md" />
                </Col>
            )
        case 'select':
            return (
                <Col md={colSpan} sm={12}>
                    <Listbox {...field.field} />
                </Col>
            )
        case 'combo':
            return (
                <Col md={colSpan} sm={12}>
                    <Combobox {...field.field} />
                </Col>
            )
        case 'combo-system':
            return (
                <Col md={colSpan} sm={12}>
                    <SelectSystemComboBox selectSystemField={{ ...field.field }} />
                </Col>
            )
        default:
            return null
    }
}
