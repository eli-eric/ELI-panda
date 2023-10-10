import type { ColumnDef } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import type { FC } from 'react'
import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { memo } from 'react'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import uuid from 'react-uuid'
import { useIsFirstRender } from 'usehooks-ts'

import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import Card from '@/components/layout/Card'
import { PageHead } from '@/components/layout/PageHead'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import type { CODEBOOK } from '@/types/constants/codebook'

import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { FormCell } from './components/cells/FormCell'

const { selectCodebookForm } = message.codebooksPage

const MemoizedTable = memo(PandaTable)

export const CodebooksContainer: FC = () => {
  const [lastAddedUUID, setLastAddedUUID] = useState<string>()
  const [selectedCodebookQuery, setSelectedCoodebookQuery] = useQueryState('selectedCodebook')

  const formMethods = useForm<{ codebook?: { uid: CODEBOOK; name: CODEBOOK } }>({})

  const { setValue } = formMethods

  const isFirstRender = useIsFirstRender()

  const watchCodebook = useWatch({ name: 'codebook', control: formMethods.control })

  const { codebooks } = useEndpoint({ query: { editable: true } })
  const { response } = useFetch<{ code: string; type: string }[]>({ url: codebooks })

  const fields = useMakeFormFields({
    codebook: {
      name: 'codebook',
      placeholder: selectCodebookForm.codebook.placeholder,
      rounded: 'rounded-md'
    }
  })

  const {
    data: codebook,
    mutate,
    isLoading
  } = useCodebook(watchCodebook?.name, {
    limit: 10000
  })

  const columns = useMemo(
    (): ColumnDef<CodebookType, any>[] => [
      {
        header: 'Name',
        id: 'name',
        accessorKey: 'name',
        enableColumnFilter: true,
        cell: props => (
          <FormCell {...props} lastAddedUUID={lastAddedUUID} mutate={mutate} codebookType={watchCodebook?.name} />
        )
      }
    ],
    [lastAddedUUID, mutate, watchCodebook]
  )

  useEffect(() => {
    if (isFirstRender) {
      if (selectedCodebookQuery)
        setValue('codebook', {
          uid: selectedCodebookQuery as CODEBOOK,
          name: selectedCodebookQuery as CODEBOOK
        })
    }
  }, [isFirstRender, selectedCodebookQuery, setValue])

  const handleAddNewCodebookValue = () => {
    const id = uuid()
    mutate(
      prev => {
        if (prev) {
          return { data: [{ name: '', uid: '', uuid: id }, ...prev.data], metadata: prev.metadata }
        }
      },
      { revalidate: false }
    )
    setLastAddedUUID(id)
  }

  return (
    <Fragment>
      <PageHead>
        <PlusButton buttonSize="large" onClick={handleAddNewCodebookValue} />
        <Form {...{ formMethods }}>
          <Listbox
            {...fields.codebook}
            className={'w-72'}
            onChange={(v: CodebookType) => {
              setSelectedCoodebookQuery(v.uid)
            }}
            codebookResponse={response?.map(code => ({ name: code.code, uid: code.code }))}
          />
        </Form>
      </PageHead>
      <Card>
        <MemoizedTable
          {...{
            tableId: 'codebooks',
            columns,
            data: codebook?.data,
            loading: isLoading,
            settings: {
              enableFiltering: true,
              enableSorting: true,
              manualSorting: false
            }
          }}
        />
      </Card>
    </Fragment>
  )
}
