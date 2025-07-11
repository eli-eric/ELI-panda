import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  homeLink?: string
  testId?: string
}
export const BreadcrumpContainer = ({ testId, homeLink, children }: Props) => (
  <div
    data-testid={testId}
    id="breadcrump"
    className={cn('relative bg-white dark:bg-gray-800')}
  >
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex space-x-1 bg-white dark:bg-gray-800 px-3 py-3 overflow-x-auto"
      >
        {homeLink && (
          <li className="flex">
            <div className="flex items-center">
              <Link
                data-testid={testId + '-home'}
                href={{ pathname: homeLink }}
                className="text-gray-400 hover:text-gray-500 dark:text-gray-200 dark:hover:text-primary-600"
              >
                <HomeIcon className="h-4 w-4 flex-shrink-0" />
              </Link>
            </div>
          </li>
        )}
        {children}
      </ol>
    </nav>
  </div>
)
