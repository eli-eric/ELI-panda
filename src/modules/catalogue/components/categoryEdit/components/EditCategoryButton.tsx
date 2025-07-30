import { Edit } from 'lucide-react'
import type { FC } from 'react'

import CategoryEditContainer from '../CategoryEdit.cont'

interface EditCategoryProps {
  uid: string
  parentUID?: string
}

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

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
      />
    </>
  )
}

export const EditCategoryButton: FC<EditCategoryProps> = ({
  uid,
  parentUID
}) => {
  const openEditCategorySheet = e => {
    e.stopPropagation()
    if (typeof window === 'undefined') return // Prevent SSR execution
    const { openModal } = useModalGlobalStore.getState()
    openModal('sheet', {
      component: EditCategorySheetContent,
      props: {
        uid,
        parentUID,
        title: uid ? 'Edit Category' : 'Add New Category'
      },
      onClose: undefined
    })
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
      <span className="ml-2">Edit Category</span>
    </DropdownMenuItem>
  )
}
