import { Fragment, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import useSWR from 'swr'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/modal/modal.comp'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { mockFetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import { message } from '@/i18n/src/messages'
import { RELATION_TYPE_CODE } from '@/modules/systems/types/constants'
import { ModalButtons } from '@/types/form'

import { SystemRelationshipResponse } from '../../../types/responses'
import AddRelationForm from './components/modal/RelationModal'
import RelationsTable from './components/RelationsTable'

const messages = message.systemsPage.relations

const RelationsSection = ({ uid, systemName }: { uid: string; systemName: string }) => {
  const endpoints = useEndpoint({ uid })
  const { data: relations } = useSWR<SystemRelationshipResponse[]>(endpoints.systemRelationships, mockFetcher)
  const intl = useIntl()
  const [openAddRelation, setOpenAddRelation] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [relationTypeCode, setRelationTypeCode] = useState<RELATION_TYPE_CODE>(RELATION_TYPE_CODE.IS_SPARE_FOR)

  const deleteModalButtons: ModalButtons = {
    goNext: {
      text: intl.formatMessage({ id: messages.deleteModal.buttons.continue }),
      onClick: () => {
        setOpenDelete(false)
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
    //TODO: submit uid
    setOpenDelete(true)
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
        {relations && <RelationsTable relations={relations} systemName={systemName} onDelete={deleteHandler} />}
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
      />
    </Fragment>
  )
}

export default RelationsSection
