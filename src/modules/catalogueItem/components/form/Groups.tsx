'use client'
import { sortBy } from 'lodash'
import { Fragment, useEffect, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { Heading } from '@/components/layout/Heading'

import useGroupDetails from '../../hooks/useGroupDetails'
import { useCatalogueItem } from '../../hooks/useItem'
import type { CatalogueItem, CatalogueItemDetail } from '../../types/responses'
import GroupProperty from './GroupProperty'

const Groups = () => {
  const { watch, setValue, unregister } = useFormContext<CatalogueItem>()
  const category = watch('category')

  // Unregister details when category changes
  useEffect(() => {
    unregister('details')
  }, [category?.uid, unregister])

  const { item, groups: groupsItem } = useCatalogueItem()
  const { groups: groupsDetail, groupDetails } = useGroupDetails(category?.uid)

  // Create groupMap using useMemo
  const { groupMap, allProperties } = useMemo(() => {
    let details: CatalogueItemDetail[] = []
    let groups: string[] = []

    if (category?.uid === item?.category?.uid) {
      details = sortBy(item?.details, ['property.name'])
      groups = groupsItem || []
    } else {
      details = sortBy(groupDetails, ['property.name'])
      groups = groupsDetail || []
    }

    // Create the map
    const map = new Map<string, CatalogueItemDetail[]>()
    groups.forEach(group => {
      const groupDetails = details
        .filter(detail => detail.propertyGroup === group)
        .map(detail => ({
          property: detail.property,
          propertyGroup: detail.propertyGroup,
          value: detail.value || detail.property.defaultValue
        }))

      map.set(group, sortBy(groupDetails, ['property.name']))
    })

    // Create flattened array of all properties
    const allProps = Array.from(map.entries()).flatMap(([group, properties]) =>
      properties.map(property => ({ group, property }))
    )

    return { groupMap: map, allProperties: allProps }
  }, [
    category?.uid,
    item?.category?.uid,
    item?.details,
    groupDetails,
    groupsItem,
    groupsDetail
  ])

  // Create details with indices for form setup
  const detailsWithIndices = useMemo(() => {
    return Array.from(groupMap.entries()).flatMap(([, properties]) =>
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
  }, [groupMap, allProperties])

  // Use effect to set form values
  useEffect(() => {
    detailsWithIndices.forEach(({ index, detail }) => {
      setValue(`details.${index}.property`, detail.property)
      setValue(`details.${index}.propertyGroup`, detail.propertyGroup)
      setValue(`details.${index}.value`, detail.value)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, JSON.stringify(detailsWithIndices)])

  if (allProperties.length === 0) {
    return null
  }

  return (
    <Fragment>
      {Array.from(groupMap.entries()).map(([group, properties]) => (
        <Fragment key={group}>
          <Heading customText={group} />
          <div className="px-4 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {properties.map(property => {
                const globalIndex = allProperties.findIndex(
                  p => p.property.property.uid === property.property.uid
                )
                return (
                  <GroupProperty
                    key={property.property.uid}
                    index={globalIndex}
                    detail={property}
                    disabled={false}
                  />
                )
              })}
            </dl>
          </div>
        </Fragment>
      ))}
    </Fragment>
  )
}

export default Groups
