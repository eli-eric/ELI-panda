'use client'
import type { ColumnDef } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import type { FC } from 'react'
import { useMemo } from 'react'

import Card from '@/components/layout/Card'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import type { CODEBOOK } from '@/types/constants/codebook'

import { FormCell } from './cells/FormCell'

interface Props {
  lastAddedUUID?: string
}
const CodebookTable: FC<Props> = ({ lastAddedUUID }) => {
  const [selectedCodebookQuery] = useQueryState('selectedCodebook')
  const {
    data: codebook,
    mutate,
    isLoading
  } = useCodebook(selectedCodebookQuery as CODEBOOK, {
    limit: 5000
  })
  const columns = useMemo(
    (): ColumnDef<CodebookType, any>[] => [
      {
        header: 'Name',
        id: 'name',
        accessorKey: 'name',
        enableColumnFilter: true,
        cell: props => (
          <FormCell
            {...props}
            lastAddedUUID={lastAddedUUID}
            mutate={mutate}
            codebookType={selectedCodebookQuery as CODEBOOK}
          />
        ),
        meta: {
          filter: {
            type: 'string',
            codebookCode: selectedCodebookQuery,
            enableColumnFilter: true
          }
        }
      }
    ],
    [lastAddedUUID, mutate, selectedCodebookQuery]
  )

  return (
    <Card>
      {selectedCodebookQuery && codebook?.data && codebook?.data.length > 0 && (
        <PandaTable
          {...{
            tableId: 'codebooks',
            columns,
            className: 'border-l pb-0',
            data: codebook?.data,
            loading: isLoading,
            settings: {
              enableFiltering: true,
              manualFiltering: false,
              enableSorting: true,
              manualSorting: false
            }
          }}
        />
      )}
    </Card>
  )
}

export default CodebookTable
