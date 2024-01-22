import { useCallback } from 'react'

import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { SystemLevel } from '@/types/gql/graphql'
import { classNames } from '@/utils'

import { useSystemsFilterFields } from './SystemsFilter.fields'

export const SystemsFilterForm = () => {
  const fields = useSystemsFilterFields()
  const systemLevels = Object.values(SystemLevel).map(level => level)
  const [filters, setColumnFilters] = useFilters('systems', true)

  const setFilter = useCallback(
    (id: string) => (value: any) => {
      setColumnFilters(prev => {
        const filters = [...prev]
        const index = prev.findIndex(item => item.id === id)
        if (index !== -1) {
          filters[index].value = value
        } else if (value) {
          filters.push({ id, value })
        }
        if (!value) {
          filters.splice(index, 1)
        }
        return filters
      })
    },
    [setColumnFilters]
  )

  const colorByFilter = (id: string) =>
    classNames(filters.find(item => item.id === id)?.value ? 'border-2 border-lime-500' : '')

  return (
    <div className="md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]">
      <div className="flex flex-col gap-2">
        <Input
          {...fields.name}
          onChange={setFilter(fields.name.name)}
          fieldClassName={colorByFilter(fields.name.name)}
        />
        <SystemTypeComboBox
          systemTypeField={fields.systemType}
          clickIcon={true}
          onChange={setFilter(fields.systemType.name)}
        />
        <Combobox {...fields.responsible} onSelect={setFilter(fields.responsible.name)} />
        <Input
          {...fields.systemCode}
          onChange={setFilter(fields.systemCode.name)}
          fieldClassName={colorByFilter(fields.systemCode.name)}
        />
        <Input
          {...fields.systemAlias}
          onChange={setFilter(fields.systemAlias.name)}
          fieldClassName={colorByFilter(fields.systemAlias.name)}
        />
        <Combobox {...fields.zone} onSelect={setFilter(fields.zone.name)} />
        <SelectLocationCombo locationField={fields.location} onSelect={setFilter(fields.location.name)} />
        <Listbox
          {...fields.systemLevel}
          customOptions={systemLevels}
          onChange={v => {
            setFilter(fields.systemLevel.name)(v?.name || null)
          }}
        />
        <Input
          {...fields.description}
          onChange={setFilter(fields.description.name)}
          fieldClassName={colorByFilter(fields.description.name)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Listbox {...fields.itemUsage} onChange={setFilter(fields.itemUsage.name)} />
        <Input {...fields.eun} onChange={setFilter(fields.eun.name)} fieldClassName={colorByFilter(fields.eun.name)} />
        <Input
          {...fields.partNumber}
          onChange={setFilter(fields.partNumber.name)}
          fieldClassName={colorByFilter(fields.partNumber.name)}
        />
        <Input
          {...fields.serialNumber}
          onChange={setFilter(fields.serialNumber.name)}
          fieldClassName={colorByFilter(fields.serialNumber.name)}
        />
        <Input
          {...fields.catalogueName}
          onChange={setFilter(fields.catalogueName.name)}
          fieldClassName={colorByFilter(fields.catalogueName.name)}
        />
        <ComboboxTree {...fields.category} onSelect={setFilter(fields.category.name)} />
        <Combobox {...fields.catalogueSupplier} onSelect={setFilter(fields.catalogueSupplier.name)} />
        <div className="flex-grow"></div>
      </div>
    </div>
  )
}
