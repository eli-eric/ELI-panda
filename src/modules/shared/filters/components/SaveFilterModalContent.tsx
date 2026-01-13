import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import { Input } from '@/components/form/inputs'
import { message } from '@/i18n/src/messages'

interface SaveFilterModalContentProps {
  onSubmit: (name: string, onSuccess: () => void) => void
  onClose: () => void
}

interface FormValues {
  filterName: string
}

export const SaveFilterModalContent = ({
  onSubmit,
  onClose
}: SaveFilterModalContentProps) => {
  const { formatMessage: fm } = useIntl()
  const formMethods = useForm<FormValues>()

  const handleSubmit = (data: FormValues) => {
    onSubmit(data.filterName, onClose)
  }

  return (
    <Form formMethods={formMethods}>
      <Input
        placeholder="Type filter name"
        name="filterName"
        rounded="rounded-md"
        customLabel="Filter Name"
      />
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="secondary" onClick={onClose}>
          {fm({ id: message.common.buttons.cancel })}
        </Button>
        <Button onClick={formMethods.handleSubmit(handleSubmit)}>
          {fm({ id: message.common.buttons.save })}
        </Button>
      </div>
    </Form>
  )
}
