import { Edit } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import CategoryEditContainer from '../CategoryEdit.cont'

interface EditCategoryProps {
  uid: string
  parentUID?: string
}

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

let currentEditCategoryModalId: string | undefined

export function EditCategorySheetContent({
  uid,
  parentUID,
  onClose
}: EditCategoryProps & { onClose?: () => void }) {
  return (
    <>
      <CategoryEditContainer
        setOpen={() => {
          if (onClose) onClose()
        }}
        parentUID={parentUID}
        uid={uid}
        modalId={currentEditCategoryModalId}
      />
    </>
  )
}

export const EditCategoryButton: FC<EditCategoryProps> = ({
  uid,
  parentUID
}) => {
  const { formatMessage: fm } = useIntl()
  const openEditCategorySheet = e => {
    e.stopPropagation()
    if (typeof window === 'undefined') return // Prevent SSR execution
    const { openModal } = useDynamicModalStore.getState()

    currentEditCategoryModalId = openModal('sheet', {
      id: `category-edit-${uid}`,
      component: EditCategorySheetContent,
      props: {
        uid,
        parentUID,
        title: uid
          ? fm({ id: message.catalogue.category.editCategory })
          : fm({ id: message.catalogue.category.addNew })
      },
      onClose: undefined
    })
    return currentEditCategoryModalId
  }

  return (
    <DropdownMenuItem
      onClick={openEditCategorySheet}
      className="flex items-center gap-2 w-full text-left"
    >
      <Edit
        className="h-4 w-4 transform transition-transform hover:scale-110 duration-300"
        aria-hidden="true"
      />
      <span className="ml-2">
        {fm({ id: message.catalogue.category.editCategory })}
      </span>
    </DropdownMenuItem>
  )
}
