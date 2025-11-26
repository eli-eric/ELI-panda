import { useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
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
  const [selectedSystem, setSelectedSystem] = useState<{
    system: CodebookType
    parent: CodebookType | null
  } | null>(null)

  // Filter function to only show systems without physical items
  const getRowProps = useMemo(
    () => (row: { original: SystemDetail }) => {
      const hasPhysicalItem = Boolean(row.original.physicalItem)

      return {
        onClick: hasPhysicalItem
          ? undefined
          : () => {
              // Get parent from parentPath (last element is direct parent)
              const parent =
                row.original.parentPath && row.original.parentPath.length > 0
                  ? row.original.parentPath[0]
                  : null

              setSelectedSystem({
                system: {
                  name: row.original.name,
                  uid: row.original.uid
                },
                parent: parent
              })
            },
        className: cn(
          hasPhysicalItem && 'opacity-50 cursor-not-allowed',
          !hasPhysicalItem && 'cursor-pointer',
          selectedSystem?.system.uid === row.original.uid &&
            !hasPhysicalItem &&
            'bg-orange-200 dark:bg-orange-600 hover:bg-orange-200 dark:hover:bg-orange-600'
        )
      }
    },
    [selectedSystem]
  )

  return (
    <div className="flex flex-col">
      <div className="max-h-[400px] overflow-hidden">
        <SystemsTable
          tableId={'emptySystemSelect'}
          hideButtons={true}
          className={'overflow-y-auto relative h-[400px]'}
          settings={{
            enableRowSelection: true,
            enableQueryURL: false
          }}
          getRowProps={getRowProps}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
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
          onClick={() => {
            if (selectedSystem) {
              onSelect(selectedSystem.system, selectedSystem.parent)
            }
            onClose?.()
          }}
        >
          <FormattedMessage id={message.common.buttons.continue} />
        </Button>
      </div>
    </div>
  )
}
