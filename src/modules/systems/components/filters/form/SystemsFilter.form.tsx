import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import CheckBox from '@/components/form/CheckBox'
import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { FilterCheckboxes } from '@/components/form/FIlterCheckboxes'
import { Input } from '@/components/form/inputs'
import { RangeInput } from '@/components/form/RangeInput'
import { RangeSliderComponent } from '@/components/form/RangeSlider'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { cn } from '@/lib/utils'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { useCategoryItemProperties } from '@/modules/systems/hooks/useCategoryItemProperties'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { useMinMaxPrice } from '@/modules/systems/hooks/useMinMaxPrice'
import { SystemLevel } from '@/types/gql/graphql'

import { CategoryPropFilters } from '../../../../shared/form/CategoryPropFilters'
import type { DisabledFields } from '../SystemsFilterButton.cont'
import { useSystemsFilterFields } from './SystemsFilter.fields'

export const SystemsFilterForm = ({
  tableId,
  enableQueryUrl,
  disabledFields
}: {
  tableId: string
  enableQueryUrl: boolean
  disabledFields?: DisabledFields
}) => {
  const fields = useSystemsFilterFields()
  const systemLevels = Object.values(SystemLevel).map(level => level)
  const { minMaxPrice } = useMinMaxPrice()

  const { setFilter } = useFormFilterState({ tableId, enableQueryUrl })
  const { watch } = useFormContext()

  const category = watch('category')
  const uid = useMemo(() => category?.uid, [category])

  const { catalogueCategoryProperties } = useCategoryProperties(uid)
  const { data: itemProperties } = useCategoryItemProperties(uid)

  return (
    <div className={cn('md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]')}>
      <div className="flex flex-col gap-2">
        <SelectSystemComboBox
          selectSystemField={fields.parentSystem}
          onChange={setFilter(fields.parentSystem.name)}
          isFilter={true}
        />
        <Input
          {...fields.name}
          onChange={setFilter(fields.name.name)}
          isFilter={true}
        />
        <Combobox
          {...fields.responsible}
          onSelect={setFilter(fields.responsible.name)}
          isFilter={true}
        />
        <Input
          {...fields.systemCode}
          onChange={setFilter(fields.systemCode.name)}
          isFilter={true}
        />
        <Combobox
          {...fields.zone}
          onSelect={setFilter(fields.zone.name)}
          isFilter={true}
        />
        <SelectLocationCombo
          locationField={fields.location}
          onSelect={setFilter(fields.location.name)}
          isFilter={true}
        />
        <FilterCheckboxes
          name={fields.itemUsage.name}
          codebook={fields.itemUsage.codebook}
          label="Item Usage"
          onChange={setFilter(fields.itemUsage.name)}
          isFilter={true}
        />
        <FilterCheckboxes
          name={fields.systemLevel.name}
          label="System Level"
          options={systemLevels}
          onChange={setFilter(fields.systemLevel.name)}
          isFilter={true}
        />
        <Input
          {...fields.description}
          onChange={setFilter(fields.description.name)}
          isFilter={true}
        />
        <RangeInput
          {...fields.sparePartsCoverage}
          placeholder={{ min: 'Min', max: 'Max' }}
          isFilter={true}
          onChange={value => {
            setFilter(fields.sparePartsCoverage.name)(value)
          }}
        />
        <CheckBox
          {...fields.criticalSpCoverage}
          label="Critical SP Coverage"
          onChange={e => {
            setFilter(fields.criticalSpCoverage.name)(e.target.checked)
          }}
          isFilter={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <SystemTypeComboBox
          systemTypeField={fields.systemType}
          clickIcon={true}
          onChange={setFilter(fields.systemType.name)}
          isFilter={true}
        />
        <Input
          {...fields.eun}
          onChange={setFilter(fields.eun.name)}
          isFilter={true}
        />
        <Input
          {...fields.partNumber}
          onChange={setFilter(fields.partNumber.name)}
          isFilter={true}
        />
        <Input
          {...fields.serialNumber}
          onChange={setFilter(fields.serialNumber.name)}
          isFilter={true}
        />
        <Input
          {...fields.catalogueName}
          onChange={setFilter(fields.catalogueName.name)}
          isFilter={true}
        />
        <ComboboxTree
          {...fields.category}
          disabled={disabledFields?.category || fields.category.disabled}
          onSelect={setFilter(fields.category.name)}
          isFilter={true}
        />
        <Combobox
          {...fields.catalogueSupplier}
          onSelect={setFilter(fields.catalogueSupplier.name)}
          isFilter={true}
        />
        <RangeSliderComponent
          min={minMaxPrice?.min}
          max={minMaxPrice?.max}
          name={'price'}
          label={'Price'}
          onChange={setFilter('price')}
        />
        <Input
          {...fields.orderName}
          onChange={setFilter(fields.orderName.name)}
          isFilter={true}
        />
        <Input
          {...fields.orderNumber}
          onChange={setFilter(fields.orderNumber.name)}
          isFilter={true}
        />
        <Input
          {...fields.orderRequestNumber}
          onChange={setFilter(fields.orderRequestNumber.name)}
          isFilter={true}
        />
        <Input
          {...fields.orderContractNumber}
          onChange={setFilter(fields.orderContractNumber.name)}
          isFilter={true}
        />
      </div>
      <CategoryPropFilters
        tableId={tableId}
        catalogueCategoryProperties={itemProperties}
        enableQueryUrl={enableQueryUrl}
        isItemProperties={true}
      />
      <CategoryPropFilters
        tableId={tableId}
        catalogueCategoryProperties={catalogueCategoryProperties}
        enableQueryUrl={enableQueryUrl}
        isItemProperties={false}
      />
    </div>
  )
}
