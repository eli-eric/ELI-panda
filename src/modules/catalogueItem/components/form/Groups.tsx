import { Fragment, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import DisclosureComponent from '@/components/Disclosure.comp'

import useGroupDetails from '../../hooks/useGroupDetails'
import useItem from '../../hooks/useItem'
import type { CatalogueItem, CatalogueItemDetail } from '../../types/responses'
import GroupProperty from './GroupProperty'

const Groups = () => {
  const { unregister, watch } = useFormContext<CatalogueItem>()
  const [details, setDetails] = useState<{ groups?: string[]; details?: CatalogueItemDetail[] }>()

  const category = watch('category')

  const { item, groups: groupsItem } = useItem()
  const { groups: groupsDetail, groupDetails } = useGroupDetails(category?.uid)

  useEffect(() => {
    if (category?.uid === item?.category?.uid) {
      setDetails({ groups: groupsItem, details: item?.details })
    } else {
      unregister('details')
      setDetails({ groups: groupsDetail, details: groupDetails })
    }
    return () => {
      unregister('details')
      setDetails(undefined)
    }
  }, [groupsItem, groupsDetail, groupDetails, category, item, unregister])

  return (
    <Fragment>
      {details &&
        details?.details?.length !== 0 &&
        details.groups?.map(group => (
          <DisclosureComponent key={group} title={group} defaultOpen={true}>
            <div className="px-4 sm:px-6">
              <dl key={group} className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                {details.details?.map(
                  (detail, index) =>
                    detail.propertyGroup === group && (
                      <GroupProperty
                        key={detail.property.uid + index + detail.property.name}
                        detail={detail}
                        index={index}
                      />
                    )
                )}
              </dl>
            </div>
          </DisclosureComponent>
        ))}
    </Fragment>
  )
}

export default Groups
