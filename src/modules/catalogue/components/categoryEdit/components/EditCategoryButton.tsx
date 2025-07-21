import { Edit } from 'lucide-react'
import type { FC } from 'react'
import { useState } from 'react'

import { Button } from '@/components/Buttons'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import CategoryEditContainer from '../CategoryEdit.cont'

interface EditCategoryProps {
  uid: string
  parentUID?: string
}

export const EditCategoryButton: FC<EditCategoryProps> = ({
  uid,
  parentUID
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Edit
            className="h-4 w-4 transform transition-transform hover:scale-110 duration-300"
            aria-hidden="true"
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="w-full sm:w-[400px] lg:w-[600px] xl:w-[800px] !max-w-none overflow-y-auto px-2 sm:px-4 lg:px-6"
        style={{ maxWidth: 'none' }}
      >
        <SheetHeader>
          <SheetTitle>{uid ? 'Edit Category' : 'Add New Category'}</SheetTitle>
        </SheetHeader>
        <CategoryEditContainer
          setOpen={setOpen}
          parentUID={parentUID}
          uid={uid}
        />
      </SheetContent>
    </Sheet>
  )
}
