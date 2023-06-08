import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import DisclosureComponent from '@/components/Disclosure.comp'

import useGroupDetails from '../../hooks/useGroupDetails'
import useItem from '../../hooks/useItem'
import type { CatalogueItem } from '../../types/responses'
import GroupProperty from './GroupProperty'

const Groups = () => {
  const { control, unregister } = useFormContext<CatalogueItem>()

  const categoryName = useWatch({ control, name: 'categoryName' })

  const { item, groups: groupsItem } = useItem()
  const { groups: groupsDetail, groupDetails } = useGroupDetails(categoryName?.uid)

  const details = useMemo(() => {
    if (categoryName?.uid === item?.categoryName?.uid) {
      return { groups: groupsItem, details: item?.details }
    } else {
      unregister('details')
      return { groups: groupsDetail, details: groupDetails }
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
