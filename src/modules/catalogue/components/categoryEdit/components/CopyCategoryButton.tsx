import { Copy } from 'lucide-react'
import type { FC } from 'react'
import { Fragment, useEffect, useState } from 'react'

import { Button } from '@/components/Buttons'
import WarningModal from '@/components/overlays/modal/warning/modal-warning.comp'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
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
        size="sm"
        onClick={() => {
          setOpenCopy(true)
        }}
        variant="ghost"
      >
        <Copy
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
        <Sheet open={openCopyEdit} onOpenChange={setOpenCopyEdit}>
          <SheetContent
            className="w-full sm:w-[400px] lg:w-[600px] xl:w-[800px] !max-w-none overflow-y-auto px-2 sm:px-4 lg:px-6"
            style={{ maxWidth: 'none' }}
          >
            <SheetHeader>
              <SheetTitle>Copy Category</SheetTitle>
            </SheetHeader>
            <CategoryEditContainer
              setOpen={setOpenCopyEdit}
              parentUID={parentUID}
              uid={copyCategoryUid}
            />
          </SheetContent>
        </Sheet>
      )}
    </Fragment>
  )
}
