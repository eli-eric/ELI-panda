import { useFormContext, useWatch } from 'react-hook-form'

import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { useSystemItemStore } from '@/modules/systemItem/store/useSystemItemStore'
import { SystemLevel } from '@/types/gql/graphql'

import useSystemFormFields from '../SystemForm.fields'
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
          <Input {...fields.name} className="text-base font-medium" />
          <SystemTypeComboBox systemTypeField={fields.systemType} />
          <Listbox
            {...fields.systemLevel}
            customOptions={systemLevels}
            defaultValue={systemLevel || SystemLevel.SubsystemsAndParts}
          />
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Input {...fields.systemCode} defaultValue="" />
            </div>
            <div className="flex-shrink-0">
              <SystemCodeButton />
            </div>
          </div>
          {/* Key System Attribute */}
          {systemLevel === SystemLevel.KeySystems && (
            <Listbox {...fields.attribute} />
          )}
        </div>
      </div>

      {/* Location & Team */}
      <div className="space-y-3">
        <div className="space-y-3">
          <SelectLocationCombo
            locationField={fields.location}
            disabled={fields.location.disabled}
          />
          <div className="w-full overflow-hidden">
            <Combobox {...fields.zone} />
          </div>
          <Combobox {...fields.team} limit={50} />
          <Combobox {...fields.responsible} />
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
        <TextArea {...fields.description} rows={3} className="w-full" />
      </div>
    </div>
  )
}
