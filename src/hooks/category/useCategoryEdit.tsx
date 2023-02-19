import { ChevronRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'

import CategoryEditModal from '@/components/catalogue/categoryEditForm/CategoryEditModal'
import { IconButton, PlusIconButton } from '@/components/ui/Buttons'
import ModalComponent from '@/components/ui/modal/modal.comp'
import ModalWarningComponent from '@/components/ui/modal/warning/modal-warning.comp'
import { ROLE } from '@/types/constants/roles'
import { ModalButtons } from '@/types/form'

import { useEndpoint } from '../useEndpoint'
import useSubmit from '../useSubmit'

export const useCategoryEdit = ({
  editUid,
  catalogueParentUid
}: {
  editUid?: string
  catalogueParentUid?: string | undefined
}) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openNew, setOpenNew] = useState(false)

  const { data: session } = useSession()
  const { catalogueCategoryEdit } = useEndpoint({ uid: editUid })
  const { submit } = useSubmit({ endpoint: catalogueCategoryEdit, method: 'delete' })

  const deletModalButtons: ModalButtons = {
    goNext: {
      text: 'continue',
      onClick: () => {
        submit()
        setOpenDelete(false)
      }
    },
    goBack: {
      text: 'cancel',
      onClick: () => setOpenDelete(false)
    }
  }

  const getEditDeleteButtons = () => {
    return (
      <Fragment>
        {session?.user.roles.includes(ROLE.CATALOGUE_CATEGORY_EDIT) && (
          <div className="relative flex flex-col justify-center z-0">
            <IconButton
              rounded="rounded-t-md"
              onClickAction={() => {
                setOpenEdit(true)
              }}
            >
              <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
            </IconButton>
            <IconButton
              rounded="rounded-b-md"
              onClickAction={() => {
                setOpenDelete(true)
              }}
            >
              <TrashIcon className="h-6 w-6 text-red-700" aria-hidden="true" />
            </IconButton>
          </div>
        )}
        <ModalComponent open={openEdit} setOpen={setOpenEdit} buttons={{ noButtons: true }} testid="catalogueEdit">
          <CategoryEditModal setopen={setOpenEdit} uid={editUid} />
        </ModalComponent>
        <ModalComponent open={openDelete} setOpen={setOpenDelete} buttons={deletModalButtons} testid="catalogueEdit">
          <ModalWarningComponent title="Warning" message="Are you sure you want to remove this Category?" />
        </ModalComponent>
      </Fragment>
    )
  }

  const getAddButton = () => {
    console.log(catalogueParentUid)
    return (
      <Fragment>
        {session?.user.roles.includes(ROLE.CATALOGUE_CATEGORY_EDIT) && (
          <li className="flex">
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <PlusIconButton
                onClickAction={() => {
                  setOpenNew(true)
                }}
              />
            </div>
          </li>
        )}
        <ModalComponent open={openNew} setOpen={setOpenNew} buttons={{ noButtons: true }} testid="catalogueEdit">
          <CategoryEditModal setopen={setOpenNew} parentUID={catalogueParentUid} />
        </ModalComponent>
      </Fragment>
    )
  }

  return { getEditDeleteButtons, getAddButton }
}
