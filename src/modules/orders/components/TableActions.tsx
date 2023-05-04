import { FolderIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'

import { Button } from '@/components/Buttons'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import { ModalButtons } from '@/types/form'

export const TableActions = ({ uid, mutate }: { uid: string; mutate: string }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)

  const { order } = useEndpoint({ uid })

  const deleteSubmit = useSubmit({
    endpoint: order,
    method: 'delete',
    mutateList: [mutate],
    onSuccess: () => {
      setOpenDeleteWarn(false)
    }
  })

  const deleteButtons: ModalButtons = {
    goNext: {
      text: 'Cancel',
      loading: deleteSubmit.loading,
      onClick: () => {
        deleteSubmit.submit()
      }
    },
    goBack: {
      text: 'Cancel',
      onClick: () => {
        setOpenDeleteWarn(false)
      }
    }
  }

  return (
    <div className="flex">
      {session?.user.roles.includes(ROLE.ORDERS_EDIT) && (
        <Fragment>
          <Button
            className="mr-1"
            buttonSize="small"
            onClick={() => {
              router.push(PATH.ORDER_EDIT + '/' + uid)
            }}
            rounded="rounded-md"
          >
            <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            className="mr-1"
            buttonSize="small"
            onClick={() => {
              setOpenDeleteWarn(true)
            }}
            rounded="rounded-md"
          >
            <TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" />
          </Button>
        </Fragment>
      )}
      <Button
        buttonSize="small"
        onClick={() => {
          router.push(PATH.ORDER_DETAIL + '/' + uid)
        }}
        rounded="rounded-md"
      >
        <FolderIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
      <WarningModal
        buttons={deleteButtons}
        open={openDeleteWarn}
        setOpen={setOpenDeleteWarn}
        title="Warning"
        message="Are sure you want delete this system?"
        testid="SystemDelete"
        error={deleteSubmit.error}
      />
    </div>
  )
}

export default TableActions
