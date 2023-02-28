import {
  ChevronRightIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'

import { Button } from '@/components/Buttons'
import ErrorPage from '@/components/error/ErrorPage'
import ModalComponent from '@/components/modal/modal.comp'
import ModalWarningComponent from '@/components/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import CategoryEditModal from '@/modules/catalogue/categoryEditForm/CategoryEditModal'
import { ROLE } from '@/types/constants/roles'
import { ModalButtons } from '@/types/form'

import useSubmit from '../../../hooks/useSubmit'

export const useCategoryEdit = ({
  editUid,
  catalogueParentPath,
}: {
  editUid?: string
  catalogueParentPath?: string | undefined
}) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openNew, setOpenNew] = useState(false)

  const { data: session } = useSession()
  const { catalogueCategoryEdit, catalogueCategories } = useEndpoint({
    uid: editUid,
    path: '/' + catalogueParentPath,
  })
  const { submit, loading, error, response } = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: 'delete',
    mutateList: [catalogueCategories],
  })

  const deletModalButtons: ModalButtons = {
    goNext: {
      text: 'Continue',
      loading: loading,
      onClick: () => {
        submit()
      },
    },
    goBack: {
      text: 'Cancel',
      onClick: () => setOpenDelete(false),
    },
  }

  useEffect(() => {
    if (response)
      if (!error) {
        setOpenDelete(false)
      }
  }, [response, setOpenDelete, error])

  const getEditDeleteButtons = () => (
    <Fragment>
      {session?.user.roles.includes(ROLE.CATALOGUE_CATEGORY_EDIT) && (
        <div className="relative flex flex-col justify-center z-0">
          <Button
            rounded="rounded-t-md"
            onClick={() => {
              setOpenEdit(true)
            }}
          >
            <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
          </Button>
          <Button
            rounded="rounded-b-md"
            onClick={() => {
              setOpenDelete(true)
            }}
          >
            <TrashIcon className="h-6 w-6 text-red-700" aria-hidden="true" />
          </Button>
        </div>
      )}
      <ModalComponent
        open={openEdit}
        setOpen={setOpenEdit}
        buttons={{ noButtons: true }}
        testid="catalogueEdit"
      >
        <CategoryEditModal
          setopen={setOpenEdit}
          uid={editUid}
          parentPath={catalogueParentPath ? '/' + catalogueParentPath : ''}
        />
      </ModalComponent>
      <ModalComponent
        open={openDelete}
        setOpen={setOpenDelete}
        buttons={deletModalButtons}
        testid="catalogueEdit"
      >
        <ModalWarningComponent
          title="Warning"
          message="Are you sure you want to remove this Category?"
        />
        {error && <ErrorPage />}
      </ModalComponent>
    </Fragment>
  )

  const getAddButton = () => (
    <Fragment>
      {session?.user.roles.includes(ROLE.CATALOGUE_CATEGORY_EDIT) && (
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
        <CategoryEditModal
          setopen={setOpenNew}
          parentPath={catalogueParentPath ? '/' + catalogueParentPath : ''}
        />
      </ModalComponent>
    </Fragment>
  )

  return { getEditDeleteButtons, getAddButton }
}
