import { toast } from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useFormModal from '@/hooks/form/useFormModal'
import type { CodeBookMetaData } from '@/types/responses/codebook'

import { Input } from '../inputs'

const useAddCodebookValue = (codebook?: CodeBookMetaData) => {
  const { codebook: endpoint } = useEndpoint({ path: codebook?.code })
  const { submit } = useSubmit({
    endpoint,
    method: 'post',
    onSuccess: () => {
      toast.success(`Codebook value added successfully`)
    },
    onError: err => {
      toast.error(
        err.response?.status ? 'Codebook value already exists' : err.message
      )
    }
  })
  const { getFormModal, setOpen } = useFormModal<{ name: string }>({
    renderForm: () => (
      <Input name="name" label="Codebook Value" rounded="rounded-md" />
    ),
    onSubmit: data => {
      submit({ name: data.name })
    }
  })

  return { getFormModal, setOpen }
}

export default useAddCodebookValue
