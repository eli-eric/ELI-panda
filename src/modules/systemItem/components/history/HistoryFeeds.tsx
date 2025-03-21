import Link from 'next/link'
import type { FC } from 'react'

import { PATH } from '@/types/constants/paths'
import { cx } from '@/utils'
import { formatDate } from '@/utils/formatters'

import { HISTORY_TYPE } from '../../types/constants'
import type { HistoryResponse } from '../../types/responses'

interface Props {
  history?: HistoryResponse[]
}

export const HistoryFeeds: FC<Props> = ({ history }) => {
  if (!history || history.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No history found</p>
  }

  return (
    <ul role="list" className="space-y-6 max-h-96 overflow-y-auto">
      {history.map((historyItem, index) => (
        <HistoryFeedItem
          key={historyItem.uid}
          historyItem={historyItem}
          isLast={index === history.length - 1}
        />
      ))}
    </ul>
  )
}

interface HistoryFeedItemProps {
  historyItem: HistoryResponse
  isLast: boolean
}

const HistoryFeedItem: FC<HistoryFeedItemProps> = ({ historyItem, isLast }) => {
  return (
    <li className="relative flex gap-x-4 pr-2">
      <div
        className={cx(
          isLast ? 'h-6' : '-bottom-6',
          'absolute left-0 top-0 flex w-6 justify-center'
        )}
      >
        <div className="w-px bg-gray-200" />
      </div>
      <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white dark:bg-gray-800">
        <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
      </div>
      <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500 dark:text-gray-400">
        <span className="font-medium text-gray-900 dark:text-gray-200">
          {historyItem.changedBy}
        </span>{' '}
        {renderHistoryMessage(historyItem)}
      </p>
      <time
        dateTime={historyItem.changedAt}
        className="flex-none py-0.5 text-xs leading-5 text-gray-500 dark:text-gray-400"
      >
        {formatDate(historyItem.changedAt)}
      </time>
    </li>
  )
}

function renderHistoryMessage(historyItem: HistoryResponse) {
  const { historyType, action, detail } = historyItem

  switch (historyType) {
    case HISTORY_TYPE.GENERAL:
      return `made ${action}`
    case HISTORY_TYPE.ITEM:
      return (
        <>
          moved Item to{' '}
          <Link
            href={`${PATH.SYSTEM}/${detail.systemUid}`}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            {detail.systemName}
          </Link>
        </>
      )
    case HISTORY_TYPE.MOVE:
      if (detail.direction === 'IN') {
        return (
          <>
            moved the{' '}
            <Link
              href={`${PATH.SYSTEM}/${detail.systemUid}`}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {detail.systemName}
            </Link>{' '}
            from under that system
          </>
        )
      } else {
        return (
          <>
            this system was moved from{' '}
            <Link
              href={`${PATH.SYSTEM}/${detail.systemUid}`}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {detail.systemName}
            </Link>
          </>
        )
      }
    case HISTORY_TYPE.ITEM_MOVE:
      if (detail.direction === 'IN') {
        return (
          <>
            moved item from{' '}
            <Link
              href={`${PATH.SYSTEM}/${detail.systemUid}`}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {detail.systemName}
            </Link>{' '}
          </>
        )
      } else {
        return (
          <>
            moved item to{' '}
            <Link
              href={`${PATH.SYSTEM}/${detail.systemUid}`}
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              {detail.systemName}
            </Link>
          </>
        )
      }
    default:
      return null
  }
}
