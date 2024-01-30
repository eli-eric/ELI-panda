import { Fragment, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { Input } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
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

  if (!catalogueCategoryProperties) return null

  return (
    <Fragment>
      {catalogueCategoryProperties?.length > 0 && (
        <div className="col-span-2 md:grid md:grid-cols-2 md:gap-4">
          <span className=" col-span-2 text-base font-semibold leading-6 text-gray-900 dark:text-gray-200">
            Category Properties
          </span>
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
                      setFilter(property.property.uid)(value, property.property.type.code, property.property.name)
                      addCustomFieldIdToSync(property.property.uid)
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
                      setFilter(property.property.uid)(value, property.property.type.code, property.property.name)
                      addCustomFieldIdToSync(property.property.uid)
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
                      setFilter(property.property.uid)(value, property.property.type.code, property.property.name)
                      addCustomFieldIdToSync(property.property.uid)
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
                      setFilter(property.property.uid)(value, property.property.type.code, property.property.name)
                      addCustomFieldIdToSync(property.property.uid)
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
    </Fragment>
  )
}
