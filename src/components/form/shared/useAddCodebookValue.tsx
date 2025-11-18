import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { toast } from 'sonner'
import { z } from 'zod'

import { Form } from '@/components/form/Form'
import { Button } from '@/components/ui/button'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { CodeBookMetaData } from '@/types/responses/codebook'

import { Input } from '../inputs'

const messages = message.common.buttons

const schema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .transform(val => val.trim())
})

type FormData = z.infer<typeof schema>

const AddCodebookValueModal = ({
  codebook,
  onClose
}: {
  codebook?: CodeBookMetaData
  onClose?: () => void
}) => {
  const { codebook: endpoint } = useEndpoint({ path: codebook?.code })
  const formMethods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' }
  })

  const { formState, watch } = formMethods
  const nameValue = watch('name')

  const { submit } = useSubmit({
    endpoint,
    method: 'post',
    onSuccess: () => {
      toast.success('Codebook value added successfully')
      onClose?.()
    },
    onError: err => {
      toast.error(
        err.response?.status ? 'Codebook value already exists' : err.message
      )
    }
  })

  const handleSubmit = (data: FormData) => {
    submit({ name: data.name })
  }

  return (
    <div className="space-y-6 pt-4">
      <Form formMethods={formMethods} onSubmit={handleSubmit}>
        <Input name="name" rounded="rounded-md" />
      </Form>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          <FormattedMessage id={messages.close} />
        </Button>
        <Button
          type="button"
          disabled={formState.isSubmitting || !nameValue?.trim()}
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

const useAddCodebookValue = (codebook?: CodeBookMetaData) => {
  const { openModal } = useDynamicModalStore()

  const openFormModal = () => {
    const modalId = openModal('dialog', {
      id: `add-codebook-value-${codebook?.code || 'unknown'}`,
      component: AddCodebookValueModal,
      props: {
        title: 'Add Codebook Value',
        size: 'm',
        codebook
      }
    })
    return modalId
  }

  return { openFormModal }
}

export default useAddCodebookValue
