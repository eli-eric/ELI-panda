import React from 'react'

import { PinIcon } from '@/components/icons/pin'
import { cn } from '@/lib/utils'

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
      className={cn(
        'p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
        isPinned ? 'text-orange-500' : 'text-gray-400'
      )}
      title={`${isPinned ? 'Unpin' : 'Pin'} column`}
    >
      <PinIcon
        className={cn(
          'w-4 h-4',
          isPinned && '-rotate-45',
          isPinned ? 'text-orange-500' : 'text-gray-400'
        )}
      />
    </button>
  )
}
