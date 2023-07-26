import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  homeLink: string

  testId?: string
}
const BreadcrumpContainer = ({ testId, homeLink, children }: Props) => (
  <div
    data-testid={testId}
    id="breadcrump"
    className="
      relative bg-white
      before:absolute before:top-0 before:bottom-0 before:left-0 before:w-6 before:bg-gradient-to-r from-white before:z-10
      after:absolute after:top-0 after:bottom-0 after:right-0 after:w-6 after:bg-gradient-to-l from-white after:z-10
    "
  >
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex space-x-1 bg-white px-6 py-3 overflow-x-auto">
        <li className="flex">
          <div className="flex items-center">
            <Link
              data-testid={testId + '-home'}
              href={{ pathname: homeLink }}
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon
                className="h-4 w-4

 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {children}
      </ol>
    </nav>
  </div>
)

export default BreadcrumpContainer
