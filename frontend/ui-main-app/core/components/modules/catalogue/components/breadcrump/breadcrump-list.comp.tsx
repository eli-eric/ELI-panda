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
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex space-x-4 rounded-md bg-white px-6 shadow">
        <li className="flex">
          <div className="flex items-center">
            <button onClick={onCLickHandler} className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </button>
            {!navigationList && (
              <div className="ml-4">
                <svg
                  className="h-full w-6 flex-shrink-0 text-gray-200"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
              </div>
            )}
          </div>
        </li>
        {navigationList}
      </ol>
    </nav>
  )
}
export default BreadcrumbListComponent
