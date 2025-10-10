import { useCallback, useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import Listbox from '@/components/form/Listbox'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { message } from '@/i18n/src/messages'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import type { WizardStepConfig } from '@/modules/shared/form/wizardV2/types'

import { SpareParentSystemSelectTable } from '../components/spare-parent-system-select.table'
import type { SpareAssignmentFormType } from '../types'
import { useSpareAssignmentFields } from './useSpareAssignmentFields'

const messages = message.common.spareAssignment.wizard

// Auto-assign checkbox component (extracted to avoid hooks-in-callback issue)
const AutoAssignCheckbox = ({ label }: { label: string }) => {
  const { setValue } = useFormContext()
  const autoAssignParent = useWatch({ name: 'autoAssignParent' })

  const handleChange = (checked: boolean) => {
    setValue('autoAssignParent', checked, { shouldValidate: true })
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="autoAssignParent"
        checked={autoAssignParent}
        onCheckedChange={handleChange}
      />
      <Label
        htmlFor="autoAssignParent"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {label}
      </Label>
    </div>
  )
}

export const useSpareAssignmentSteps = () => {
  const { formatMessage: fm } = useIntl()
  const fields = useSpareAssignmentFields()

  // Callback for shouldShow to avoid inline function
  const shouldShowParentSelection = useCallback(
    (data: Partial<SpareAssignmentFormType>) => !data.autoAssignParent,
    []
  )

  // Memoize components before using them in steps
  const conditionListbox = useMemo(
    () => <Listbox {...fields.oldItemCondition} />,
    [fields.oldItemCondition]
  )

  const locationCombo = useMemo(
    () => (
      <SelectLocationCombo
        locationField={fields.newItemLocation}
        disabled={fields.newItemLocation.disabled}
      />
    ),
    [fields.newItemLocation]
  )

  const autoAssignCheckbox = useMemo(
    () => <AutoAssignCheckbox label={fields.autoAssignParent.label || ''} />,
    [fields.autoAssignParent.label]
  )

  // Step configuration
  const steps = useMemo<WizardStepConfig<SpareAssignmentFormType>[]>(() => {
    return [
      {
        id: 'itemSettings',
        title: fm({ id: messages.steps.step1.title }),
        fields: [
          {
            componentType: 'component',
            field: fields.oldItemCondition,
            component: conditionListbox
          },
          {
            componentType: 'component',
            field: fields.newItemLocation,
            component: locationCombo
          },
          {
            componentType: 'component',
            field: fields.autoAssignParent,
            component: autoAssignCheckbox
          }
        ]
      },
      {
        id: 'parentSystemSelection',
        title: fm({ id: messages.steps.step2.title }),
        component: <SpareParentSystemSelectTable />,
        shouldShow: shouldShowParentSelection
        // Note: validation removed - happens at submit time since table state
        // changes don't trigger wizard re-validation
      }
    ]
  }, [
    fm,
    fields.oldItemCondition,
    fields.newItemLocation,
    fields.autoAssignParent,
    conditionListbox,
    locationCombo,
    autoAssignCheckbox,
    shouldShowParentSelection
  ])

  return steps
}
