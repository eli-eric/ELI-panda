import ModalComponent from '@/components/overlays/modal/modal.comp'
import type { FC } from 'react'
import { Fragment, useState } from 'react'
import CategoryEditContainer from '../CategoryEdit.cont'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/Buttons'

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
        className="h-full z-0"
      >
        <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
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
