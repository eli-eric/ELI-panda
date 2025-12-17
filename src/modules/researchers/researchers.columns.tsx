import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { formatDate } from '@/utils/formatters'

import { ResearcherActionsCell } from './components/researcher-actions.comp'
import type { Researcher } from './types/researcher.types'

export const useResearcherColumns = () => {
  const columns = useMemo(
    (): ColumnDef<Researcher, any>[] => [
      {
        id: 'lastName',
        header: 'Last Name',
        accessorFn: row => row.lastName,
        size: 150,
        meta: { sticky: true },
        cell: ResearcherActionsCell
      },
      {
        id: 'firstName',
        header: 'First Name',
        accessorFn: row => row.firstName,
        size: 150
      },
      {
        id: 'orcid',
        header: 'ORCID',
        accessorFn: row => row.orcid,
        size: 220
      },
      {
        id: 'scopusId',
        header: 'Scopus ID',
        accessorFn: row => row.scopusId,
        size: 150
      },
      {
        id: 'researcherId',
        header: 'Researcher ID',
        accessorFn: row => row.researcherId,
        size: 150
      },
      {
        id: 'identificationNumber',
        header: 'Identification Number',
        accessorFn: row => row.identificationNumber,
        size: 180
      },
      {
        id: 'citizenship',
        header: 'Citizenship',
        accessorFn: row => row.citizenship?.name,
        size: 150
      },
      {
        id: 'updatedAt',
        header: 'Updated',
        accessorFn: row => row.updatedAt,
        size: 320,
        cell: ({ getValue }) => {
          const value = getValue()
          return value ? formatDate(value) : ''
        }
      }
    ],
    []
  )

  return columns
}
