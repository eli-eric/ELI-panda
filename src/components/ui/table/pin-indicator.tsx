import { PaperClipIcon } from '@heroicons/react/24/outline'
import React from 'react'

import { cx } from '@/utils'

import type { PinnedPosition } from './types'

interface PinIndicatorProps {
  column: any
  position: PinnedPosition
}

export function PinIndicator({ column, position }: PinIndicatorProps) {
  // Only show for left pinning
  if (position === 'right') return null

  const isPinned = column.getIsPinned() === position
  const canPin = column.getCanPin()

  if (!canPin) return null

  return (
    <button
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation() // Prevent sorting when clicking pin
        column.pin(isPinned ? false : position)
      }}
      className={cx(
        'p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
        isPinned ? 'text-primary-500' : 'text-gray-400'
      )}
      title={`${isPinned ? 'Unpin' : 'Pin'} column`}
    >
      <PaperClipIcon className={cx('w-4 h-4', isPinned && '-rotate-45')} />
    </button>
  )
}
