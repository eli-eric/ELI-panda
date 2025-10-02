import { type FC, Fragment } from 'react'
import { useIntl } from 'react-intl'

import { Disclosure } from '@/components/ui'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'

import { SystemDetailParameter } from '../system-detail-parameter.comp'
import { SystemLink } from '../SystemLink.comp'

interface ServiceItemsSectionProps {
  serviceItems: any[]
}

export const ServiceItemsSection: FC<ServiceItemsSectionProps> = ({
  serviceItems
}) => {
  const { formatMessage: fm } = useIntl()

  if (serviceItems.length === 0) return null

  return (
    <Fragment>
      {serviceItems.map(serviceEdge => {
        const serviceItem = serviceEdge.node
        const serviceItemProperties = serviceItem.detailsConnection?.edges || []
        const title = `${serviceItem.name}${serviceItem.isDelivered ? ' (Delivered)' : ''}`

        return (
          <Disclosure
            key={serviceItem.uid}
            title={title}
            defaultOpen={false}
            className="w-full border rounded-md  overflow-hidden shadow-md"
            buttonClassName="bg-blue-50 dark:bg-blue-900/20"
            panelClassName="px-3 py-3 space-y-2"
            transparentButton={false}
          >
            {serviceItem.order && (
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {fm({ id: message.common.systemOverlay.order })}
                  </span>
                  <SystemLink
                    href={`/orders/${serviceItem.order.uid}`}
                    external
                    className="text-xs"
                  >
                    {serviceItem.order.name}
                  </SystemLink>
                </div>
                <SystemDetailParameter
                  title="Order Date"
                  value={
                    serviceItem.order.orderDate
                      ? new Date(
                          serviceItem.order.orderDate
                        ).toLocaleDateString()
                      : undefined
                  }
                />
                <SystemDetailParameter
                  title="Delivery Status"
                  value={serviceItem.isDelivered ? 'Delivered' : 'Pending'}
                />
              </div>
            )}

            {serviceItemProperties.length > 0 && (
              <div className="pt-2">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {fm({ id: message.common.systemOverlay.serviceProperties })}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {serviceItemProperties.map(edge => {
                    const type = edge.node.type as unknown as {
                      name: string
                      uid: string
                    }
                    let displayValue = edge.value || 'N/A'

                    if (type.name === 'Range') {
                      try {
                        const value = JSON.parse(edge.value || '{}')
                        const min = value?.min ?? 'N/A'
                        const max = value?.max ?? 'N/A'
                        displayValue = `${min} - ${max}`
                      } catch (error) {
                        // Keep original value if JSON parsing fails
                      }
                    }

                    return (
                      <SystemDetailParameter
                        key={edge.node.uid}
                        title={edge.node.name}
                        value={displayValue}
                        unit={edge.node.unit?.name}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            <div className="pt-2">
              <SystemLink
                href={`${PATH.SERVICE}/${serviceItem.uid}`}
                external
                variant="button"
                className="w-full justify-center text-sm py-2"
              >
                {fm({ id: message.common.systemOverlay.viewServiceDetails })}
              </SystemLink>
            </div>
          </Disclosure>
        )
      })}
    </Fragment>
  )
}
