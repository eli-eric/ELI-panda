import OrderFormContainer from './components/form/OrderForm.cont'
import HeaderComponent from './components/Header.comp'

const OrderItemContainer = () => {
  const i = 8
  return (
    <div>
      <HeaderComponent />
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">ORDER NEW</h1>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <OrderFormContainer data={{}} uid={'s'} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default OrderItemContainer
