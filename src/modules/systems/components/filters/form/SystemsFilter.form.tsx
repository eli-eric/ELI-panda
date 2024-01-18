import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { SelectLocationTree } from '@/modules/shared/form/location/SelectLocation.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { SystemLevel } from '@/types/gql/graphql'

import { useSystemsFilterFields } from './SystemsFilter.fields'

export const SystemsFilterForm = () => {
  const fields = useSystemsFilterFields()
  const systemLevels = Object.values(SystemLevel).map(level => level)

  return (
    <div>
      <Input {...fields.name} />
      <Listbox {...fields.systemLevel} customOptions={systemLevels} />
      <Input {...fields.systemCode} />
      <Input {...fields.systemAlias} />
      <SystemTypeComboBox systemTypeField={fields.systemType} />
      <Combobox {...fields.zone} />
      <SelectLocationTree locationField={fields.location} />
      <Combobox {...fields.responsible} />
      <Input {...fields.description} />
      <Listbox {...fields.importance} />
      <div className="text-base font-semibold leading-6 pt-4 pb-4 text-gray-900">{'Physical Item filter'}</div>
      <Listbox {...fields.itemUsage} />
      <Input {...fields.eun} />
      <Input {...fields.serialNumber} />
      <Input {...fields.catalogueName} />
      <ComboboxTree {...fields.category} />

      <Input {...fields.partNumber} />
      <Combobox {...fields.catalogueSupplier} />
    </div>
  )
}
