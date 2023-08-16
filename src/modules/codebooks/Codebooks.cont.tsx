import type { ColumnDef } from '@tanstack/react-table'
import type { FC } from 'react'
import { Fragment } from 'react'
import { useState } from 'react'
import { memo } from 'react'
import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import uuid from 'react-uuid'

import { PlusButton } from '@/components/Buttons'
import Combobox from '@/components/form/Combobox'
import { Form } from '@/components/form/Form'
import Card from '@/components/layout/Card'
import { PageHead } from '@/components/layout/PageHead'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'

import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { FormCell } from './components/cells/FormCell'

const { selectCodebookForm } = message.codebooksPage

const MemoizedTable = memo(PandaTable)

export const CodebooksContainer: FC = () => {
  const [lastAddedUUID, setLastAddedUUID] = useState<string>()

  const formMethods = useForm()
  const { codebooks } = useEndpoint()
  const { response } = useFetch<{ code: string; type: string }[]>({ url: codebooks })

  const fields = useMakeFormFields({
    codebook: {
      name: 'codebook',
      placeholder: selectCodebookForm.codebook.placeholder,
      rounded: 'rounded-md'
    }
  })

  const watchCodebook = useWatch({ name: fields.codebook.name, control: formMethods.control })

  const { data: codebook, mutate, isLoading } = useCodebook(watchCodebook?.uid, { limit: 10000 })

  const columns = useMemo(
    (): ColumnDef<CodebookType, any>[] => [
      {
        header: 'Name',
        id: 'name',
        size: 400,
        accessorKey: 'name',
        enableColumnFilter: true,
        cell: props => <FormCell {...props} lastAddedUUID={lastAddedUUID} />
      }
    ],
    [lastAddedUUID]
  )

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
          <Combobox
            {...fields.codebook}
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
            loading: isLoading
          }}
        />
      </Card>
    </Fragment>
  )
}
