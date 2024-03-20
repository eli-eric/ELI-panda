'use client'
import { useQueryState } from 'next-usequerystate'
import type { FC } from 'react'
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { useIsFirstRender } from 'usehooks-ts'
import { v4 as uuid } from 'uuid'

import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import { PageHead } from '@/components/layout/PageHead'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import type { CODEBOOK } from '@/types/constants/codebook'

import CodebookTable from './components/CodebookTable'

const { selectCodebookForm } = message.codebooksPage
interface Props {
  selectedCodebook?: string
}
export const CodebooksContainer: FC<Props> = () => {
  const [lastAddedUUID, setLastAddedUUID] = useState<string>()
  const [selectedCodebookQuery, setSelectedCoodebookQuery] = useQueryState('selectedCodebook')

  const formMethods = useForm<{ codebook?: { uid: CODEBOOK; name: CODEBOOK } }>({})

  const { setValue } = formMethods

  const isFirstRender = useIsFirstRender()

  const { codebooks } = useEndpoint({ query: { editable: true } })
  const { response } = useFetch<{ code: string; type: string }[]>({ url: codebooks })

  const fields = useMakeFormFields({
    codebook: {
      name: 'codebook',
      placeholder: selectCodebookForm.codebook.placeholder,
      rounded: 'rounded-md'
    }
  })

  useEffect(() => {
    if (isFirstRender) {
      if (selectedCodebookQuery)
        setValue('codebook', {
          uid: selectedCodebookQuery as CODEBOOK,
          name: selectedCodebookQuery as CODEBOOK
        })
    }
  }, [isFirstRender, setValue, selectedCodebookQuery])

  const handleAddNewCodebookValue = () => {
    const id = uuid()
    mutate(
      `/codebook/${selectedCodebookQuery}?limit=5000&filter=undefined`,
      prev => {
        if (prev) {
          return { data: [{ name: '', uid: '', uuid: id }, ...(prev?.data || [])], metadata: prev.metadata }
        }
      },
      { revalidate: false }
    )
    setLastAddedUUID(id)
  }

  return (
    <Fragment>
      <PageHead>
        <PlusButton buttonSize="large" onClick={handleAddNewCodebookValue} disabled={!selectedCodebookQuery} />
        <Form {...{ formMethods }}>
          <Listbox
            {...fields.codebook}
            placeholder="Select codebook..."
            className={'w-72'}
            onChange={(v: CodebookType) => {
              setSelectedCoodebookQuery(v?.uid || null)
            }}
            codebookResponse={response?.map(code => ({ name: code.code, uid: code.code }))}
          />
        </Form>
      </PageHead>
      <CodebookTable lastAddedUUID={lastAddedUUID} />
    </Fragment>
  )
}
