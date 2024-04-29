import type { FC } from 'react'
import { Fragment } from 'react'
import type { History } from './ShowHistoryButton'
import { classNames } from '@/utils'
import Link from 'next/link'
import { PATH } from '@/types/constants/paths'

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
              <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
              </div>
              <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                <span className="font-medium text-gray-900">
                  {historyItem.changedBy}
                </span>{' '}
                {historyItem.historyType === 'GENERAL'
                  ? 'made changes to the system'
                  : historyItem.historyType === 'ITEM'
                    ? `changed the item ${historyItem.detail.systemName}`
                    : historyItem.historyType === 'MOVE'
                      ? `moved the system`
                      : ''}
              </p>
              <time
                dateTime={historyItem.changedAt}
                className="flex-none py-0.5 text-xs leading-5 text-gray-500"
              >
                {historyItem.changedAt}
              </time>
            </>
          </li>
        ))}
      </ul>
    </Fragment>
  )
}
