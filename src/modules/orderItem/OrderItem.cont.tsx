import { yupResolver } from '@hookform/resolvers/yup'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { convertDate } from '@/helpers/formatters'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { FILE_TYPE } from '@/types/constants/files'

import FileManager from '../shared/fileManager/FileManager'
import OrderFormComponent from './components/form/OrderForm.comp'
import { schema } from './components/form/OrderForm.schema'
import HeaderComponent from './components/Header.comp'
import OrderLinesTable from './components/orderLines/OrderLines.table'
import useOrderDetail from './hooks/useOrderDetail'
import { useOrderSubmit } from './hooks/useOrderSubmit'
import type { OrderDetailFormType } from './types/form'

const messages = message.ordersPage

export const OrderItemContainer = () => {
  const { disabledEdit, uid, orderDetail } = useOrderDetail()

  const formMethods = useForm<OrderDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...orderDetail,
      orderLines:
        orderDetail?.orderLines && orderDetail?.orderLines.map(orderLine => ({ ...orderLine, uuid: orderLine.uid })),
      orderDate: orderDetail?.orderDate,
      orderStatus: orderDetail?.orderStatus || { uid: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54', name: 'Requested' }
    }
  })

  const { submit, loading } = useOrderSubmit()
  const { formatMessage: fm } = useIntl()

  const withWarningModal = useWarningModal(fm({ id: messages.ordelineMissingModal.message }))
  //submit the form
  const onSubmit = (data: OrderDetailFormType) => {
    if (data.orderLines.length === 0 || !data.orderLines) {
      withWarningModal(submit)({ ...data, orderDate: convertDate(data.orderDate) })
    } else {
      submit({ ...data, orderDate: convertDate(data.orderDate) })
    }
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} enableLeaveWarning={true}>
      <HeaderComponent loading={loading} />
      <OrderFormComponent />
      <Card className="flex flex-col justify-between">
        <OrderLinesTable />
        {uid && (
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <FileManager itemType={FILE_TYPE.ORDER} uid={uid} hasEditRole={!disabledEdit} />
            </Suspense>
          </ErrorBoundary>
        )}
      </Card>
    </Form>
  )
}
