import { Home } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'
import { PATH } from '@/types/constants/paths'
import { SystemLevel } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

interface BreadcrumbsProps {
  parentPath?: CodebookType[]
  isLink?: boolean
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ parentPath, isLink = true }) => {
  if (!parentPath || parentPath.length === 0) {
    return null
  }

  return (
    <Breadcrumb className="text-muted-foreground">
      <BreadcrumbList className="px-1 py-1 overflow-x-auto">
        {isLink && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={PATH.SYSTEMS}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {parentPath?.map((system, index) => {
          const link = isLink ? PATH.SYSTEM + '/' + system.uid : undefined
          const isLast = index === parentPath.length - 1

          return (
            <Fragment key={system?.uid}>
              <BreadcrumbItem>
                {link ? (
                  <BreadcrumbLink asChild>
                    <Link
                      href={link}
                      className={cn(
                        'text-muted-foreground hover:text-foreground text-sm font-medium',
                        system.systemLevel === SystemLevel.KeySystems &&
                          'text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300',
                        system.systemLevel === SystemLevel.TechnologyUnit &&
                          'text-lime-700 dark:text-lime-200 hover:text-lime-800 dark:hover:text-lime-100'
                      )}
                    >
                      {system?.name}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span
                    className={cn(
                      'text-muted-foreground text-sm font-medium',
                      system.systemLevel === SystemLevel.KeySystems &&
                        'text-orange-600 dark:text-orange-400',
                      system.systemLevel === SystemLevel.TechnologyUnit &&
                        'text-lime-700 dark:text-lime-200'
                    )}
                  >
                    {system?.name}
                  </span>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
export default Breadcrumbs
