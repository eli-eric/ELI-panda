import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import type { FragmentType } from '@/types/gql'
import { useFragment } from '@/types/gql'
import {
  PhysicalItemFragment,
  ServiceItemFragment
} from '@/utils/graphql/fragments'

import type { OrderColumns } from './order.columns'
import { useSystemOrderColumns } from './order.columns'

interface OrderInformationProps {
  physicalItem: FragmentType<typeof PhysicalItemFragment> | null | undefined
}

export const OrderInformation = ({
  physicalItem: physicalItemProp
}: OrderInformationProps) => {
  const physicalItem = useFragment(PhysicalItemFragment, physicalItemProp)
  const columns = useSystemOrderColumns()
  const mainOrder = physicalItem?.order
  const serviceItemsFragments = useFragment(
    ServiceItemFragment,
    physicalItem?.serviceItems
  )
  const tableId = 'order-information'

  const table = usePandaTable<OrderColumns>({
    tableId,
    columns,
    data:
      serviceItemsFragments?.map(serviceItem => {
        return {
          uid: serviceItem.order?.uid || '',
          name: serviceItem.name,
          type: 'service',
          description: '',
          isDelivered: serviceItem.isDelivered,
          orderDate: ''
        }
      }) || []
  })

  if (!physicalItem) {
    return null
  }

  // If there's no main order and no service items, don't render
  if (!mainOrder) {
    return null
  }

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Order Information
      </h3>
      <PandaTableV2
        {...{
          tableId,
          table,
          data: []
        }}
      />
    </div>
  )
}
