import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'

import { LinkDecorator } from '@/components/decorators'
import { APP_BASE_URL } from '@/types/constants/common'

import type { Publication } from '../publication/types/responses'

export const usePublicationColumns = () => {
  const columns = useMemo(
    (): ColumnDef<Publication, any>[] => [
      {
        id: 'pdfFile',
        header: 'PDF File',
        accessorFn: row => row.pdfFile,
        cell: ({ getValue }) => {
          const value = getValue()
          if (!value) return null
          return (
            <Link href={APP_BASE_URL + value} target="_blank">
              <LinkDecorator>
                <div>PDF File</div>
              </LinkDecorator>
            </Link>
          )
        }
      },
      {
        id: 'longJournalTitle',
        header: 'Long Journal Title',
        accessorFn: row => row.longJournalTitle
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
