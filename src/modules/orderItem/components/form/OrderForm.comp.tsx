import { useRouter } from 'next/router'

import ComboboxComponent from '@/components/form/Combobox'
import DateInput from '@/components/form/DatePicker'
import { FormGrid } from '@/components/form/FormGrid'
import { Input, TextArea } from '@/components/form/Input'
import ListBox from '@/components/form/Listbox'

import useOrderFormFields from './OrderForm.fields'

interface Props {
  disabledEdit?: boolean
}

const OrderFormComponent = ({ disabledEdit }: Props) => {
  const fields = useOrderFormFields(disabledEdit)
  const uid = useRouter().query.uid as string

  return (
    <FormGrid className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl col-span-3 lg:col-span-6 justify-center font-semibold text-gray-900">
        {uid ? 'EDIT ORDER' : 'NEW ORDER'}
      </h1>
      {/*<Input {...fields.orderDate} className="pb-1 col-span-3 lg:col-span-6 pl-1" />*/}
      <DateInput {...fields.orderDate} className="pb-1 col-span-3 lg:col-span-6 pl-1" />
      <Input {...fields.name} className="col-span-3 lg:col-span-6" />
      <ComboboxComponent {...fields.supplier} className="col-span-3 lg:col-span-6" isObject={true} limit={50} />
      <ListBox {...fields.procurementResponsible} className="col-span-3 lg:col-span-6" isObject={true} />
      <ComboboxComponent {...fields.requestor} className="col-span-3 lg:col-span-6" isObject={true} limit={50} />
      <ListBox {...fields.orderStatus} className="col-span-3" />
      <Input {...fields.requestNumber} className="col-span-3" />
      <Input {...fields.orderNumber} className="col-span-3" />
      <Input {...fields.contractNumber} className="col-span-3" />
      <TextArea {...fields.notes} className="col-span-full" />
    </FormGrid>
  )
}

export default OrderFormComponent
