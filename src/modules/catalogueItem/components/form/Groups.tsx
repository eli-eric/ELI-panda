import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import DisclosureComponent from '@/components/Disclosure.comp'

import useGroupDetails from '../../hooks/useGroupDetails'
import useItem from '../../hooks/useItem'
import type { CatalogueItem, CatalogueItemDetail } from '../../types/responses'
import GroupProperty from './GroupProperty'

const Groups = () => {
  const { control, unregister } = useFormContext<CatalogueItem>()
  const [details, setDetails] = useState<{ groups?: string[]; details?: CatalogueItemDetail[] }>()

  const categoryName = useWatch({ control, name: 'categoryName' })

  const { item, groups: groupsItem } = useItem()
  const { groups: groupsDetail, groupDetails } = useGroupDetails(categoryName?.uid)

  useEffect(() => {
    if (categoryName?.uid === item?.categoryName?.uid) {
      setDetails({ groups: groupsItem, details: item?.details })
    } else {
      unregister('details')
      setDetails({ groups: groupsDetail, details: groupDetails })
    }
    return () => {
      unregister('details')
      setDetails(undefined)
    }
  }, [groupsItem, groupsDetail])

  return (
    <div>
      {details &&
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
    </div>
  )
}

export default Groups
