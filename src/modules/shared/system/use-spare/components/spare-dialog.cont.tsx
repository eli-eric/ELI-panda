import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'

export const SpareDialogContainer = () => {
  const formMethods = useForm()

  return (
    <Form formMethods={formMethods}>
      <div>TEST FOrm</div>
    </Form>
  )
}
