import { sortBy } from 'lodash'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import useGroupDetails from '@/modules/catalogueItem/hooks/useGroupDetails'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import type { CodebookType } from '@/types/responses/codebook'

import { DetailPropertiesList } from './detail-properties.list'

type GroupPropertyProps = {
  category?: CodebookType
  allowedDetails?: string[]
}

export const ServiceLineGroups = ({
  category,
  allowedDetails
}: GroupPropertyProps) => {
  const { unregister, watch } = useFormContext()
  const [details, setDetails] = useState<{
    groups?: string[]
    details?: CatalogueItemDetail[]
  }>()

  const { groupDetails } = useGroupDetails(category?.uid)

  const formDetails = watch('details')

  useEffect(() => {
    const filteredDetails = groupDetails?.filter(detail =>
      allowedDetails?.includes(detail.property.uid)
    )
    const itemDetails = sortBy(formDetails || filteredDetails, [
      'propertyGroup',
      'property.name'
    ])
    const groupsDetail = itemDetails
      ?.map(item => item.propertyGroup)
      .filter((value, index, self) => self.indexOf(value) === index)

    setDetails({
      groups: groupsDetail,
      details: itemDetails
    })
  }, [groupDetails, category, unregister, allowedDetails, formDetails])

  return <DetailPropertiesList details={details} />
}
