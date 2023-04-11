import { Fragment, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import useSWR from 'swr'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { message } from '@/i18n/src/messages'
import { RELATION_TYPE_CODE } from '@/modules/systems/types/constants'
import { ModalButtons } from '@/types/form'

import { SystemRelationshipResponse } from '../../../types/responses'
import AddRelationForm from './components/modal/RelationModal'
import RelationsTable from './components/RelationsTable'

const messages = message.systemsPage.relations

const RelationsSection = ({ uid, systemName }: { uid: string; systemName: string }) => {
  const { systemRelationships } = useEndpoint({ uid })
  const { data: relations } = useSWR<SystemRelationshipResponse[]>(systemRelationships, mockFetcher)
  const intl = useIntl()
  const [openAddRelation, setOpenAddRelation] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [relationTypeCode, setRelationTypeCode] = useState<RELATION_TYPE_CODE>(RELATION_TYPE_CODE.IS_SPARE_FOR)
  const [relationUid, setRelationUid] = useState()
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

  const deleteHandler = uid => {
    setOpenDelete(true)
    setRelationUid(uid)
  }

  return (
    <Fragment>
      <div className=" py-4">
        <Button
          className="mb-2"
          primary
          onClick={() => {
            setRelationTypeCode(RELATION_TYPE_CODE.IS_SPARE_FOR)
            setOpenAddRelation(true)
          }}
        >
          <FormattedMessage id={messages.buttons.addSpare} />
        </Button>
        {relations && systemName && (
          <RelationsTable relations={relations} systemName={systemName} onDelete={deleteHandler} />
        )}
      </div>
      <ModalComponent open={openAddRelation} setOpen={setOpenAddRelation} buttons={{ noButtons: true }}>
        <AddRelationForm setopen={setOpenAddRelation} relationTypeCode={relationTypeCode} systemName={systemName} />
      </ModalComponent>
      <WarningModal
        title={intl.formatMessage({ id: messages.deleteModal.title })}
        message={intl.formatMessage({ id: messages.deleteModal.text })}
        open={openDelete}
        setOpen={setOpenDelete}
        buttons={deleteModalButtons}
        testid="RelationDeleteModal"
        error={error}
      />
    </Fragment>
  )
}

export default RelationsSection
