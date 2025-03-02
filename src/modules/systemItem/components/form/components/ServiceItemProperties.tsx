import { FormattedMessage } from 'react-intl'

import { Disclosure } from '@/components/ui'
import { message } from '@/i18n/src/messages'
import type { FragmentType } from '@/types/gql'
import { useFragment } from '@/types/gql'
import { createMessageValues } from '@/utils/formatters'
import { ServiceItemFragment } from '@/utils/graphql/fragments'

const propertyMessage =
  message.systemsPage.systemDetail.form.physicalItem.general.properties

interface ServiceItemPropertiesProps {
  serviceItem: FragmentType<typeof ServiceItemFragment> | null | undefined
}

export const ServiceItemProperties = ({
  serviceItem: serviceItemProp
}: ServiceItemPropertiesProps) => {
  const serviceItem = useFragment(ServiceItemFragment, serviceItemProp)

  if (!serviceItem) {
    return null
  }

  const serviceItemProperties = serviceItem.detailsConnection?.edges || []
  const title = `${serviceItem.name}${serviceItem.isDelivered ? ' (Delivered)' : ''}`

  return (
    <Disclosure
      title={title}
      defaultOpen={true}
      className="w-full border rounded-md"
      buttonClassName="p-3"
      panelClassName="px-3 py-3"
      transparentButton={true}
    >
      <div className="w-full">
        {serviceItemProperties.length > 0 && (
          <ul className="grid grid-cols-4 lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-3 w-full">
            {serviceItemProperties.map(edge => {
              const type = edge.node.type as unknown as {
                name: string
                uid: string
              }
              if (type.name === 'Range') {
                try {
                  const value = JSON.parse(edge.value || '{}')
                  const min = value?.min ?? 'N/A'
                  const max = value?.max ?? 'N/A'
                  const stringValue = `${min} - ${max}`
                  return (
                    <li key={edge.node.uid} className="flex col-span-3">
                      <FormattedMessage
                        id={propertyMessage.property}
                        values={createMessageValues({
                          name: edge.node.name,
                          value: stringValue,
                          unit: edge.node.unit?.name
                        })}
                      />
                    </li>
                  )
                } catch (error) {
                  // If JSON parsing fails, display the raw value or a fallback
                  return (
                    <li key={edge.node.uid} className="flex col-span-3">
                      <FormattedMessage
                        id={propertyMessage.property}
                        values={createMessageValues({
                          name: edge.node.name,
                          value: edge.value || 'N/A',
                          unit: edge.node.unit?.name
                        })}
                      />
                    </li>
                  )
                }
              }
              return (
                <li key={edge.node.uid} className="flex col-span-3">
                  <FormattedMessage
                    id={propertyMessage.property}
                    values={createMessageValues({
                      name: edge.node.name,
                      value: edge.value || 'N/A',
                      unit: edge.node.unit?.name
                    })}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Disclosure>
  )
}
