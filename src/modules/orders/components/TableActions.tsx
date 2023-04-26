import { FolderIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'

import { Button } from '@/components/Buttons'
import { ROLE } from '@/types/constants/roles'

const TableActions = ({ uid }: { uid: string }) => {
  const { data: session } = useSession()

  return (
    <div className="w-20 flex">
      {session?.user.roles.includes(ROLE.ORDERS_EDIT) ? (
        <Fragment>
          <Button
            className="mr-1"
            buttonSize="small"
            onClick={() => {
              console.log(uid)
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
            console.log(uid)
          }}
          rounded="rounded-md"
        >
          <FolderIcon className="h-5 w-5" aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}

export default TableActions
