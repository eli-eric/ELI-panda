import { MoreVertical } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import usePermission from '@/hooks/usePermission'
import { cn } from '@/lib/utils'
import { FALLBACK_IMAGE } from '@/types/constants/general'
import { ROLE } from '@/types/constants/roles'
import type { GetCategoriesQuery } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

import { CopyCategoryButton } from '../categoryEdit/components/CopyCategoryButton'
import { DeleteCategoryButton } from '../categoryEdit/components/DeleteCategoryButton'
import { EditCategoryButton } from '../categoryEdit/components/EditCategoryButton'

interface Props {
  category: GetCategoriesQuery['catalogueCategories'][0]
  setCategoryFilter: (value: CodebookType) => void
}

// Akční menu vpravo
const CategoryItemActions = ({ uid }: { uid: string }) => {
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])
  if (!canEdit) return null
  return (
    <div className="flex items-center pl-2">
      <div className="self-center h-6 w-px bg-muted mx-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="p-1 rounded hover:bg-muted focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Category actions"
            tabIndex={0}
          >
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={4}>
          <DropdownMenuItem asChild>
            <EditCategoryButton uid={uid} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <CopyCategoryButton uid={uid} />
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="text-red-600 focus:text-red-700">
            <DeleteCategoryButton uid={uid} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const CategoryItemComponent = ({
  category,
  setCategoryFilter
}: Props) => {
  const image = category?.miniImageUrl?.split(';')[0]
  return (
    <Card
      className={cn(
        'group relative flex items-center px-2 py-1 gap-2 rounded-md cursor-pointer transition-all min-h-[44px]',
        'hover:shadow-lg hover:border-orange-500 border border-transparent',
        'bg-card dark:bg-gray-700 justify-center'
      )}
      onClick={() => {
        setCategoryFilter({ uid: category.uid, name: category.name })
      }}
      tabIndex={0}
      role="button"
    >
      <div className="flex items-center justify-between w-full min-w-0 gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1 justify-center">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={image || FALLBACK_IMAGE.url}
              alt={category.name}
            />
            <AvatarFallback>{category.name[0]}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex items-center w-full justify-center">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 break-words leading-tight w-full text-center">
              {category.name}
            </p>
          </div>
        </div>
        <CategoryItemActions uid={category.uid} />
      </div>
    </Card>
  )
}
