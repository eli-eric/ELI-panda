import { useMutation } from '@tanstack/react-query'
import { MoreVertical } from 'lucide-react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { FALLBACK_IMAGE } from '@/types/constants/general'
import { ROLE } from '@/types/constants/roles'
import type { GetCategoriesQuery } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'
import { queryMutate } from '@/utils/fetcher'

import { useCategoryList } from '../../hooks/useCategoryList'
import { CopyCategoryButton } from '../categoryEdit/components/CopyCategoryButton'
import { DeleteCategoryButton } from '../categoryEdit/components/DeleteCategoryButton'
import {
  EditCategoryButton,
  EditCategorySheetContent
} from '../categoryEdit/components/EditCategoryButton'

interface Props {
  category: GetCategoriesQuery['catalogueCategories'][0]
  setCategoryFilter: (value: CodebookType) => void
}

// Akční menu vpravo
const CategoryItemActions = ({ uid }: { uid: string }) => {
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])
  const { formatMessage: fm } = useIntl()
  const { refetch } = useCategoryList()

  const { mutate } = useMutation({
    mutationFn: queryMutate('catalogueCategoryEdit', 'delete', uid),
    onSuccess: () => {
      refetch()
      toast.success(fm({ id: message.catalogue.category.deleted }))
    }
  })
  const withWarningModal = useWarningModal()

  const handleDelete = e => {
    e.stopPropagation()
    withWarningModal(
      mutate,
      fm({ id: message.catalogue.category.confirmDelete })
    )({})
  }

  const parentUID = useCategoryUid()

  const { mutate: copyCategory } = useMutation({
    mutationFn: queryMutate<string, undefined>(
      'catalogueCategoryCopy',
      'post',
      uid
    ),

    onSuccess: ({ data }) => {
      const { openModal } = useModalGlobalStore.getState()
      openModal('sheet', {
        component: EditCategorySheetContent,
        props: {
          uid: data,
          parentUID,
          title: fm({ id: message.catalogue.category.editCopied })
        },
        onClose: undefined
      })
      refetch()
    }
  })

  const handleCopyCategory = e => {
    e.stopPropagation()
    withWarningModal(
      copyCategory,
      fm({ id: message.catalogue.category.confirmCopy })
    )(undefined)
  }

  if (!canEdit) return null
  return (
    <div className="flex items-center pl-2">
      <div className="self-center h-6 w-px bg-muted mx-1" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Category actions"
            variant="ghost"
            tabIndex={0}
            className="has-[>svg]:px-1 cursor-pointer"
          >
            <MoreVertical className="size-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={4}>
          <EditCategoryButton uid={uid} />
          <CopyCategoryButton handleCopyCategory={handleCopyCategory} />
          <DeleteCategoryButton handleDelete={handleDelete} />
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
        'hover:shadow-lg hover:border-orange-500 border border-transparent justify-center'
      )}
      onClick={e => {
        if (
          !(e.target instanceof HTMLElement) ||
          !['BUTTON'].includes(e.target.tagName)
        ) {
          setCategoryFilter({ uid: category.uid, name: category.name })
        }
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
