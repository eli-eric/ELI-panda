import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

export const NotFound = ({ code }: { code: string }) => {
  const { formatMessage: fm } = useIntl()

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4">
        <svg
          className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">
        {fm({ id: message.systemsPage.notFound.heading })}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm">
        {fm({ id: message.systemsPage.notFound.message })} &quot;{code}&quot;.{' '}
        {fm({ id: message.systemsPage.notFound.mayNotExist })}
      </p>
      <div className="text-xs text-gray-400 dark:text-gray-500">
        {fm({ id: message.systemsPage.notFound.tryChecking })}
      </div>
    </div>
  )
}
