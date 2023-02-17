import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ModalComponent from 'src/components/ui/modal/modal.comp'
import ModalWarningComponent from 'src/components/ui/modal/warning/modal-warning.comp'

import { categoryMockObject } from '@/types/catalogue/constants'
import { ENDPOINTS } from '@/types/constants/endpoints'
import { PATH } from '@/types/constants/paths'
import { ModalButtons } from '@/types/form'
import { CatalogueCategoryResponse } from '@/types/responses'

import CategoryEditForm from '../categoryEditForm/CategoryEditForm'

interface Props {
  category: CatalogueCategoryResponse
}

const CategoryItemComponent = ({ category }: Props) => {
  const router = useRouter()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { search } = router.query
  const path = PATH.CATALOGUE + (!category.parentPath ? '/' : '/' + category.parentPath + '/') + category.code

  const deletModalButtons: ModalButtons = {
    goNext: {
      text: 'continue',
      onClick: () => setOpenDelete(false)
    },
    goBack: {
      text: 'cancel',
      onClick: () => setOpenDelete(false)
    }
  }

  return (
    <div className=" flex-row justify-between relative flex z-10 items-center space-x-3 rounded-lg border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:border-gray-400">
      <Link
        href={{ pathname: path, query: search && { search: search } }}
        key={category.code}
        className=" flex w-full items-center "
      >
        <div className="flex-shrink-0 mx-6 my-5">
          <Image
            className="h-10 w-10 rounded-full object-contain"
            width={200}
            height={200}
            alt={category.code}
            src={ENDPOINTS.catalogueCategory + '/' + category.uid + '/image'}
          />
        </div>
        <div className="min-w-0 flex-1 mx-6 my-5">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{category.name}</p>
          </div>
        </div>
      </Link>
      <div className="relative flex flex-col justify-center z-0">
        <button
          type="button"
          onClick={() => {
            setOpenEdit(true)
          }}
          className="relative inline-flex items-center  rounded-t-md border-l border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <span className="sr-only">Delete</span>
          <PencilSquareIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            setOpenDelete(true)
          }}
          className="relative inline-flex items-center  rounded-b-md border-l border-t border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <span className="sr-only">Delete</span>
          <TrashIcon className="h-6 w-6 text-red-700" aria-hidden="true" />
        </button>
      </div>
      <ModalComponent open={openEdit} setOpen={setOpenEdit} buttons={{ noButtons: true }} testid="catalogueEdit">
        <CategoryEditForm setopen={setOpenEdit} defaultValues={categoryMockObject} />
      </ModalComponent>
      <ModalComponent open={openDelete} setOpen={setOpenDelete} buttons={deletModalButtons} testid="catalogueEdit">
        <ModalWarningComponent title="Warning" message="Are you sure you want to remove this Category?" />
      </ModalComponent>
    </div>
  )
}

export default CategoryItemComponent
