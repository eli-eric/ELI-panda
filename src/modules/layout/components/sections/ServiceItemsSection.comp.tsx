import Link from 'next/link'
import { type FC, Fragment } from 'react'

import { Button } from '@/components/Buttons'
import { Disclosure } from '@/components/ui'
import { PATH } from '@/types/constants/paths'

import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface ServiceItemsSectionProps {
  serviceItems: any[]
}

export const ServiceItemsSection: FC<ServiceItemsSectionProps> = ({
  serviceItems
}) => {
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
            className="w-full border rounded-md  overflow-hidden"
            buttonClassName="p-3 bg-blue-50 dark:bg-blue-900/20"
            panelClassName="px-3 py-3 space-y-2"
            transparentButton={false}
          >
            {serviceItem.order && (
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Order:
                  </span>
                  <Link
                    href={`/orders/${serviceItem.order.uid}`}
                    target="_blank"
                  >
                    <span className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
                      {serviceItem.order.name}
                    </span>
                  </Link>
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
                  Service Properties:
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
              <Link href={`${PATH.SERVICE}/${serviceItem.uid}`} target="_blank">
                <Button className="w-full justify-center text-sm py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50">
                  View Service Details
                </Button>
              </Link>
            </div>
          </Disclosure>
        )
      })}
    </Fragment>
  )
}
