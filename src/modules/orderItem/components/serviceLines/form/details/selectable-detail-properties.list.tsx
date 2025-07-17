import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { Heading } from '@/components/layout/Heading'
import { Checkbox } from '@/components/ui/checkbox'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

import { SelectableGroupProperty } from './selectable-group-property'
import { useServiceLineSelectionStore } from './store/useServiceLineSelectionStore'

type Props = {
  groupMap: Map<string, CatalogueItemDetail[]>
}

export const SelectableDetailPropertiesList = ({
  groupMap = new Map()
}: Props) => {
  // Convert Map entries to array and flatten properties with their group info
  const allProperties = Array.from(groupMap.entries()).flatMap(
    ([group, properties]) => properties.map(property => ({ group, property }))
  )
  const { setValue } = useFormContext()
  const { selectedProperties } = useServiceLineSelectionStore()

  // Create an array of all details with their indices for useEffect
  const detailsWithIndices = Array.from(groupMap.entries()).flatMap(
    ([, properties]) =>
      properties.map(property => {
        const globalIndex = allProperties.findIndex(
          p => p.property.property.uid === property.property.uid
        )
        return {
          index: globalIndex,
          detail: {
            property: property.property,
            propertyGroup: property.propertyGroup,
            value: property.value || property.property.defaultValue
          }
        }
      })
  )

  // Use effect to set form values using property.uid instead of index
  useEffect(() => {
    detailsWithIndices.forEach(({ detail }) => {
      const uid = detail.property.uid
      setValue(`details.${uid}.property`, detail.property)
      setValue(`details.${uid}.propertyGroup`, detail.propertyGroup)
      setValue(`details.${uid}.value`, detail.value)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, groupMap])

  // Use effect to store selected properties in the form
  useEffect(() => {
    setValue('selectedProperties', selectedProperties)
  }, [setValue, selectedProperties])

  if (allProperties.length === 0) {
    return null
  }

  return (
    <>
      {Array.from(groupMap.entries()).map(([group, properties]) => (
        <div key={group}>
          <Heading customText={group} />
          <div className="px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {properties.map(property => {
                const globalIndex = allProperties.findIndex(
                  p => p.property.property.uid === property.property.uid
                )
                return (
                  <SelectableGroupProperty
                    key={property.property.uid}
                    detail={{
                      property: property.property,
                      propertyGroup: property.propertyGroup,
                      value: property.value
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="mt-8 rounded-md bg-gray-50 dark:bg-gray-800 p-4">
        <div className="flex items-center space-x-2">
          <Checkbox checked={true} disabled className="pointer-events-none" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Checked properties will be included in the service line
          </span>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <Checkbox checked={false} disabled className="pointer-events-none" />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Unchecked properties will be disabled and excluded from the service
            line
          </span>
        </div>
      </div>
    </>
  )
}
