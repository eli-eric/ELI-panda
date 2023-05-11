import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'

import { DeleteButton, DetailButton, EditButton } from '@/components/Buttons'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'

const buttonsMessage = message.common.buttons
const modalMessage = message.ordersPage.deleteModal

export const TableActions = ({ uid, mutate }: { uid: string; mutate: string }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)

  const { order } = useEndpoint({ uid })

  const deleteSubmit = useSubmit({
    endpoint: order,
    method: 'delete',
    mutateList: [mutate],
    onSuccess: () => {
      setOpenDeleteWarn(false)
    }
  })

  const deleteButtons: ModalButtons = {
    goNext: {
      text: buttonsMessage.continue,
      loading: deleteSubmit.loading,
      onClick: () => {
        deleteSubmit.submit()
      }
    },
    goBack: {
      text: buttonsMessage.cancel,
      onClick: () => {
        setOpenDeleteWarn(false)
      }
    }
  }

  return (
    <div className="flex mr-4">
      {session?.user.roles.includes(ROLE.ORDERS_EDIT) ? (
        <Fragment>
          <EditButton
            className="mr-1"
            onClick={() => {
              router.push(PATH.ORDER + '/' + uid)
            }}
          />
          <DeleteButton
            className="mr-1"
            onClick={() => {
              setOpenDeleteWarn(true)
            }}
          />
        </Fragment>
      ) : (
        <DetailButton
          onClick={() => {
            router.push(PATH.ORDER + '/' + uid)
          }}
        />
      )}

      <WarningModal
        buttons={deleteButtons}
        open={openDeleteWarn}
        setOpen={setOpenDeleteWarn}
        title={modalMessage.title}
        message={modalMessage.message}
        testid="OrderDeleteModal"
        error={deleteSubmit.error}
      />
    </div>
  )
}

export default TableActions
