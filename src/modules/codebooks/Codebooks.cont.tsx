import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useQueryState } from 'next-usequerystate'
import type { FC } from 'react'
import { Fragment, startTransition, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import { PageHead } from '@/components/layout/PageHead'
import LoaderComponent from '@/components/loader.comp'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import type { CODEBOOK } from '@/types/constants/codebook'
import type {
  CodebookType,
  CodebookTypeResponse
} from '@/types/responses/codebook'
import { queryFetcher } from '@/utils/fetcher'

import CodebookTable from './components/CodebookTable'

const { selectCodebookForm } = message.codebooksPage
interface Props {
  selectedCodebook?: string
}
export const CodebooksContainer: FC<Props> = () => {
  const [lastAddedUUID, setLastAddedUUID] = useState<string>()

  const [selectedCodebookQuery, setSelectedCoodebookQuery] =
    useQueryState('selectedCodebook')

  const formMethods = useForm<{ codebook?: { uid: CODEBOOK; name: CODEBOOK } }>(
    {}
  )

  const { queryKey } = useCodebook(selectedCodebookQuery as CODEBOOK, {
    limit: 5000
  })

  const queryClient = useQueryClient()

  const { setValue } = formMethods

  const { data, isLoading } = useQuery({
    queryKey: ['codebooks', { query: { editable: 'true' } }],
    queryFn: queryFetcher<{ code: string; type: string }[]>('codebooks')
  })

  const fields = useMakeFormFields({
    codebook: {
      name: 'codebook',
      placeholder: selectCodebookForm.codebook.placeholder,
      rounded: 'rounded-md'
    }
  })

  useEffect(() => {
    startTransition(() => {
      if (selectedCodebookQuery)
        setValue('codebook', {
          uid: selectedCodebookQuery as CODEBOOK,
          name: selectedCodebookQuery as CODEBOOK
        })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddNewCodebookValue = () => {
    const id = uuid()
    queryClient.setQueryData<CodebookTypeResponse>(
      queryKey,
      prev =>
        prev
          ? {
              ...prev,
              data: [{ name: '', uid: '', uuid: id }, ...(prev.data || [])]
            }
          : {
              metadata: { code: '', type: '' },
              data: [{ name: '', uid: '', uuid: id }]
            },
      { updatedAt: Date.now() }
    )
    setLastAddedUUID(id)
  }

  if (isLoading) return <LoaderComponent />

  if (!data) return null

  return (
    <Fragment>
      <PageHead>
        <PlusButton
          buttonSize="large"
          onClick={handleAddNewCodebookValue}
          disabled={!selectedCodebookQuery}
        />
        <Form {...{ formMethods }}>
          <Listbox
            {...fields.codebook}
            placeholder="Select codebook..."
            className={'w-72'}
            onChange={(v: CodebookType) => {
              setSelectedCoodebookQuery(v?.uid || null)
            }}
            codebookResponse={data?.map(code => ({
              name: code.code,
              uid: code.code
            }))}
          />
        </Form>
      </PageHead>
      <CodebookTable
        queryKey={queryKey}
        lastAddedUUID={lastAddedUUID}
        selectedCodebookQuery={selectedCodebookQuery}
      />
    </Fragment>
  )
}
