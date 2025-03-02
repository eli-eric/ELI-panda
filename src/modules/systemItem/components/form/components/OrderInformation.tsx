import Link from 'next/link'

import { LinkDecorator } from '@/components/decorators'
import { PATH } from '@/types/constants/paths'
import type { FragmentType } from '@/types/gql'
import { useFragment } from '@/types/gql'
import {
  PhysicalItemFragment,
  ServiceItemFragment
} from '@/utils/graphql/fragments'

// Helper component to process a single service item and render its order
const ServiceItemOrder = ({
  serviceItemProp,
  mainOrderUid
}: {
  serviceItemProp: FragmentType<typeof ServiceItemFragment>
  mainOrderUid?: string
}) => {
  const serviceItem = useFragment(ServiceItemFragment, serviceItemProp)

  if (!serviceItem.order) return null

  // Skip if this is the same as the main order (already displayed)
  if (mainOrderUid && serviceItem.order.uid === mainOrderUid) {
    return null
  }

  return (
    <div className="flex items-center border-t border-gray-100 dark:border-gray-800 pt-3 mt-3">
      <Link
        href={PATH.ORDER + '/' + serviceItem.order.uid}
        target={'_blank'}
        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
      >
        <LinkDecorator>{serviceItem.order.name}</LinkDecorator>
      </Link>
      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
        Service
      </span>
      <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
        {serviceItem.name}
      </span>
    </div>
  )
}

interface OrderInformationProps {
  physicalItem: FragmentType<typeof PhysicalItemFragment> | null | undefined
}

export const OrderInformation = ({
  physicalItem: physicalItemProp
}: OrderInformationProps) => {
  const physicalItem = useFragment(PhysicalItemFragment, physicalItemProp)

  if (!physicalItem) {
    return null
  }

  const mainOrder = physicalItem.order
  const serviceItems = physicalItem.serviceItems || []

  // If there's no main order and no service items, don't render
  if (!mainOrder && serviceItems.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Order Information
      </h3>

      <div className="w-full">
        {/* Display main item order if it exists */}
        {mainOrder && (
          <div className="flex items-center">
            <Link
              href={PATH.ORDER + '/' + mainOrder.uid}
              target={'_blank'}
              className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              <LinkDecorator>{mainOrder.name}</LinkDecorator>
            </Link>
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Item
            </span>
          </div>
        )}

        {/* Display service item orders */}
        {serviceItems.map((serviceItemProp, index) => (
          <ServiceItemOrder
            key={index}
            serviceItemProp={serviceItemProp}
            mainOrderUid={mainOrder?.uid}
          />
        ))}
      </div>
    </div>
  )
}
