import { CheckCircle } from 'lucide-react'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import usePermission from '@/hooks/usePermission'
import { useDeliverAll } from '@/modules/orderItem/hooks/useDeliverAll'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'
import { ROLE } from '@/types/constants/roles'

interface DeliveredAllButtonProps {
  setOrderLine: (orderLine: OrderLineFormType) => void
}

export const DeliveredAllButton = ({
  setOrderLine
}: DeliveredAllButtonProps) => {
  const { handleDelivery, isPending } = useDeliverAll(setOrderLine)

  const hasRole = usePermission([ROLE.ORDERS_DELIVERY_EDIT, ROLE.ORDERS_EDIT])

  const handleClick = () => {
    handleDelivery()
  }
  return (
    <Tooltip content="Deliver all items">
      <Button
        disabled={isPending || !hasRole}
        className="flex justify-center items-center p-1 h-7 min-h-0 w-7"
        onClick={handleClick}
      >
        <CheckCircle className="h-5 w-5" />
      </Button>
    </Tooltip>
  )
}
