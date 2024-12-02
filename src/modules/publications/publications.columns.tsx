import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import type { Publication } from '../publication/types/responses'

export const usePublicationColumns = () => {
  const columns = useMemo(
    (): ColumnDef<Publication, any>[] => [
      {
        id: 'pdfFile',
        header: 'PDF File',
        accessorFn: row => row.pdfFile
      },
      {
        id: 'abstract',
        header: 'Abstract',
        accessorFn: row => row.abstract
      },
      {
        id: 'keywords',
        header: 'Keywords',
        accessorFn: row => row.keywords
      },
      {
        id: 'longJournalTitle',
        header: 'Long Journal Title',
        accessorFn: row => row.longJournalTitle
      },
      {
        id: 'pages',
        header: 'Pages',
        accessorFn: row => row.pages
      },
      {
        id: 'publicationDOI',
        header: 'Publication DOI',
        accessorFn: row => row.publicationDOI
      },
      {
        id: 'year',
        header: 'Year',
        accessorFn: row => row.year
      }
    ],
    []
  )

  return columns
}
