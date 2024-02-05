import { Fragment, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { FilterCheckboxes } from '@/components/form/FIlterCheckboxes'
import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { RangeInput } from '@/components/form/RangeInput'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { useFormControlStore } from '@/store/useFormControlStore'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'

export const CategoryPropFilters = ({ tableId }: { tableId: string }) => {
  const { setFilter } = useFormFilterState({ tableId })
  const { addCustomFieldIdToSync } = useFormControlStore()

  const { watch } = useFormContext()

  const category = watch('category')
  const uid = useMemo(() => category?.uid, [category])
  const { catalogueCategoryProperties } = useCategoryProperties(uid)

  // sort properties by type.uid list first and by name to in same order every time
  const categoryProperties = catalogueCategoryProperties?.sort((a, b) => {
    if (a.property.type.uid === PROPERTY_TYPE.LIST && b.property.type.uid !== PROPERTY_TYPE.LIST) return -1
    if (a.property.type.uid !== PROPERTY_TYPE.LIST && b.property.type.uid === PROPERTY_TYPE.LIST) return 1
    return a.property.name.localeCompare(b.property.name)
  })

  if (!categoryProperties) return null

  return (
    <Fragment>
      {categoryProperties?.length > 0 && (
        <div className="col-span-2 md:grid md:grid-cols-2 md:gap-4">
          <span className=" col-span-2 text-base font-semibold leading-6 text-gray-900 dark:text-gray-200">
            Category Properties
          </span>
          {categoryProperties.map(property => {
            const label = property.property.name + (property.property.unit ? ` [${property.property.unit?.name}]` : '')
            switch (property.property.type.uid) {
              case PROPERTY_TYPE.TEXT: {
                return (
                  <Input
                    rounded="rounded-md"
                    key={property.property.uid}
                    unit={property.property.unit?.name}
                    name={property.property.uid}
                    label={label}
                    onChange={value => {
                      setFilter(property.property.uid)(value, property.property.type.code, property.property.name)
                      addCustomFieldIdToSync(property.property.uid)
                    }}
                    isFilter={true}
                  />
                )
              }
              case PROPERTY_TYPE.NUMBER: {
                return (
                  <RangeInput
                    key={property.property.uid}
                    name={property.property.uid}
                    label={label}
                    onChange={value => {
                      setFilter(property.property.uid)(value, property.property.type.code, property.property.name)
                      addCustomFieldIdToSync(property.property.uid)
                    }}
                    isFilter={true}
                  />
                )
              }
              case PROPERTY_TYPE.RANGE: {
                return (
                  <RangeInput
                    key={property.property.uid}
                    name={property.property.uid}
                    label={label}
                    onChange={value => {
                      setFilter(property.property.uid)(value, property.property.type.code, property.property.name)
                      addCustomFieldIdToSync(property.property.uid)
                    }}
                    isFilter={true}
                  />
                )
              }
              case PROPERTY_TYPE.BOOLEAN: {
                return (
                  <Listbox
                    key={property.property.uid}
                    name={property.property.uid}
                    customLabel={label}
                    onChange={value => {
                      setFilter(property.property.uid)(value, property.property.type.code, property.property.name)
                      addCustomFieldIdToSync(property.property.uid)
                    }}
                    isFilter={true}
                    customOptions={['true', 'false']}
                  />
                )
              }
              case PROPERTY_TYPE.LIST: {
                return (
                  <FilterCheckboxes
                    key={property.property.uid}
                    name={property.property.uid}
                    label={label}
                    onChange={value => {
                      setFilter(property.property.uid)(value, property.property.type.code, property.property.name)
                      addCustomFieldIdToSync(property.property.uid)
                    }}
                    isFilter={true}
                    options={property.property.listOfValues}
                  />
                )
              }
              default:
                return null
            }
          })}
        </div>
      )}
    </Fragment>
  )
}
