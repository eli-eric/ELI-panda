import { useRouter } from 'next/router'

import Combobox from '@/components/form/Combobox'
import DateInput from '@/components/form/DatePicker'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import {
    Card as CardUI,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import useOrderFormFields from './OrderForm.fields'

const OrderFormComponent = () => {
    const fields = useOrderFormFields()
    const uid = useRouter().query.uid as string

    return (
        <CardUI className="w-full px-4 py-4 sm:px-6 md:px-8 mt-4">
            <CardHeader>
                <CardTitle>{uid ? 'Edit Order' : 'New Order'}</CardTitle>
                <CardDescription>
                    {uid ? 'Edit the order details below.' : 'Fill in the order details below.'}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Basic Information - stacked */}
                <Input {...fields.name} className="w-full" />
                <DateInput {...fields.orderDate} className="w-full" />
                <Combobox {...fields.supplier} showAddButton={true} className="w-full" />
                <Listbox {...fields.procurementResponsible} className="w-full" />
                <Combobox {...fields.requestor} className="w-full" />
                <Listbox {...fields.orderStatus} className="w-full" />

                <Separator />

                {/* Order Details - stacked */}
                <Input {...fields.requestNumber} className="w-full" />
                <Input {...fields.orderNumber} className="w-full" />
                <Input {...fields.contractNumber} className="w-full" />

                <Separator />

                {/* Additional Information - stacked */}
                <TextArea {...fields.notes} className="w-full" />
            </CardContent>
        </CardUI>
    )
}

export default OrderFormComponent
