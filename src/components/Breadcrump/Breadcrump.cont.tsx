import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
  homeLink: string

  testId?: string
}
const BreadcrumpContainer = ({ testId, homeLink, children }: Props) => (
  <div data-testid={testId} id="breadcrump" className="bg-white pt-3 pb-3 ">
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex space-x-1 bg-white px-6  ">
        <li className="flex">
          <div className="flex items-center">
            <Link
              data-testid={testId + '-home'}
              href={{ pathname: homeLink }}
              className="text-gray-400 hover:text-gray-500"
            >
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
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
