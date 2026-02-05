import { CheckCircle } from 'lucide-react'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import usePermission from '@/hooks/usePermission'
import { useOrderLineContext } from '@/modules/orderItem/context'
import { useDeliverAll } from '@/modules/orderItem/hooks/useDeliverAll'
import { ROLE } from '@/types/constants/roles'

export const DeliveredAllButton = () => {
    const { setOrderLine } = useOrderLineContext()
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
