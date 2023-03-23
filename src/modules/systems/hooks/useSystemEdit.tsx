import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { ROLE } from '@/types/constants/roles'

import Edit from '../components/systemEdit/Edit'
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

export const useSystemEdit = ({ systemDetail }: { systemDetail?: SystemDetailResponse | undefined }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openNew, setOpenNew] = useState(false)
  const { data: session } = useSession()
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
          <li className="flex">
            <div className="flex items-center">
              <Button
                onClick={() => {
                  setOpenNew(true)
                }}
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </li>
          <EditModal open={openNew} setOpen={setOpenNew} />
        </Fragment>
      )}
    </Fragment>
  )

  return { getEditButton, getAddButton }
}
