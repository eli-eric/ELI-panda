import { useFormContext, useWatch } from 'react-hook-form'

import { useSystemItemStore } from '@/modules/systemItem/store/useSystemItemStore'
import { SystemLevel } from '@/types/gql/graphql'

import useSystemFormFields from '../SystemForm.fields'
import {
  InlineEditCombobox,
  InlineEditInput,
  InlineEditListbox,
  InlineEditLocation,
  InlineEditSystemType,
  InlineEditTextArea
} from './inline-edit'
import { PersonnelSection } from './PersonnelSection'
import { SystemCodeButton } from './SystemCodeGenerate.button'

export const SystemMainForm = () => {
  const fields = useSystemFormFields()
  const {
    setNewMaintainedBy,
    setDisconnectMaintainedBy,
    setNewOperator,
    setDisconnectOperator
  } = useSystemItemStore()
  const { control } = useFormContext()

  const systemLevel = useWatch({ control, name: 'systemLevel' })

  const maintainedBy = useWatch({ control, name: 'maintainedBy' })
  const operators = useWatch({ control, name: 'operators' })
  const systemLevels = Object.values(SystemLevel).map(level => level)

  return (
    <div className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-3">
        <div className="space-y-3">
          <InlineEditInput {...fields.name} />
          <InlineEditSystemType {...fields.systemType} />
          <InlineEditListbox
            {...fields.systemLevel}
            customOptions={systemLevels}
            defaultValue={systemLevel || SystemLevel.SubsystemsAndParts}
          />
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <InlineEditInput {...fields.systemCode} />
            </div>
            <div className="flex-shrink-0">
              <SystemCodeButton />
            </div>
          </div>
          {/* Key System Attribute */}
          {systemLevel === SystemLevel.KeySystems && (
            <InlineEditListbox {...fields.attribute} />
          )}
        </div>
      </div>

      {/* Location & Team */}
      <div className="space-y-3">
        <div className="space-y-3">
          <InlineEditLocation {...fields.location} />
          <div className="w-full overflow-hidden">
            <InlineEditCombobox {...fields.zone} />
          </div>
          <InlineEditCombobox {...fields.team} limit={50} />
          <InlineEditCombobox {...fields.responsible} />
        </div>
      </div>

      {/* Personnel */}
      {systemLevel !== SystemLevel.SubsystemsAndParts && (
        <div className="space-y-4">
          <PersonnelSection
            name="operators"
            label="Authorized Operators"
            data={operators || []}
            setNewEmployee={setNewOperator}
            setDisconnectEmployee={setDisconnectOperator}
          />
          <PersonnelSection
            name="maintainedBy"
            label="Maintained By"
            data={maintainedBy || []}
            setNewEmployee={setNewMaintainedBy}
            setDisconnectEmployee={setDisconnectMaintainedBy}
          />
        </div>
      )}

      {/* Description */}
      <div className="space-y-3">
        <InlineEditTextArea {...fields.description} rows={3} />
      </div>
    </div>
  )
}
