import { sortBy } from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import CheckBox from '@/components/form/CheckBox'
import { Heading } from '@/components/layout/Heading'
import usePermission from '@/hooks/usePermission'
import useGroupDetails from '@/modules/catalogueItem/hooks/useGroupDetails'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { ROLE } from '@/types/constants/roles'

export const ServiceProperties = () => {
  const { unregister, watch } = useFormContext()
  const disabled = !usePermission([ROLE.SERVICE_EDIT])
  const [details, setDetails] = useState<{
    groups?: string[]
    details?: CatalogueItemDetail[]
  }>()

  const category = watch('category')

  const { groups: groupsDetail, groupDetails } = useGroupDetails(category?.uid)

  useEffect(() => {
    const itemDetails = sortBy(groupDetails, ['propertyGroup', 'property.name'])
    setDetails({
      groups: groupsDetail,
      details: itemDetails
    })
  }, [groupsDetail, groupDetails, category, unregister])

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
                  detail =>
                    detail.propertyGroup === group && (
                      <CheckBox
                        name={`properties.${detail.property.uid}`}
                        key={detail.property.uid}
                        label={detail.property.name}
                        disabled={disabled}
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
