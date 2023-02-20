import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PlusIconButton } from '@/components/ui/Buttons'
import ModalComponent from 'src/components/ui/modal/modal.comp'
import { PATH } from '@/types/constants/paths'

import CategoryEditForm from '../categoryEditForm/CategoryEditForm'

interface Props {
  navigationList: JSX.Element[] | undefined
  handleClick: (path: string) => void
  testId: string
}

const BreadcrumbListComponent = ({
  navigationList,
  handleClick,
  testId,
}: Props) => {
  const router = useRouter()
  const [open, setopen] = useState(false)

  const { search } = router.query

  const onCLickHandler = () => {
    handleClick(PATH.CATALOGUE + (search ? `?search=${search}` : ''))
  }

  return (
    <div
      data-testid={testId}
      id="catalogue-breadcrump"
      className="bg-white pt-3 pb-3 "
    >
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex space-x-4 bg-white px-6  ">
          <li className="flex">
            <div className="flex items-center">
              <button
                data-testid={testId + '-home'}
                onClick={onCLickHandler}
                className="text-gray-400 hover:text-gray-500"
              >
                <HomeIcon
                  className="h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </button>
            </div>
          </li>
          {navigationList}
          <li className="flex">
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <PlusIconButton
                onClickAction={() => {
                  setopen(true)
                }}
              />
            </div>
          </li>
        </ol>
      </nav>
      <ModalComponent
        open={open}
        setOpen={setopen}
        buttons={{ noButtons: true }}
        testid="catalogueEdit"
      >
        <CategoryEditForm setopen={setopen} />
      </ModalComponent>
    </div>
  )
}
export default BreadcrumbListComponent
