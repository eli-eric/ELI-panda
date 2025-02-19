import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { useServiceTypeList } from '@/modules/services/hooks/useServiceTypeList'

const messages = message.ordersPage.serviceLines.wizard.steps

export const useServiceLineFields = () => {
  const { step1, step2 } = messages
  const formMessage = { ...step1.form, ...step2.form }
  const { data } = useServiceTypeList()
  return useMakeFormFields({
    name: {
      name: 'name',
      label: formMessage.name.label,
      rounded: 'rounded-md',
      required: true
    },
    notes: {
      name: 'notes',
      label: formMessage.notes.label,
      rounded: 'rounded-md'
    },
    serviceType: {
      name: 'serviceType',
      label: formMessage.serviceType.label,
      rounded: 'rounded-md',
      codebookResponse: data?.map(({ uid, name }) => ({
        name,
        uid
      }))
    },
    item: {
      name: 'item',
      label: formMessage.item.label,
      rounded: 'rounded-md'
    },
    price: {
      name: 'price',
      label: formMessage.price.label,
      rounded: 'rounded-md',
      type: 'number',
      inputMode: 'numeric',
      required: true
    },
    currency: {
      name: 'currency',
      label: formMessage.currency.label,
      rounded: 'rounded-md',
      required: true
    }
  })
}
