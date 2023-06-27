import type { CellContext } from '@tanstack/react-table'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { DeleteButton } from '@/components/Buttons'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import type { SystemRelationshipResponse } from '@/modules/systems-deprecated/types/responses'
import type { ModalButtons } from '@/types/form'

const messages = message.systemsPage.relations

interface RelationNameCellProps extends CellContext<SystemRelationshipResponse, string> {
  uid: string
  systemName: string
}

export const RelationNameCell = ({
  row: {
    original: { relationUid }
  },
  uid,
  systemName
}: RelationNameCellProps) => {
  const { systemRelationships } = useEndpoint({ uid })
  const intl = useIntl()
  const [openDelete, setOpenDelete] = useState(false)
  const { systemRelationship } = useEndpoint({ uid: relationUid })
  const { submit, error, loading } = useSubmit({
    endpoint: systemRelationship,
    method: 'delete',
    mutateList: [systemRelationships],
    onSuccess: () => {
      setOpenDelete(false)
    }
  })

  const deleteModalButtons: ModalButtons = {
    goNext: {
      text: intl.formatMessage({ id: messages.deleteModal.buttons.continue }),
      loading: loading,
      onClick: () => {
        submit()
      }
    },
    goBack: {
      text: intl.formatMessage({ id: messages.deleteModal.buttons.cancel }),
      onClick: () => {
        setOpenDelete(false)
      }
    }
  }

  return (
    <div className="flex items-center my-1">
      <DeleteButton onClick={() => setOpenDelete(true)} className="mr-4" />
      <span>{systemName}</span>
      <WarningModal
        title={intl.formatMessage({ id: messages.deleteModal.title })}
        message={intl.formatMessage({ id: messages.deleteModal.text })}
        open={openDelete}
        setOpen={setOpenDelete}
        buttons={deleteModalButtons}
        testid="RelationDeleteModal"
        error={error}
      />
    </div>
  )
}
