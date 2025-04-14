import { yupResolver } from '@hookform/resolvers/yup'
import { memo, Suspense, useCallback, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ROLE } from '@/types/constants/roles'
import { convertDate } from '@/utils/formatters'

import FileManager from '../shared/fileManager/FileManager'
import OrderFormComponent from './components/form/OrderForm.comp'
import { schema } from './components/form/OrderForm.schema'
import OrderLinesTable from './components/orderLines/OrderLines.table'
import { ServiceLinesContainer } from './components/serviceLines/service-lines.cont'
import useOrderDetail from './hooks/useOrderDetail'
import { useOrderSubmit } from './hooks/useOrderSubmit'
import type { OrderDetailFormType } from './types/form'

const messages = message.ordersPage

// Memoizujeme komponenty, aby se snížil počet re-renderů
const MemoizedOrderLinesTable = memo(OrderLinesTable)
const MemoizedServiceLinesContainer = memo(ServiceLinesContainer)
const MemoizedOrderFormComponent = memo(OrderFormComponent)
const MemoizedFileManager = memo(FileManager)

export const OrderItemContainer = () => {
  const { disabledEdit, uid, orderDetail } = useOrderDetail()
  const { formatMessage: fm } = useIntl()

  const withWarningModal = useWarningModal(
    fm({ id: messages.ordelineMissingModal.message })
  )

  // Použití useMemo pro defaultValues, aby se zbytečně nepřepočítávaly
  const defaultValues = useMemo(
    () => ({
      ...orderDetail,
      orderLines:
        orderDetail?.orderLines &&
        orderDetail?.orderLines.map(orderLine => ({
          ...orderLine,
          uuid: orderLine.uid
        })),
      serviceLines:
        orderDetail?.serviceLines &&
        orderDetail?.serviceLines.map(serviceLine => ({
          ...serviceLine,
          uuid: serviceLine.uid
        })),
      orderDate: orderDetail?.orderDate,
      orderStatus: orderDetail?.orderStatus || {
        uid: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54',
        name: 'Requested'
      }
    }),
    [orderDetail]
  )

  const formMethods = useForm<OrderDetailFormType>({
    resolver: yupResolver(schema) as any,
    defaultValues
  })

  const { submit, loading } = useOrderSubmit(formMethods.reset)

  const submitData = useCallback(
    (saveAndExit: boolean, data: OrderDetailFormType) => {
      const orderLines = data?.orderLines?.map(orderLine => {
        // extract uuid from orderLines array (uuid is not needed for the backend ist is only used for the frontend when no uid is available)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { uuid, ...rest } = orderLine
        return rest
      })
      const serviceLines =
        data.serviceLines &&
        data?.serviceLines?.map(serviceLine => {
          // extract uuid from serviceLines array (uuid is not needed for the backend ist is only used for the frontend when no uid is available)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { uuid, ...rest } = serviceLine
          return rest
        })
      if (
        (data?.orderLines?.length === 0 || !data?.orderLines) &&
        (data?.serviceLines?.length === 0 || !data?.serviceLines)
      ) {
        withWarningModal(submit)(
          {
            ...data,
            orderLines: orderLines,
            serviceLines: serviceLines,
            orderDate: convertDate(data.orderDate)
          },
          false
        )
      } else {
        submit(
          {
            ...data,
            orderLines: orderLines,
            serviceLines: serviceLines,
            orderDate: convertDate(data.orderDate)
          },
          saveAndExit
        )
      }
    },
    [submit, withWarningModal]
  )

  const onSubmit = useCallback(
    (data: OrderDetailFormType) => {
      submitData(false, data)
    },
    [submitData]
  )

  const onSubmitAndExit = useCallback(
    (data: OrderDetailFormType) => {
      submitData(true, data)
    },
    [submitData]
  )

  // Komponenty renderujeme s React.memo
  return (
    <Form
      className="h-screen overflow-auto"
      formMethods={formMethods}
      enableLeaveWarning={true}
    >
      <HeaderWithButtons
        loading={loading}
        editRole={ROLE.ORDERS_EDIT}
        onSubmit={formMethods.handleSubmit(onSubmit)}
        onSubmitAndExit={formMethods.handleSubmit(onSubmitAndExit)}
      />
      <MemoizedOrderFormComponent />
      <Card className="flex flex-col justify-between">
        <MemoizedOrderLinesTable disabledEdit={disabledEdit} />
        <MemoizedServiceLinesContainer disabledEdit={disabledEdit} />
        {uid && (
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <MemoizedFileManager
                itemType={FILE_TYPE.ORDER}
                uid={uid}
                hasEditRole={!disabledEdit}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </Card>
    </Form>
  )
}
