'use client'
import { type ColumnDef } from '@tanstack/react-table'
import { useQueryState } from 'next-usequerystate'
import type { FC } from 'react'
import { useMemo } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import ProgressBarComponent from '@/components/progress-bar.comp'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableControlled } from '@/modules/shared/table/pandaTable/PandaTableCotrolled'
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
              className: 'relative overflow-scroll scrollbar-style border-l border-r',
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
