import type { FC } from 'react'
import { Fragment } from 'react'
import type { History } from './ShowHistoryButton'
import { classNames } from '@/utils'
import Link from 'next/link'
import { PATH } from '@/types/constants/paths'
import { formatDate } from '@/utils/formatters'

interface Props {
  history?: History[]
}
export const HistoryFeeds: FC<Props> = ({ history }) => {
  return (
    <Fragment>
      <ul role="list" className="space-y-6">
        {history?.map((historyItem, index) => (
          <li key={historyItem.uid} className="relative flex gap-x-4">
            <div
              className={classNames(
                index === history.length - 1 ? 'h-6' : '-bottom-6',
                'absolute left-0 top-0 flex w-6 justify-center'
              )}
            >
              <div className="w-px bg-gray-200" />
            </div>
            <>
              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-800">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
              </div>
              <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  {historyItem.changedBy}
                </span>{' '}
                {historyItem.historyType === 'GENERAL' ? (
                  `made ${historyItem.action}`
                ) : historyItem.historyType === 'ITEM' ? (
                  <span>
                    {`move Item to `}
                    <Link
                      href={PATH.SYSTEM + '/' + historyItem.detail.systemUid}
                      target="_blank"
                      className="text-blue-500 hover:underline"
                    >
                      {historyItem.detail.systemName}
                    </Link>{' '}
                  </span>
                ) : historyItem.historyType === 'MOVE' ? (
                  historyItem.detail.direction === 'IN' ? (
                    <span>
                      moved the{' '}
                      <Link
                        href={PATH.SYSTEM + '/' + historyItem.detail.systemUid}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        {historyItem.detail.systemName}
                      </Link>{' '}
                      from under that system
                    </span>
                  ) : (
                    <span>
                      this system was moved from{' '}
                      <Link
                        href={PATH.SYSTEM + '/' + historyItem.detail.systemUid}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        {historyItem.detail.systemName}
                      </Link>
                    </span>
                  )
                ) : (
                  ''
                )}
              </p>
              <time
                dateTime={historyItem.changedAt}
                className="flex-none py-0.5 text-xs leading-5 text-gray-500 dark:text-gray-400"
              >
                {formatDate(historyItem.changedAt)}
              </time>
            </>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}
