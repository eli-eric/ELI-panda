import { OrderLineFormComponent } from '../OrderLineForm.comp'

interface OrderLineStep2Props {
  hasSelectedItem: boolean
}

export const OrderLineStep2Form = ({
  hasSelectedItem
}: OrderLineStep2Props) => {
  return <OrderLineFormComponent isFromCatalogue={hasSelectedItem} />
}
