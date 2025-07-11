import Link from 'next/link'
import { type FC, type PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'
import type { ROLE } from '@/types/constants/roles'

import { AccessControl } from '../auth/AccesControl'

interface CardProps {
  name: string
  link?: string
  Icon: () => JSX.Element
  legacyBehavior?: boolean
  role: ROLE
}

export const Tile = ({ name, link, Icon, legacyBehavior, role }: CardProps) => {
  return (
    <AccessControl roles={role}>
      <div data-testid={`tile-${name}`}>
        {link ? (
          <Link
            href={link}
            legacyBehavior={legacyBehavior}
            target={legacyBehavior ? '_blank' : undefined}
          >
            <li
              key={name}
              className={cn(
                'col-span-1 flex flex-col rounded-xl bg-white shadow-md dark:bg-gray-700 text-center cursor-pointer',
                'dark:text-gray-200 dark:shadow-black',
                'transform transition-transform duration-300 hover:shadow-2xl hover:-translate-y-3'
              )}
            >
              <div className="flex flex-1 flex-col p-8">
                <Icon />
                <h2 className="mt-6 text-xl font-medium text-gray-900 dark:text-gray-200">
                  {name}
                </h2>
              </div>
              <div>
                <div className="-mt-px flex ">
                  <div className="flex w-0 flex-1"></div>
                  <div className="-ml-px flex w-0 flex-1"></div>
                </div>
              </div>
            </li>
          </Link>
        ) : (
          <li
            key={name}
            className="col-span-1 flex flex-col rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 text-center shadow cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex flex-1 flex-col p-8">
              <Icon />
              <h2 className="mt-6 text-xl font-medium text-gray-900 dark:text-gray-200">
                {name}
              </h2>
            </div>
            <div>
              <div className="-mt-px flex ">
                <div className="flex w-0 flex-1"></div>
                <div className="-ml-px flex w-0 flex-1"></div>
              </div>
            </div>
          </li>
        )}
      </div>
    </AccessControl>
  )
}

export const TileContainer: FC<PropsWithChildren> = ({ children }) => (
  <ul
    data-testid="tile-container"
    role="list"
    className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 py-2 sm:px-4 sm:py-4 my-5 mx-2"
  >
    {children}
  </ul>
)
