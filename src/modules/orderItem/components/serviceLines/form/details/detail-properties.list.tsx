import { Heading } from '@/components/layout/Heading'
import GroupProperty from '@/modules/catalogueItem/components/form/GroupProperty'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'

type Props = {
  details?: {
    groups?: string[]
    details?: CatalogueItemDetail[]
  }
  disabled?: boolean
}

export const DetailPropertiesList = ({ details, disabled }: Props) => {
  return (
    <>
      {details?.details?.length !== 0 &&
        details?.groups?.map(group => (
          <div key={group}>
            <Heading customText={group} />
            <div className="px-4 sm:px-6">
              <dl
                key={group}
                className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
              >
                {details.details
                  ?.filter(detail => detail.propertyGroup === group)
                  .map((detail, index) => (
                    <GroupProperty
                      key={
                        detail?.property?.uid &&
                        detail?.property?.uid + index + detail.property.name
                      }
                      detail={detail}
                      index={index}
                      disabled={disabled}
                    />
                  ))}
              </dl>
            </div>
          </div>
        ))}
    </>
  )
}
