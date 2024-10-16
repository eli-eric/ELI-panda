import Combobox from '@/components/form/Combobox'
import { FilterCheckboxes } from '@/components/form/FIlterCheckboxes'
import { Input } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import useOrderFormFields from '@/modules/orderItem/components/form/OrderForm.fields'
import { classNames } from '@/utils'

import { DELIVERY_STATUS, DeliveryStatusMapping } from '../../types'

//TODO: 1. Create a new file in src/hooks/table/useOrdersFilter.tsx
//TODO: 2. Refactor the code to use the new useQueryState hook

export const OrdersFilter = () => {
  const fields = useOrderFormFields()

  const { setFilter } = useFormFilterState({
    tableId: 'orders',
    enableQueryUrl: true
  })
  const deliveryStatusArray = Object.values(DELIVERY_STATUS)
    .filter((value): value is DELIVERY_STATUS => typeof value === 'number')
    .map(uid => ({
      uid: String(uid),
      name: DeliveryStatusMapping[uid]
    }))

  return (
    <div
      className={classNames('md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]')}
    >
      <div className="flex flex-col gap-2">
        <Input
          {...fields.name}
          onChange={setFilter(fields.name.name)}
          isFilter={true}
        />
        <Input
          {...fields.orderNumber}
          onChange={setFilter(fields.orderNumber.name)}
          isFilter={true}
        />
        <FilterCheckboxes
          label="Order Status"
          name={fields.orderStatus.name}
          codebook={fields.orderStatus.codebook}
          onChange={setFilter(fields.orderStatus.name)}
          isFilter={true}
        />
        <FilterCheckboxes
          label="Delivery Status"
          name={fields.deliveryStatus.name}
          customCodebookOptions={deliveryStatusArray}
          onChange={setFilter(fields.deliveryStatus.name)}
          isFilter={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          {...fields.requestNumber}
          onChange={setFilter(fields.requestNumber.name)}
          isFilter={true}
        />
        <Input
          {...fields.contractNumber}
          onChange={setFilter(fields.contractNumber.name)}
          isFilter={true}
        />
        <Combobox
          {...fields.supplier}
          onSelect={setFilter(fields.supplier.name)}
          isFilter={true}
        />
        <Listbox
          {...fields.procurementResponsible}
          onChange={setFilter(fields.procurementResponsible.name)}
          isFilter={true}
        />
        <Combobox
          {...fields.requestor}
          onSelect={setFilter(fields.requestor.name)}
          isFilter={true}
        />
        <Input
          {...fields.eun}
          onChange={setFilter(fields.eun.name)}
          isFilter={true}
        />
        <Input
          {...fields.partNumber}
          onChange={setFilter(fields.partNumber.name)}
          isFilter={true}
        />
      </div>
      <Input
        className="col-span-2"
        {...fields.notes}
        onChange={setFilter(fields.notes.name)}
        isFilter={true}
      />
    </div>
  )
}
