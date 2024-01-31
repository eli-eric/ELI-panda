import type { FC, PropsWithChildren } from 'react'
import { FormattedMessage } from 'react-intl'

import { UserProfileNav } from './UserProfile.nav'

interface Props {
  title: string
  subTitle: string
}

export const UserProfileLayout: FC<PropsWithChildren<Props>> = ({ children, title, subTitle }) => (
  <>
    <div className="mx-auto max-w-7xl lg:flex lg:gap-x-16 lg:px-8">
      <UserProfileNav />
      <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
        <div className="border-b pb-5 border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
            <FormattedMessage id={title} />
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            <FormattedMessage id={subTitle} />
          </p>
        </div>
        {children}
      </main>
    </div>
  </>
)
