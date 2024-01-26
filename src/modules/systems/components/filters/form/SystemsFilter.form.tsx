import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { RangeSliderComponent } from '@/components/form/Range'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { useMinMaxPrice } from '@/modules/systems/hooks/useMinMaxPrice'
import { useFormControlStore } from '@/store/useFormControlStore'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import { SystemLevel } from '@/types/gql/graphql'
import { classNames } from '@/utils'

import { useSystemsFilterFields } from './SystemsFilter.fields'

export const SystemsFilterForm = ({ tableId }: { tableId: string }) => {
  const fields = useSystemsFilterFields()
  const systemLevels = Object.values(SystemLevel).map(level => level)
  const { minMaxPrice } = useMinMaxPrice()

  const { setFilter } = useFormFilterState({ tableId })
  const { setCustomFieldIdToSync } = useFormControlStore()

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
        <Listbox
          {...fields.systemLevel}
          customOptions={systemLevels}
          onChange={v => {
            setFilter(fields.systemLevel.name)(v?.name || null)
          }}
          isFilter={true}
        />
        <Input {...fields.description} onChange={setFilter(fields.description.name)} isFilter={true} />
      </div>
      <div className="flex flex-col gap-2">
        <Listbox {...fields.itemUsage} onChange={setFilter(fields.itemUsage.name)} isFilter={true} />
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
      {catalogueCategoryProperties && catalogueCategoryProperties?.length > 0 && (
        <div className="col-span-2 md:grid md:grid-cols-2 md:gap-4">
          <span className=" col-span-2 text-base font-semibold leading-6 text-gray-900">Category Properties</span>
          {catalogueCategoryProperties.map(property => {
            switch (property.property.type.uid) {
              case PROPERTY_TYPE.TEXT:
                return (
                  <Input
                    rounded="rounded-md"
                    key={property.property.uid}
                    unit={property.property.unit?.name}
                    name={property.property.uid}
                    label={property.property.name}
                    onChange={value => {
                      setFilter(property.property.uid)(value, PROPERTY_TYPE.TEXT, property.property.name)
                      setCustomFieldIdToSync(property.property.uid)
                    }}
                    isFilter={true}
                  />
                )
              case PROPERTY_TYPE.NUMBER:
                return (
                  <Input
                    rounded="rounded-md"
                    key={property.property.uid}
                    name={property.property.uid}
                    unit={property.property.unit?.name}
                    label={property.property.name}
                    onChange={value => {
                      setFilter(property.property.uid)(value, PROPERTY_TYPE.NUMBER, property.property.name)
                      setCustomFieldIdToSync(property.property.uid)
                    }}
                    isFilter={true}
                    type="number"
                  />
                )
              case PROPERTY_TYPE.BOOLEAN:
                return (
                  <Listbox
                    key={property.property.uid}
                    name={property.property.uid}
                    customLabel={property.property.name}
                    onChange={value => {
                      setFilter(property.property.uid)(value, PROPERTY_TYPE.BOOLEAN, property.property.name)
                      setCustomFieldIdToSync(property.property.uid)
                    }}
                    isFilter={true}
                    customOptions={['true', 'false']}
                  />
                )
              case PROPERTY_TYPE.LIST:
                return (
                  <Listbox
                    key={property.property.uid}
                    name={property.property.uid}
                    customLabel={property.property.name}
                    onChange={value => {
                      setFilter(property.property.uid)(value, PROPERTY_TYPE.LIST, property.property.name)
                      setCustomFieldIdToSync(property.property.uid)
                    }}
                    isFilter={true}
                    customOptions={property.property.listOfValues}
                  />
                )
              default:
                return null
            }
          })}
        </div>
      )}
    </div>
  )
}
