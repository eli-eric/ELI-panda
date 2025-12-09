import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { SystemSelect } from '@/modules/shared/form/systemSelect/SystemSelect'
import type { CodebookType } from '@/types/responses/codebook'
import type { SystemDetail } from '@/types/responses/systems'

interface EmptySystemModalContentProps {
  onSelect: (item: CodebookType | null, parent?: CodebookType | null) => void
  onClose?: () => void
}

export function EmptySystemModalContent({
  onSelect,
  onClose
}: EmptySystemModalContentProps) {
  const [selectedSystem, setSelectedSystem] = useState<
    SystemDetail | undefined
  >(undefined)

  const handleSystemSelect = (system: SystemDetail | undefined) => {
    // Only allow selection of systems without physical items
    if (system && !system.physicalItem) {
      setSelectedSystem(system)
    }
  }

  const handleConfirm = () => {
    if (selectedSystem) {
      // Convert SystemDetail to CodebookType
      const codebookItem: CodebookType = {
        name: selectedSystem.name,
        uid: selectedSystem.uid
      }

      // Extract parent from parentPath (last element is direct parent)
      const parent =
        selectedSystem.parentPath && selectedSystem.parentPath.length > 0
          ? selectedSystem.parentPath[selectedSystem.parentPath.length - 1]
          : null

      onSelect(codebookItem, parent)
      onClose?.()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <SystemSelect
        selectedSystem={selectedSystem}
        onSelect={handleSystemSelect}
        tableId="emptySystemSelect"
        className="h-[785px] overflow-y-auto"
        getRowProps={row => {
          const hasPhysicalItem = Boolean(row.original.physicalItem)

          return {
            onClick: hasPhysicalItem
              ? e => {
                  e.stopPropagation()
                  e.preventDefault()
                }
              : () => {
                  handleSystemSelect(row.original)
                },
            className: cn(
              hasPhysicalItem
                ? 'opacity-50 cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent'
                : 'cursor-pointer transition-all',
              !hasPhysicalItem && row.original.uid === selectedSystem?.uid
                ? 'bg-orange-50 dark:bg-orange-950 border-l-1 border-l-orange-500'
                : !hasPhysicalItem && 'hover:bg-gray-50 dark:hover:bg-gray-900'
            )
          }
        }}
      />
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button
          type="button"
          variant={'outline'}
          onClick={() => {
            onClose?.()
          }}
        >
          <FormattedMessage id={message.common.buttons.close} />
        </Button>
        <Button
          type="button"
          disabled={!selectedSystem}
          onClick={handleConfirm}
        >
          <FormattedMessage id={message.common.buttons.continue} />
        </Button>
      </div>
    </div>
  )
}
