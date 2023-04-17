import { PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { ROLE } from '@/types/constants/roles'
import { ModalButtons } from '@/types/form'

import Edit from '../components/edit/Edit'
import { SystemDetailResponse } from '../types/responses'

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  data?: SystemDetailResponse
  uid?: string
}

const EditModal = ({ open, setOpen, data, uid }: Props) => (
  <ModalComponent open={open} setOpen={setOpen} buttons={{ noButtons: true }} testid="catalogueEdit">
    <Edit setOpen={setOpen} data={data} uid={uid} />
  </ModalComponent>
)

export const useSystemEdit = ({
  systemDetail,
  deleteSystemUid
}: {
  systemDetail?: SystemDetailResponse
  deleteSystemUid?: string
}) => {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false)
  const [openNew, setOpenNew] = useState(false)
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)
  const { data: session } = useSession()

  const { systemDetail: systemDelete } = useEndpoint({ uid: deleteSystemUid })
  const uid = router.query.uid as string
  const { systemSubsystems } = useEndpoint({ uid })

  const deleteSubmit = useSubmit({
    endpoint: systemDelete,
    method: 'delete',
    mutateList: [systemSubsystems],
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

  const getEditButton = () => (
    <Fragment>
      {session?.user.roles.includes(ROLE.SYSTEM_EDIT) && (
        <Fragment>
          <div className="relative flex flex-col justify-center z-0">
            <Button
              rounded="rounded-md"
              onClick={() => {
                setOpenEdit(true)
              }}
            >
              <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <EditModal open={openEdit} setOpen={setOpenEdit} uid={systemDetail?.uid} data={systemDetail} />
        </Fragment>
      )}
    </Fragment>
  )

  const getAddButton = () => (
    <Fragment>
      {session?.user.roles.includes(ROLE.SYSTEM_EDIT) && (
        <Fragment>
          <div className="flex items-center">
            <Button
              onClick={() => {
                setOpenNew(true)
              }}
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
          <EditModal open={openNew} setOpen={setOpenNew} />
        </Fragment>
      )}
    </Fragment>
  )

  const getDeleteButton = () => {
    if (session?.user.roles.includes(ROLE.SYSTEM_EDIT)) {
      return (
        <Fragment>
          <div className="flex">
            <Button
              onClick={() => {
                setOpenDeleteWarn(true)
              }}
              buttonSize="small"
            >
              <TrashIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </Button>
          </div>

          <WarningModal
            buttons={deleteButtons}
            open={openDeleteWarn}
            setOpen={setOpenDeleteWarn}
            title="Warning"
            message="Are sure you want delete this system?"
            testid="SystemDelete"
            error={deleteSubmit.error}
          />
        </Fragment>
      )
    }
  }

  return { getEditButton, getAddButton, getDeleteButton }
}
