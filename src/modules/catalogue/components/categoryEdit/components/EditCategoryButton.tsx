import { PencilSquareIcon } from '@heroicons/react/24/outline'
import type { FC } from 'react'
import { Fragment, useState } from 'react'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/overlays/modal/modal.comp'

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
    <Fragment>
      <Button
        buttonSize="small"
        onClick={() => {
          setOpen(true)
        }}
        className="h-full z-0 hover:text-primary-400 border-none bg-inherit shadow-none dark:bg-inherit dark:hover:bg-inherit"
      >
        <PencilSquareIcon
          className="h-4 w-4 transform transition-transform hover:scale-110 duration-300"
          aria-hidden="true"
        />
      </Button>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        buttons={{ noButtons: true }}
      >
        <CategoryEditContainer
          setOpen={setOpen}
          parentUID={parentUID}
          uid={uid}
        />
      </ModalComponent>
    </Fragment>
  )
}
