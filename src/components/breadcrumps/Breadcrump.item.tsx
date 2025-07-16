import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import type { Maybe } from '@/types/gql/graphql'
import { SystemLevel } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

interface Props {
  name?: Maybe<string>
  link?: string
  setCategoryFilter?: (value: CodebookType) => void
  path?: CodebookType
  systemLevel?: SystemLevel
  noIcon?: boolean
}

export const BreadcrumpItem = ({
  name,
  link,
  setCategoryFilter,
  path,
  systemLevel,
  noIcon = false
}: Props) => {
  if (setCategoryFilter && path) {
    return (
      <li key={name} className="flex">
        <div className="flex items-center whitespace-nowrap">
          <ChevronRightIcon
            className="h-4 w-4 shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <button
            onClick={() =>
              setCategoryFilter({ uid: path.uid, name: path.name })
            }
            className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-orange-600"
          >
            {name}
          </button>
        </div>
      </li>
    )
  }

  return (
    <li key={name} className="flex">
      <div className="flex items-center whitespace-nowrap">
        {!noIcon && (
          <ChevronRightIcon
            className="h-4 w-4 shrink-0 text-gray-400"
            aria-hidden="true"
          />
        )}
        {link ? (
          <Link
            href={{ pathname: link }}
            className={cn(
              'ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-orange-600',
              systemLevel === SystemLevel.KeySystems &&
                'text-orange-600 dark:text-orange-400',
              systemLevel === SystemLevel.TechnologyUnit &&
                'text-lime-700 dark:text-lime-200'
            )}
          >
            {name}
          </Link>
        ) : (
          <span className="ml-1 text-sm font-medium text-gray-500">{name}</span>
        )}
      </div>
    </li>
  )
}
