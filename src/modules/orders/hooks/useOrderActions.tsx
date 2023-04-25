import { FolderIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'

import { Button } from '@/components/Buttons'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

const useOrderActions = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const getNewOrderButton = () => (
    <Button
      className="mr-1"
      onClick={() => {
        router.push(PATH.ORDER_ITEM)
      }}
      rounded="rounded-md"
    >
      <PlusIcon className="h-5 w-5" aria-hidden="true" />
    </Button>
  )

  const getTableActions = (uid: string) => (
    <div className="w-20 flex">
      {session?.user.roles.includes(ROLE.ORDERS_EDIT) ? (
        <Fragment>
          <Button
            className="mr-1"
            buttonSize="small"
            onClick={() => {
              router.push(`${PATH.ORDER_ITEM}/${uid}`)
            }}
            rounded="rounded-md"
          >
            <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button
            buttonSize="small"
            onClick={() => {
              console.log(uid)
            }}
            rounded="rounded-md"
          >
            <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
          </Button>
        </Fragment>
      ) : (
        <Button
          buttonSize="small"
          onClick={() => {
            router.push(`${PATH.ORDER_ITEM}/${uid}`)
          }}
          rounded="rounded-md"
        >
          <FolderIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
      )}
    </div>
  )

  return { getTableActions, getNewOrderButton }
}

export default useOrderActions
