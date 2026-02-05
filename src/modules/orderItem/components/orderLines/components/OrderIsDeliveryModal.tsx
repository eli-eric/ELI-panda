import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { z } from 'zod'

import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import type { OrderLineFormType } from '@/modules/orderItem/types/form'

import { OrderIsDeliveryForm } from './OrderIsDeliveryForm'

const messages = message.common.buttons

const schema = z.object({
    serialNumber: z.string().optional(),
    manualEun: z.boolean().optional(),
    eun: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface OrderIsDeliveryModalProps {
    onClose?: () => void
    onSubmit?: (data: FormData) => void
    orderLine: OrderLineFormType
}

export const OrderIsDeliveryModal = ({
    onClose,
    onSubmit,
    orderLine,
}: OrderIsDeliveryModalProps) => {
    const formMethods = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            serialNumber: orderLine?.serialNumber || '',
            manualEun: false,
            eun: '',
        },
    })

    const { formState, reset } = formMethods

    const handleSubmit = (data: FormData) => {
        onSubmit?.(data)
        reset()
        onClose?.()
    }

    return (
        <div className="space-y-6 pt-4">
            <Form formMethods={formMethods} onSubmit={handleSubmit}>
                <OrderIsDeliveryForm />
            </Form>

            <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                    <FormattedMessage id={messages.close} />
                </Button>
                <Button
                    type="button"
                    disabled={formState.isSubmitting}
                    onClick={formMethods.handleSubmit(handleSubmit)}
                >
                    {formState.isSubmitting && (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    )}
                    <FormattedMessage id={messages.save} />
                </Button>
            </div>
        </div>
    )
}
