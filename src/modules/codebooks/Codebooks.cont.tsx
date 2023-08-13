import type { ColumnDef } from '@tanstack/react-table'
import type { FC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useMemo } from 'react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'

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

const { form } = message.cataloguePage.itemDetail

export const CodebooksContainer: FC = () => {
  const formMethods = useForm()

  const { watch } = formMethods

  const [codebooksResponse, setCodebooksResponse] = useState<CodebookType[]>([])
  const { codebooks } = useEndpoint()
  const { response } = useFetch<{ code: string; type: string }[]>({ url: codebooks })

  useEffect(() => {
    if (response) {
      setCodebooksResponse(response.map(code => ({ name: code.code, uid: code.code })))
    }
  }, [response])

  const fields = useMakeFormFields({
    codebook: {
      name: 'codebook',
      placeholder: form.name.placeholder,
      rounded: 'rounded-md'
    }
  })

  const watchCodebook = watch('codebook')

  const codeBook = useCodebook(watchCodebook?.uid)

  const columns = useMemo(
    (): ColumnDef<CodebookType, any>[] => [
      {
        header: 'Name',
        id: 'name',
        size: 400,
        accessorKey: 'name',
        cell: FormCell
      }
    ],
    []
  )

  return (
    <Fragment>
      <PageHead>
        <PlusButton buttonSize="large" />
        <Form {...{ formMethods }}>
          <Combobox {...fields.codebook} codebookResponse={codebooksResponse} />
        </Form>
      </PageHead>
      <Card>
        <PandaTable
          {...{
            tableId: 'codebooks',
            className: 'relative',
            columns,
            data: codeBook?.data || [],
            isLoading: false
          }}
        />
      </Card>
    </Fragment>
  )
}
