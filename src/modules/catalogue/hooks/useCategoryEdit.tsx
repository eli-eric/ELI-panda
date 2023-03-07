import {
  ChevronRightIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'

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
  catalogueParentPath
}: {
  editUid?: string
  catalogueParentPath?: string | undefined
}) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openCopy, setOpenCopy] = useState(false)
  const [openCopyEdit, setOpenCopyEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { data: session } = useSession()
  const { catalogueCategoryEdit, catalogueCategories, catalogueCategoryCopy } =
    useEndpoint({
      uid: editUid,
      path:
        !catalogueParentPath || catalogueParentPath === ''
          ? ''
          : '/' + catalogueParentPath
    })
  const { submit, loading, error } = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: 'delete',
    mutateList: [catalogueCategories]
  })

  const {
    submit: submitCopy,
    loading: loadingCopy,
    error: errorCopy,
    response: responseCopy
  } = useSubmit<{ uid: string }>({
    endpoint: catalogueCategoryCopy,
    method: 'post',
    mutateList: [catalogueCategories]
  })

  const deletModalButtons: ModalButtons = {
    goNext: {
      text: 'Continue',
      loading: loading,
      onClick: () => {
        submit()
          .then()
          .finally(() => {
            setOpenDelete(false)
            setOpenCopyEdit(true)
          })
      }
    },
    goBack: {
      text: 'Cancel',
      onClick: () => setOpenDelete(false)
    }
  }

  const copyModalButtons: ModalButtons = {
    goNext: {
      text: 'Copy',
      loading: loadingCopy,
      onClick: () => {
        submitCopy()
          .then()
          .finally(() => {
            setOpenCopy(false)
          })
      }
    },
    goBack: {
      text: 'Cancel',
      onClick: () => setOpenCopy(false)
    }
  }

  const EditButtons = () => (
    <Fragment>
      {session?.user.roles.includes(ROLE.CATALOGUE_CATEGORY_EDIT) && (
        <div className="flex absolute bottom-0 right-0">
          <Button
            rounded=""
            buttonSize="small"
            onClick={() => {
              setOpenEdit(true)
            }}
            className="h-full"
          >
            <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            rounded=""
            buttonSize="small"
            onClick={() => {
              setOpenCopy(true)
            }}
            className="h-full"
          >
            <DocumentDuplicateIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            rounded="rounded-br-md"
            buttonSize="small"
            onClick={() => {
              setOpenDelete(true)
            }}
            className="h-full"
          >
            <TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" />
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
          setOpen={setOpenEdit}
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
      <ModalComponent
        open={openCopy}
        setOpen={setOpenCopy}
        buttons={copyModalButtons}
        testid="catalogueCopy"
      >
        <ModalWarningComponent
          title="Warning"
          message="Are you sure you want to copy this Category?"
        />
        {errorCopy && <ErrorPage />}
      </ModalComponent>
      {responseCopy && (
        <ModalComponent
          open={openCopyEdit}
          setOpen={setOpenCopyEdit}
          buttons={copyModalButtons}
          testid="catalogueCopy"
        >
          <CategoryEditModal
            setOpen={setOpenCopyEdit}
            parentPath={catalogueParentPath ? '/' + catalogueParentPath : ''}
            uid={responseCopy.uid}
          />
        </ModalComponent>
      )}
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
                setOpenEdit(true)
              }}
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </li>
      )}
      <ModalComponent
        open={openEdit}
        setOpen={setOpenEdit}
        buttons={{ noButtons: true }}
        testid="catalogueEdit"
      >
        <CategoryEditModal
          setOpen={setOpenEdit}
          parentPath={catalogueParentPath ? '/' + catalogueParentPath : ''}
        />
      </ModalComponent>
    </Fragment>
  )

  return { EditButtons, getAddButton }
}
