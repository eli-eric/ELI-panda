import { PlusButton } from '@/components/Buttons'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
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
          <ChevronRightIcon
            className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />

          <PlusButton
            onClick={() => {
              setOpen(true)
            }}
          />
        </div>
      </li>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        buttons={{ noButtons: true }}
      >
        <CategoryEditContainer setOpen={setOpen} parentUID={parentUID} />
      </ModalComponent>
    </Fragment>
  )
}
