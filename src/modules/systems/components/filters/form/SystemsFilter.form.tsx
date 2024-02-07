import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { FilterCheckboxes } from '@/components/form/FIlterCheckboxes'
import { Input } from '@/components/form/Input'
import { RangeSliderComponent } from '@/components/form/RangeSlider'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { useMinMaxPrice } from '@/modules/systems/hooks/useMinMaxPrice'
import { SystemLevel } from '@/types/gql/graphql'
import { classNames } from '@/utils'

import { CategoryPropFilters } from './CategoryPropFilters'
import { useSystemsFilterFields } from './SystemsFilter.fields'

export const SystemsFilterForm = ({ tableId }: { tableId: string }) => {
  const fields = useSystemsFilterFields()
  const systemLevels = Object.values(SystemLevel).map(level => level)
  const { minMaxPrice } = useMinMaxPrice()

  const { setFilter } = useFormFilterState({ tableId })
  const { watch } = useFormContext()

  const category = watch('category')
  const uid = useMemo(() => category?.uid, [category])

  const { catalogueCategoryProperties } = useCategoryProperties(uid)

  return (
    <div className={classNames('md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]')}>
      <div className="flex flex-col gap-2">
        <SelectSystemComboBox
          selectSystemField={fields.parentSystem}
          onChange={setFilter(fields.parentSystem.name)}
          isFilter={true}
        />
        <Input {...fields.name} onChange={setFilter(fields.name.name)} isFilter={true} />
        <SystemTypeComboBox
          systemTypeField={fields.systemType}
          clickIcon={true}
          onChange={setFilter(fields.systemType.name)}
          isFilter={true}
        />
        <Combobox {...fields.responsible} onSelect={setFilter(fields.responsible.name)} isFilter={true} />
        <Input {...fields.systemCode} onChange={setFilter(fields.systemCode.name)} isFilter={true} />
        <Input {...fields.systemAlias} onChange={setFilter(fields.systemAlias.name)} isFilter={true} />
        <Combobox {...fields.zone} onSelect={setFilter(fields.zone.name)} isFilter={true} />
        <SelectLocationCombo
          locationField={fields.location}
          onSelect={setFilter(fields.location.name)}
          isFilter={true}
        />
        <FilterCheckboxes
          name={fields.systemLevel.name}
          label="System Level"
          options={systemLevels}
          onChange={setFilter(fields.systemLevel.name)}
          isFilter={true}
        />
        <Input {...fields.description} onChange={setFilter(fields.description.name)} isFilter={true} />
      </div>
      <div className="flex flex-col gap-2">
        <FilterCheckboxes
          name={fields.itemUsage.name}
          codebook={fields.itemUsage.codebook}
          label="Item Usage"
          onChange={setFilter(fields.itemUsage.name)}
          isFilter={true}
        />
        <Input {...fields.eun} onChange={setFilter(fields.eun.name)} isFilter={true} />
        <Input {...fields.partNumber} onChange={setFilter(fields.partNumber.name)} isFilter={true} />
        <Input {...fields.serialNumber} onChange={setFilter(fields.serialNumber.name)} isFilter={true} />
        <Input {...fields.catalogueName} onChange={setFilter(fields.catalogueName.name)} isFilter={true} />
        <ComboboxTree {...fields.category} onSelect={setFilter(fields.category.name)} isFilter={true} />
        <Combobox {...fields.catalogueSupplier} onSelect={setFilter(fields.catalogueSupplier.name)} isFilter={true} />
        <RangeSliderComponent
          min={minMaxPrice?.min}
          max={minMaxPrice?.max}
          name={'price'}
          label={'Price'}
          onChange={setFilter('price')}
        />
      </div>
      <CategoryPropFilters tableId={tableId} catalogueCategoryProperties={catalogueCategoryProperties} />
    </div>
  )
}
