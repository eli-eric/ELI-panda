import {
  ChevronRightIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { type Dispatch, Fragment, type SetStateAction, useEffect, useState } from 'react'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import CategoryEditModal from '@/modules/catalogue/categoryEditForm/CategoryEditModal'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'

import useSubmit from '../../../hooks/useSubmit'

interface EditModalProps {
  testid: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  uid?: string
  parentPath: string
}

const EditModal = ({ testid, open, setOpen, uid, parentPath }: EditModalProps) => (
  <ModalComponent open={open} setOpen={setOpen} buttons={{ noButtons: true }} testid={testid}>
    <CategoryEditModal setOpen={setOpen} parentPath={parentPath} uid={uid} />
  </ModalComponent>
)

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
  const [copyCategoryUid, setCopyCategoporyUid] = useState<string | null>()
  const parentPath = catalogueParentPath ? '/' + catalogueParentPath : ''

  const { data: session } = useSession()
  const { catalogueCategoryEdit, catalogueCategories, catalogueCategoryCopy } = useEndpoint({
    uid: editUid,
    path: !catalogueParentPath || catalogueParentPath === '' ? '' : '/' + catalogueParentPath
  })
  const deleteCategory = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: 'delete',
    mutateList: [catalogueCategories],
    onSuccess: () => {
      setOpenDelete(false)
    }
  })
  const copyCategory = useSubmit<string>({
    endpoint: catalogueCategoryCopy,
    method: 'post',
    mutateList: [catalogueCategories],
    onSuccess: uid => {
      setOpenCopy(false)
      setCopyCategoporyUid(uid)
    }
  })
  const deletModalButtons: ModalButtons = {
    goNext: {
      text: 'Continue',
      loading: deleteCategory.loading,
      onClick: () => {
        deleteCategory.submit()
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
      loading: copyCategory.loading,
      onClick: () => {
        copyCategory.submit()
      }
    },
    goBack: {
      text: 'Cancel',
      onClick: () => setOpenCopy(false)
    }
  }

  //open edit modal after copy
  useEffect(() => {
    if (copyCategoryUid) {
      setOpenCopyEdit(true)
    }
  }, [copyCategoryUid])

  const getEditButtons = () => {
    if (session?.user.roles.includes(ROLE.CATALOGUE_CATEGORY_EDIT)) {
      return (
        <Fragment>
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
          <EditModal
            open={openEdit}
            parentPath={parentPath}
            uid={editUid}
            setOpen={setOpenEdit}
            testid="catalogueEdit"
          />
          <WarningModal
            title="Warning"
            message="Are you sure you want to remove this Category?"
            open={openDelete}
            setOpen={setOpenDelete}
            buttons={deletModalButtons}
            testid="catalogueEdit"
            error={deleteCategory.error}
          />
          <WarningModal
            title="Warning"
            message="Are you sure you want to copy this Category?"
            open={openCopy}
            setOpen={setOpenCopy}
            buttons={copyModalButtons}
            testid="catalogueCopy"
            error={copyCategory.error}
          />
          {copyCategoryUid && (
            <EditModal
              open={openCopyEdit}
              setOpen={setOpenCopyEdit}
              testid="catalogueCopy"
              parentPath={parentPath}
              uid={copyCategoryUid}
            />
          )}
        </Fragment>
      )
    }
  }

  const getAddButton = () => {
    if (session?.user.roles.includes(ROLE.CATALOGUE_CATEGORY_EDIT)) {
      return (
        <Fragment>
          <li className="flex">
            <div className="flex items-center">
              <ChevronRightIcon className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400" aria-hidden="true" />
              <Button
                onClick={() => {
                  setOpenEdit(true)
                }}
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </li>
          <EditModal open={openEdit} setOpen={setOpenEdit} parentPath={parentPath} testid="catalogueEdit" />
        </Fragment>
      )
    }
  }

  return { getEditButtons, getAddButton }
}
