import { sortBy } from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Heading } from '@/components/layout/Heading'
import GroupProperty from '@/modules/catalogueItem/components/form/GroupProperty'
import useGroupDetails from '@/modules/catalogueItem/hooks/useGroupDetails'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import type { CodebookType } from '@/types/responses/codebook'

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

  const { groups: groupsDetail, groupDetails } = useGroupDetails(category?.uid)

  const formDetails = watch('details')

  useEffect(() => {
    const filteredDetails = groupDetails?.filter(detail =>
      allowedDetails?.includes(detail.property.uid)
    )
    const itemDetails = sortBy(formDetails || filteredDetails, [
      'propertyGroup',
      'property.name'
    ])
    setDetails({
      groups: groupsDetail,
      details: itemDetails
    })
  }, [
    groupsDetail,
    groupDetails,
    category,
    unregister,
    allowedDetails,
    formDetails
  ])

  return (
    <Fragment>
      {details?.details?.length !== 0 &&
        details?.groups?.map(group => (
          <Fragment key={group}>
            <Heading customText={group} />
            <div className="px-4 sm:px-6">
              <dl
                key={group}
                className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
              >
                {details.details?.map(
                  (detail, index) =>
                    detail.propertyGroup === group && (
                      <GroupProperty
                        key={
                          detail?.property?.uid &&
                          detail?.property?.uid + index + detail.property.name
                        }
                        detail={detail}
                        index={index}
                      />
                    )
                )}
              </dl>
            </div>
          </Fragment>
        ))}
    </Fragment>
  )
}
