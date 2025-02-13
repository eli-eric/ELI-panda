import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import type { FC } from 'react'
import { Fragment, useEffect, useState } from 'react'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import WarningModal from '@/components/overlays/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import type { ModalButtons } from '@/types/form'

import CategoryEditContainer from '../CategoryEdit.cont'

const messages = message.common

interface CopyCategoryButtonProps {
  uid: string
}

export const CopyCategoryButton: FC<CopyCategoryButtonProps> = ({ uid }) => {
  const parentUID = useCategoryUid()
  const [openCopyEdit, setOpenCopyEdit] = useState(false)
  const [openCopy, setOpenCopy] = useState(false)
  const [copyCategoryUid, setCopyCategoporyUid] = useState<string | null>()
  const { refetch } = useCategoryList()

  const { catalogueCategoryCopy } = useEndpoint({
    uid
  })

  useEffect(() => {
    if (copyCategoryUid) {
      setOpenCopyEdit(true)
    }
  }, [copyCategoryUid])

  const copyCategory = useSubmit<string>({
    endpoint: catalogueCategoryCopy,
    method: 'post',
    onSuccess: uid => {
      setOpenCopy(false)
      refetch()
      setCopyCategoporyUid(uid)
    }
  })

  const copyModalButtons: ModalButtons = {
    goNext: {
      text: messages.buttons.continue,
      loading: copyCategory.loading,
      onClick: () => {
        copyCategory.submit()
      }
    },
    goBack: {
      text: messages.buttons.cancel,
      onClick: () => setOpenCopy(false)
    }
  }
  return (
    <Fragment>
      <Button
        buttonSize="small"
        onClick={() => {
          setOpenCopy(true)
        }}
        className="h-full z-0 hover:text-primary-400 border-none bg-inherit shadow-none dark:bg-inherit dark:hover:bg-inherit"
      >
        <DocumentDuplicateIcon
          className="h-4 w-4 transform transition-transform hover:scale-110 duration-300"
          aria-hidden="true"
        />
      </Button>
      <WarningModal
        title={messages.warning}
        message="Are you sure you want to copy this Category?"
        open={openCopy}
        setOpen={setOpenCopy}
        buttons={copyModalButtons}
        testid="catalogueCopy"
        error={copyCategory.error}
      />
      {copyCategoryUid && (
        <ModalComponent
          open={openCopyEdit}
          setOpen={setOpenCopyEdit}
          buttons={{ noButtons: true }}
        >
          <CategoryEditContainer
            setOpen={setOpenCopyEdit}
            parentUID={parentUID}
            uid={copyCategoryUid}
          />
        </ModalComponent>
      )}
    </Fragment>
  )
}
