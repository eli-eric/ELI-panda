import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

import { Button, PlusButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import useOrders from '../hooks/useOrders'

const HeaderButtons = () => {
  const canEdit = usePermission([ROLE.ORDERS_EDIT])
  const { mutate } = useOrders()
  const router = useRouter()

  return (
    <div className="flex">
      <Button
        className="mr-1"
        onClick={() => {
          mutate()
        }}
      >
        <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
      </Button>
      {canEdit && (
        <PlusButton
          primary
          className="mr-1"
          buttonSize="large"
          onClick={() => {
            router.push(PATH.ORDER)
          }}
        />
      )}
    </div>
  )
}

export default HeaderButtons
