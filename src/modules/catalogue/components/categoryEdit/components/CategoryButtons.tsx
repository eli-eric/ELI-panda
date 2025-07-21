import type { FC } from 'react'

import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { CopyCategoryButton } from './CopyCategoryButton'
import { DeleteCategoryButton } from './DeleteCategoryButton'
import { EditCategoryButton } from './EditCategoryButton'

interface CategoryButtonsProps {
  uid: string
}
export const CategoryButtons: FC<CategoryButtonsProps> = ({ uid }) => {
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])

  if (!canEdit) return null
  return (
    <div className="flex items-center gap-1 px-2 py-1 relative z-10 pointer-events-auto">
      <EditCategoryButton uid={uid} />
      <CopyCategoryButton uid={uid} />
      <DeleteCategoryButton uid={uid} />
    </div>
  )
}
