import {
  ChevronRightIcon,
  PencilSquareIcon,
  PlusIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import { ROLE } from '@/types/constants/roles'

import Edit from '../components/systemEdit/Edit'
import { SystemDetailResponse } from '../types/responses'

export const useSystemEdit = ({
  systemDetail
}: {
  systemDetail?: SystemDetailResponse | undefined
}) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openNew, setOpenNew] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const EditButton = () => (
    <Fragment>
      {session?.user.roles.includes(ROLE.SYSTEM_EDIT) && (
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
      )}
      <ModalComponent
        open={openEdit}
        setOpen={setOpenEdit}
        buttons={{ noButtons: true }}
        testid="catalogueEdit"
      >
        <Edit
          setOpen={setOpenEdit}
          data={systemDetail}
          uid={systemDetail?.uid}
        />
      </ModalComponent>
    </Fragment>
  )

  const AddButton = () => (
    <Fragment>
      {session?.user.roles.includes(ROLE.SYSTEM_EDIT) && (
        <li className="flex">
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <Button
              onClick={() => {
                setOpenNew(true)
              }}
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </li>
      )}
      <ModalComponent
        open={openNew}
        setOpen={setOpenNew}
        buttons={{ noButtons: true }}
        testid="catalogueEdit"
      >
        <Edit setOpen={setOpenNew} />
      </ModalComponent>
    </Fragment>
  )

  return { EditButton, AddButton }
}
