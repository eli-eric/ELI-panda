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
    <div className="md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]">
      <div className="flex flex-col gap-2">
        <Input {...fields.name} />
        <SystemTypeComboBox systemTypeField={fields.systemType} />
        <Combobox {...fields.responsible} />
        <Input {...fields.systemCode} />
        <Input {...fields.systemAlias} />
        <Combobox {...fields.zone} />
        <SelectLocationTree locationField={fields.location} />
        <Listbox {...fields.systemLevel} customOptions={systemLevels} />
        <Input {...fields.description} />
      </div>

      <div className="flex flex-col gap-2">
        <Listbox {...fields.itemUsage} />
        <Input {...fields.eun} />
        <Input {...fields.partNumber} />
        <Input {...fields.serialNumber} />
        <Input {...fields.catalogueName} />
        <ComboboxTree {...fields.category} />
        <Combobox {...fields.catalogueSupplier} />
        <div className="flex-grow"></div>
      </div>
    </div>
  )
}
