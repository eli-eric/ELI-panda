import OrderFormContainer from './components/form/OrderForm.cont'
import HeaderComponent from './components/Header.comp'

const OrderItemContainer = () => {
  const i = 8
  return (
    <div>
      <HeaderComponent />
      <main className="flex-1">
        <div className="py-6">
          <OrderFormContainer data={{}} uid={'s'} />
        </div>
      </main>
    </div>
  )
}

export default OrderItemContainer
