import { Edit } from 'lucide-react'
import type { FC } from 'react'

import { Button } from '@/components/Buttons'

import CategoryEditContainer from '../CategoryEdit.cont'

interface EditCategoryProps {
  uid: string
  parentUID?: string
}

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
  const openEditCategorySheet = () => {
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
    <Button variant="ghost" onClick={openEditCategorySheet}>
      <Edit
        className="h-4 w-4 transform transition-transform hover:scale-110 duration-300"
        aria-hidden="true"
      />
    </Button>
  )
}
