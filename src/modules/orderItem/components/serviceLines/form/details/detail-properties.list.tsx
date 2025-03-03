import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { Heading } from '@/components/layout/Heading'
import GroupProperty from '@/modules/catalogueItem/components/form/GroupProperty'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

type Props = {
  groupMap: Map<string, CatalogueItemDetail[]>
  disabled?: boolean
}

export const DetailPropertiesList = ({
  groupMap = new Map(),
  disabled
}: Props) => {
  // Convert Map entries to array and flatten properties with their group info
  const allProperties = Array.from(groupMap.entries()).flatMap(
    ([group, properties]) => properties.map(property => ({ group, property }))
  )
  const { setValue } = useFormContext()

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
            value: property.value
          }
        }
      })
  )

  // Use effect to set form values
  useEffect(() => {
    detailsWithIndices.forEach(({ index, detail }) => {
      Object.keys(detail).forEach(key => {
        setValue(`details.${index}.${key}`, detail[key])
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, JSON.stringify(detailsWithIndices)])

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
                const detail = {
                  property: property.property,
                  propertyGroup: property.propertyGroup,
                  value: property.value
                }
                return (
                  <GroupProperty
                    key={property.property.uid}
                    index={globalIndex}
                    detail={detail}
                    disabled={disabled}
                  />
                )
              })}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
