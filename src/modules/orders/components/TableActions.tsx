import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment, useState } from 'react'
import { useIntl } from 'react-intl'

import { DeleteButton, DetailButton, EditButton } from '@/components/Buttons'
import WarningModal from '@/components/modal/warning/modal-warning.comp'
import { createMessageValues } from '@/helpers/formatters'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { ModalButtons } from '@/types/form'

import useOrders from '../hooks/useOrders'
import type { Order } from '../types'

const buttonsMessage = message.common.buttons
const modalMessage = message.ordersPage.deleteModal

interface Props {
  order: Order
}

export const TableActions = ({ order }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [openDeleteWarn, setOpenDeleteWarn] = useState(false)
  const { formatMessage } = useIntl()
  const { uid, name } = order

  const { order: orderEndpoint } = useEndpoint({ uid: order.uid })

  const { mutate, orderList } = useOrders()

  const deleteSubmit = useSubmit({
    endpoint: orderEndpoint,
    method: 'delete',
    onSuccess: () => {
      setOpenDeleteWarn(false)
      orderList && mutate({ ...orderList, data: orderList?.data.filter(item => item.uid !== order.uid) })
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
    <Fragment>
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
      </div>
      <WarningModal
        buttons={deleteButtons}
        open={openDeleteWarn}
        setOpen={setOpenDeleteWarn}
        title={modalMessage.title}
        message={formatMessage({ id: modalMessage.message }, createMessageValues({ orderName: name }))}
        testid="OrderDeleteModal"
        error={deleteSubmit.error}
      />
    </Fragment>
  )
}

export default TableActions
