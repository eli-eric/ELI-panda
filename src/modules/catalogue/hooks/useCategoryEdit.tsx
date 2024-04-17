import {
  DocumentDuplicateIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useEffect,
  useState
} from 'react'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import WarningModal from '@/components/overlays/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'

import { useSubmit } from '../../../hooks/fetch/useSubmit'
import CategoryEditContainer from '../components/categoryEdit/CategoryEdit.cont'
import { useCategoryList } from './useCategoryList'
import { useCategoryUid } from './useCategoryUid'

interface EditModalProps {
  testid: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  uid?: string
  parentUID?: string
}

const EditModal = ({
  testid,
  open,
  setOpen,
  uid,
  parentUID
}: EditModalProps) => (
  <ModalComponent
    open={open}
    setOpen={setOpen}
    buttons={{ noButtons: true }}
    testid={testid}
  >
    <CategoryEditContainer setOpen={setOpen} parentUID={parentUID} uid={uid} />
  </ModalComponent>
)

// TODO: clean up
export const useCategoryEdit = ({ editUid }: { editUid?: string }) => {
  const [openEdit, setOpenEdit] = useState(false)
  const [openCopy, setOpenCopy] = useState(false)
  const [openCopyEdit, setOpenCopyEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [copyCategoryUid, setCopyCategoporyUid] = useState<string | null>()

  const parentUID = useCategoryUid()
  const { refetch } = useCategoryList()

  const { data: session } = useSession()
  const { catalogueCategoryEdit, catalogueCategoryCopy } = useEndpoint({
    uid: editUid
  })
  const deleteCategory = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: 'delete',
    onSuccess: () => {
      setOpenDelete(false)
      refetch()
    }
  })
  const copyCategory = useSubmit<string>({
    endpoint: catalogueCategoryCopy,
    method: 'post',
    onSuccess: uid => {
      setOpenCopy(false)
      refetch()
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
              className="h-full z-0"
            >
              <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              rounded=""
              buttonSize="small"
              onClick={() => {
                setOpenCopy(true)
              }}
              className="h-full z-0"
            >
              <DocumentDuplicateIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              rounded="rounded-br-md"
              buttonSize="small"
              onClick={() => {
                setOpenDelete(true)
              }}
              className="h-full z-0"
            >
              <TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" />
            </Button>
          </div>
          <EditModal
            open={openEdit}
            parentUID={parentUID}
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
              parentUID={parentUID}
              uid={copyCategoryUid}
            />
          )}
        </Fragment>
      )
    }
  }

  return { getEditButtons }
}
