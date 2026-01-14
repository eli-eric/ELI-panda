import { zodResolver } from '@hookform/resolvers/zod'
import type { QueryKey } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import type { CODEBOOK } from '@/types/constants/codebook'

import { useCodebookValueMutations } from '../hooks/useCodebookValueMutations'
import {
  type CodebookValueSchema,
  codebookValueSchema
} from '../schemas/codebook-value.schema'
import { CodebookAddFormComponent } from './CodebookAddForm.comp'

interface Props {
  codebookType: CODEBOOK
  queryKey: QueryKey
  onSuccess: () => void
  onCancel: () => void
}

export const CodebookAddFormContainer = ({
  codebookType,
  queryKey,
  onSuccess,
  onCancel
}: Props) => {
  const form = useForm<CodebookValueSchema>({
    resolver: zodResolver(codebookValueSchema),
    defaultValues: { name: '' }
  })

  const { create, isPending } = useCodebookValueMutations({
    codebookType,
    queryKey
  })

  const handleSubmit = async (data: CodebookValueSchema) => {
    try {
      await create(data)
      onSuccess()
    } catch {
      // Error handled by toast.promise
    }
  }

  return (
    <CodebookAddFormComponent
      form={form}
      isPending={isPending}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  )
}
