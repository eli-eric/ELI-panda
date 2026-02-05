import { yupResolver } from '@hookform/resolvers/yup'
import { memo, Suspense, useCallback, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import ProgressBarComponent from '@/components/progress-bar.comp'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import OrderFormComponent from './components/form/OrderForm.comp'
import { schema } from './components/form/OrderForm.schema'
import OrderLinesTable from './components/orderLines/OrderLines.table'
import { ServiceLinesContainer } from './components/serviceLines/service-lines.cont'
import { OrderLineProvider, ServiceLineProvider } from './context'
import useOrderDetail from './hooks/useOrderDetail'
import { useOrderSubmit } from './hooks/useOrderSubmit'
import type { OrderDetailFormType } from './types/form'
import { addUuidsToOrderData, hasEmptyLines, prepareOrderForSubmit } from './utils/order-transforms'

const messages = message.ordersPage

// Memoize components to reduce re-renders
const MemoizedOrderLinesTable = memo(OrderLinesTable)
const MemoizedServiceLinesContainer = memo(ServiceLinesContainer)
const MemoizedOrderFormComponent = memo(OrderFormComponent)
const MemoizedFileManager = memo(FileManager)

export const OrderItemContainer = () => {
    const { disabledEdit, uid, orderDetail } = useOrderDetail()
    const { formatMessage: fm } = useIntl()

    const withWarningModal = useWarningModal(fm({ id: messages.ordelineMissingModal.message }))

    // Use useMemo for defaultValues to avoid unnecessary recalculations
    const defaultValues = useMemo(
        () => (orderDetail ? addUuidsToOrderData(orderDetail) : undefined),
        [orderDetail],
    )

    const formMethods = useForm<OrderDetailFormType>({
        resolver: yupResolver(schema) as any,
        defaultValues,
    })

    const { submit, loading } = useOrderSubmit(formMethods.reset)

    const submitData = useCallback(
        (saveAndExit: boolean, data: OrderDetailFormType) => {
            // Prepare data for submission (remove uuid, convert date)
            const preparedData = prepareOrderForSubmit(data)

            // If order has no lines, show warning
            if (hasEmptyLines(data)) {
                withWarningModal(submit)(preparedData, false)
            } else {
                submit(preparedData, saveAndExit)
            }
        },
        [submit, withWarningModal],
    )

    const onSubmit = useCallback(
        (data: OrderDetailFormType) => {
            submitData(false, data)
        },
        [submitData],
    )

    const onSubmitAndExit = useCallback(
        (data: OrderDetailFormType) => {
            submitData(true, data)
        },
        [submitData],
    )

    // Render components with React.memo
    return (
        <Form
            className="min-[1200px]:h-screen min-[1200px]:overflow-hidden"
            formMethods={formMethods}
            enableLeaveWarning={true}
        >
            <OrderLineProvider>
                <ServiceLineProvider>
                    <HeaderWithButtons
                        loading={loading}
                        editRole={ROLE.ORDERS_EDIT}
                        onSubmit={formMethods.handleSubmit(onSubmit)}
                        onSubmitAndExit={formMethods.handleSubmit(onSubmitAndExit)}
                        title={uid ? `Order ${orderDetail?.name || uid}` : 'Create New Order'}
                    />

                    <div className="w-full px-4 sm:px-6 lg:px-8 ">
                        <div className="grid grid-cols-1 min-[1200px]:grid-cols-4 gap-6">
                            {/* Left: Form card (1/3) */}
                            <div className="lg:col-span-1 py-4 sm:py-6">
                                <MemoizedOrderFormComponent />
                            </div>

                            {/* Right: Tables + Files (2/3) */}
                            <div className="lg:col-span-3 py-4 sm:py-6 min-[1200px]:h-[calc(100vh-8rem)] min-[1200px]:overflow-y-auto min-[1200px]:overflow-x-hidden">
                                <div className="space-y-6 pr-2">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </ServiceLineProvider>
            </OrderLineProvider>
        </Form>
    )
}
