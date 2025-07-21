import { ChevronRight } from 'lucide-react'
import { Fragment, useState } from 'react'

import { PlusButton } from '@/components/Buttons'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import usePermission from '@/hooks/usePermission'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { ROLE } from '@/types/constants/roles'

import CategoryEditContainer from '../CategoryEdit.cont'

export const AddCategoryButton = () => {
  const [open, setOpen] = useState(false)
  const parentUID = useCategoryUid()
  const canEdit = usePermission([ROLE.CATALOGUE_EDIT])

  if (!canEdit) return null

  return (
    <Fragment>
      <li className="flex">
        <div className="flex items-center">
          <ChevronRight
            className="h-4 w-4 mr-2 shrink-0 text-gray-400"
            aria-hidden="true"
          />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <PlusButton />
            </SheetTrigger>
            <SheetContent
              className="w-full sm:w-[400px] lg:w-[600px] xl:w-[800px] !max-w-none overflow-y-auto px-2 sm:px-4 lg:px-6"
              style={{ maxWidth: 'none' }}
            >
              <SheetHeader>
                <SheetTitle>Add New Category</SheetTitle>
              </SheetHeader>
              <CategoryEditContainer setOpen={setOpen} parentUID={parentUID} />
            </SheetContent>
          </Sheet>
        </div>
      </li>
    </Fragment>
  )
}
