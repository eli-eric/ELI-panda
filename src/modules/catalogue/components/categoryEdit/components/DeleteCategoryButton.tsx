import { TrashIcon } from '@heroicons/react/24/outline'
import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { Button } from '@/components/Buttons'
import WarningModal from '@/components/overlays/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import { useCategoryList } from '@/modules/catalogue/hooks/useCategoryList'
import type { ModalButtons } from '@/types/form'

const messages = message.common

interface EditCategoryProps {
  uid: string
}

export const DeleteCategoryButton: FC<EditCategoryProps> = ({ uid }) => {
  const [open, setOpen] = useState(false)

  const { refetch } = useCategoryList()

  const { catalogueCategoryEdit } = useEndpoint({
    uid
  })

  const deleteCategory = useSubmit({
    endpoint: catalogueCategoryEdit,
    method: 'delete',
    onSuccess: () => {
      setOpen(false)
      refetch()
    }
  })

  const deletModalButtons: ModalButtons = {
    goNext: {
      text: messages.buttons.continue,
      loading: deleteCategory.loading,
      onClick: () => {
        deleteCategory.submit()
      }
    },
    goBack: {
      text: messages.buttons.cancel,
      onClick: () => setOpen(false)
    }
  }

  return (
    <Fragment>
      <Button
        onClick={() => {
          setOpen(true)
        }}
        variant="ghost"
      >
        <TrashIcon
          className="h-4 w-4 hover:text-red-500 text-red-700 transform transition-transform hover:scale-110 duration-300"
          aria-hidden="true"
        />
      </Button>
      <WarningModal
        title={messages.warning}
        message="Are you sure you want to remove this Category?"
        open={open}
        setOpen={setOpen}
        buttons={deletModalButtons}
        testid="catalogueEdit"
      />
    </Fragment>
  )
}
