import ComboboxComponent from '@/components/form/Combobox'
import { InputWithError } from '@/components/form/Input'

import useOrderLinesFormFields from './OrderLine.fields'

const OrderLineItemForm = ({ catalogueItem }: { catalogueItem?: string }) => {
  const formFields = useOrderLinesFormFields()

  return (
    <div>
      <div className="flex">
        <InputWithError {...formFields.name} className="pr-1" />
      </div>
      <div className="flex-1">
        <div className="flex">
          <InputWithError {...formFields.catalogueNumber} className="pr-1" />
          <InputWithError {...formFields.price} className="pr-1 pl-1" />
          <InputWithError {...formFields.quantity} className="pl-1" />
        </div>
        <div className="flex">
          <ComboboxComponent {...formFields.system} className="pr-1" />
        </div>
      </div>
    </div>
  )
}

export default OrderLineItemForm
