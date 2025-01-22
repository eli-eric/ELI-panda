import { Button } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { useDeliverAll } from '@/modules/orderItem/hooks/useDeliverAll'
import { ROLE } from '@/types/constants/roles'

export const DeliveredAllButton = () => {
  const { handleDelivery, isPending } = useDeliverAll()

  const hasRole = usePermission([ROLE.ORDERS_DELIVERY_EDIT, ROLE.ORDERS_EDIT])

  const handleClick = () => {
    handleDelivery()
  }
  return (
    <Button
      primary
      disabled={isPending || !hasRole}
      className="flex justify-center"
      onClick={handleClick}
    >
      Mark All
    </Button>
  )
}
