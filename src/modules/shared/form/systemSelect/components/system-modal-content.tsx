import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { SystemsTable } from '@/modules/systems/components/table/Systems.table'
import type { CodebookType } from '@/types/responses/codebook'

interface SystemModalContentProps {
  onSelect: (item: CodebookType | null) => void
  onClose?: () => void
}

export function SystemModalContent({
  onSelect,
  onClose
}: SystemModalContentProps) {
  const [selectedSystem, setSelectedSystem] = useState<CodebookType | null>(
    null
  )

  return (
    <div className="flex flex-col">
      <div className="max-h-[400px] overflow-hidden">
        <SystemsTable
          tableId={'systemSelect'}
          hideButtons={true}
          className={'overflow-y-auto relative h-[400px]'}
          settings={{
            enableRowSelection: true
          }}
          getRowProps={row => ({
            onClick: () => {
              setSelectedSystem({
                name: row.original.name,
                uid: row.original.uid
              })
            },
            className: cn(
              selectedSystem?.uid === row.original.uid &&
                'bg-orange-200 dark:bg-orange-600 hover:bg-orange-200 dark:hover:bg-orange-600',
              'cursor-pointer'
            )
          })}
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
            onSelect(selectedSystem)
            onClose?.()
          }}
        >
          <FormattedMessage id={message.common.buttons.continue} />
        </Button>
      </div>
    </div>
  )
}
