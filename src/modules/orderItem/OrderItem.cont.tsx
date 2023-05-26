import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { FILE_TYPE } from '@/types/constants/files'

import useOrderForm from './components/form/OrderForm.cont'
import OrderLinesTable from './components/orderLines/OrderLines.table'
import useOrderDetail from './hooks/useOrderDetail'
import FileManager from '../shared/fileManager/FileManager'

const OrderItemContainer = () => {
  const { disabledEdit, uid } = useOrderDetail()
  const { renderForm, setOrderLine, deleteOrderLine, orderLines } = useOrderForm()

  return (
    <Fragment>
      {renderForm()}
      <Card className="flex flex-col justify-between">
        <OrderLinesTable
          orderLines={orderLines}
          setOrderLine={setOrderLine}
          deleteOrderLine={deleteOrderLine}
          disabledEdit={disabledEdit}
        />
        {uid && (
          <Fragment>
            <ErrorBoundary fallback={<ErrorPage />}>
              <Suspense fallback={<ProgressBarComponent />}>
                <FileManager itemType={FILE_TYPE.ORDER} uid={uid} hasEditRole={!disabledEdit} />
              </Suspense>
            </ErrorBoundary>
          </Fragment>
        )}
      </Card>
    </Fragment>
  )
}

export default OrderItemContainer
