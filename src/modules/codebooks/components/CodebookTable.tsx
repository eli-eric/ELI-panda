'use client'
import type { QueryKey } from '@tanstack/react-query'
import { type ColumnDef } from '@tanstack/react-table'
import type { FC } from 'react'
import { useMemo } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'
import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookType } from '@/types/responses/codebook'

import { FormCell } from './cells/FormCell'

interface Props {
  lastAddedUUID?: string
  selectedCodebookQuery?: string | null
  queryKey: QueryKey
}
const CodebookTable: FC<Props> = ({
  lastAddedUUID,
  selectedCodebookQuery,
  queryKey
}) => {
  const { data: codebook, isLoading } = useCodebook(
    selectedCodebookQuery as CODEBOOK,
    {
      limit: 5000
    }
  )

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
            queryKey={queryKey}
            lastAddedUUID={lastAddedUUID}
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
    [lastAddedUUID, selectedCodebookQuery, queryKey]
  )

  const table = usePandaTable<CodebookType>({
    tableId: 'codebooks',
    data: codebook?.data || [],
    columns,
    settings: {
      enableFiltering: true,
      manualFiltering: false,
      enableSorting: true,
      manualSorting: false,
      enablePagination: true
    }
  })

  if (isLoading) return <ProgressBarComponent />

  return (
    <div className="mx-auto max-w-7xl">
      {selectedCodebookQuery && codebook?.data && codebook?.data.length > 0 && (
        <TableLayoutContainer>
          <PandaTableControlled
            {...{
              table,
              tableId: 'codebooks',
              className:
                'relative overflow-scroll scrollbar-style border-l border-r',
              data: codebook?.data,
              loading: isLoading,
              settings: {
                enableFiltering: true,
                manualFiltering: false,
                enablePagination: true,
                enableSorting: true,
                manualSorting: false
              }
            }}
          />
        </TableLayoutContainer>
      )}
    </div>
  )
}

export default CodebookTable
