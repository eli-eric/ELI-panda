import { lazy, useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { SystemDetail } from '@/types/responses/systems'

const SystemMovingEditContainer = lazy(() =>
  import('../form/system-moving-edit.cont').then(module => ({
    default: module.SystemMovingEditContainer
  }))
)

interface SystemsMovingType extends SystemDetail {
  tableId: string
}

const messages = message.common.systemsMoving.dialog

export const useSystemMovingDialog = () => {
  const { openModal } = useDynamicModalStore()
  const { formatMessage: fm } = useIntl()

  return useCallback(
    (childSystem: SystemsMovingType, parentSystem: SystemsMovingType) => {
      const modalId = 'system-moving-dialog'

      openModal('dialog', {
        id: modalId,
        component: SystemMovingEditContainer,
        props: {
          childSystem,
          parentSystem,
          size: 'l',
          title: fm({ id: messages.title }),
          description: fm({ id: messages.description })
        }
      })

      return modalId
    },
    [openModal, fm]
  )
}
