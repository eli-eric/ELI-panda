import { HomeIcon } from '@heroicons/react/20/solid'
import { PATHS } from 'core/types/constants/paths'
import { useRouter } from 'next/router'

interface Props {
  navigationList: JSX.Element[] | undefined
  handleClick: (path: string) => void
}

const BreadcrumbListComponent = ({ navigationList, handleClick }: Props) => {
  const router = useRouter()

  const { search } = router.query

  const onCLickHandler = () => {
    handleClick(PATHS.CATALOGUE + (search ? `?search=${search}` : ''))
  }

  return (
    <div id="catalogue-breadcrump" className="bg-white pt-3 pb-3 ">
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex space-x-4 bg-white px-6  ">
          <li className="flex">
            <div className="flex items-center">
              <button onClick={onCLickHandler} className="text-gray-400 hover:text-gray-500">
                <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </button>
            </div>
          </li>
          {navigationList}
        </ol>
      </nav>
    </div>
  )
}
export default BreadcrumbListComponent
