import { Fragment, Suspense, useRef } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { FILE_TYPE } from '@/types/constants/files'

import FileManager from '../shared/fileManager/FileManager'
import type { OrderFormContainerRef } from './components/form/OrderForm.cont'
import { OrderFormContainer } from './components/form/OrderForm.cont'
import OrderLinesTable from './components/orderLines/OrderLines.table'
import useOrderDetail from './hooks/useOrderDetail'

const OrderItemContainer = () => {
  const { disabledEdit, uid } = useOrderDetail()
  const OrderFormRef = useRef<OrderFormContainerRef>()

  return (
    <Fragment>
      <OrderFormContainer ref={OrderFormRef} />
      <Card className="flex flex-col justify-between">
        <OrderLinesTable
          orderLines={OrderFormRef.current?.orderLines}
          setOrderLine={OrderFormRef.current?.setOrderLine}
          deleteOrderLine={OrderFormRef.current?.deleteOrderLine}
          disabledEdit={disabledEdit}
        />
        {uid && (
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <FileManager itemType={FILE_TYPE.ORDER} uid={uid} hasEditRole={!disabledEdit} />
            </Suspense>
          </ErrorBoundary>
        )}
      </Card>
    </Fragment>
  )
}

export default OrderItemContainer
