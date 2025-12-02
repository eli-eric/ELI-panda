import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { TABLE_IDS } from '@/types/constants/tableIds'
import type { CodebookType } from '@/types/responses/codebook'
import type { SystemDetail } from '@/types/responses/systems'

import { SystemSelect } from '../SystemSelect'

interface SystemModalContentProps {
  onSelect: (item: CodebookType | null) => void
  onClose?: () => void
  onSystemDetailSelect?: (system: SystemDetail) => void
}

export function SystemModalContent({
  onSelect,
  onClose,
  onSystemDetailSelect
}: SystemModalContentProps) {
  const [selectedSystem, setSelectedSystem] = useState<
    SystemDetail | undefined
  >(undefined)

  const handleSystemSelect = (system: SystemDetail | undefined) => {
    setSelectedSystem(system)
  }

  const handleConfirm = () => {
    if (selectedSystem) {
      // Convert SystemDetail to CodebookType for backward compatibility
      const codebookItem: CodebookType = {
        name: selectedSystem.name,
        uid: selectedSystem.uid
      }
      onSelect(codebookItem)
      // Call optional callback with full SystemDetail (includes parentPath)
      onSystemDetailSelect?.(selectedSystem)
      onClose?.()
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <SystemSelect
        selectedSystem={selectedSystem}
        onSelect={handleSystemSelect}
        tableId={TABLE_IDS.SYSTEM_SELECTION_MODAL}
        className="h-[785px] overflow-y-auto"
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
