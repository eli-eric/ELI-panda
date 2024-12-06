import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'
import { FormattedDate } from 'react-intl'

import { LinkDecorator } from '@/components/decorators'
import { ShortCell } from '@/components/table/short-cell'
import { APP_BASE_URL } from '@/types/constants/common'

import type { Publication } from '../publication/types/responses'
import { ActionButtons } from './components/action-buttons.comp'

export const usePublicationColumns = () => {
  const columns = useMemo(
    (): ColumnDef<Publication, any>[] => [
      {
        id: 'pdfFile',
        header: 'PDF File',
        accessorFn: row => row.pdfFileName,
        size: 100,
        meta: {
          sticky: true
        },
        cell: ({ getValue, row: { original } }) => {
          const value = getValue()
          const url = original.pdfFileUrl
          if (!value) return null
          return (
            <Link href={APP_BASE_URL + url} target="_blank">
              <LinkDecorator>
                <div>{value}</div>
              </LinkDecorator>
            </Link>
          )
        }
      },
      {
        id: 'longJournalTitle',
        header: 'Journal Title',
        accessorFn: row => row.journalTitle,
        size: 400,
        meta: {
          sticky: true
        },
        cell: ({ getValue, row: { original } }) => {
          return (
            <div className="relative w-full h-full flex items-center">
              <div>{getValue()}</div>
              <ActionButtons uid={original.uid} />
            </div>
          )
        }
      },
      {
        id: 'articleTitle',
        header: 'Article Title',
        accessorFn: row => row.articleTitle,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={30} />
        )
      },
      {
        id: 'publicationDOI',
        header: 'Publication DOI',
        accessorFn: row => row.doi
      },
      {
        id: 'abstract',
        header: 'Abstract',
        accessorFn: row => row.abstract,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={30} />
        )
      },
      {
        id: 'keywords',
        header: 'Keywords',
        accessorFn: row => row.keywords,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={30} />
        )
      },
      {
        id: 'eissn',
        header: 'EISSN',
        accessorFn: row => row.eissn
      },
      {
        id: 'issn',
        header: 'ISSN',
        accessorFn: row => row.issn
      },
      {
        id: 'eidScopus',
        header: 'EID Scopus',
        accessorFn: row => row.eidScopus
      },
      {
        id: 'language',
        header: 'Language',
        accessorFn: row => row.language
      },
      {
        id: 'openAccessType',
        header: 'Open Access Type',
        accessorFn: row => row.openAccessType?.name
      },
      {
        id: 'state',
        header: 'State',
        accessorFn: row => row.state
      },
      {
        id: 'publishDate',
        header: 'Publish Date',
        accessorFn: row => row.publishDate,
        cell: ({ getValue }) => <FormattedDate value={new Date(getValue())} />
      },
      {
        id: 'userCall',
        header: 'User Call',
        accessorFn: row => row.userCall?.name
      },
      {
        id: 'userExperiment',
        header: 'User Experiment',
        accessorFn: row => row?.useExperiment?.name
      },
      {
        id: 'webLink',
        header: 'Web Link',
        accessorFn: row => row.url,
        cell: ({ getValue }) => (
          <Link href={getValue() || ''} target="_blank">
            <LinkDecorator>Click here</LinkDecorator>
          </Link>
        )
      },
      {
        id: 'quartile',
        header: 'Quartile',
        accessorFn: row => row.quartile
      },
      {
        id: 'volume',
        header: 'Volume',
        accessorFn: row => row.volume
      },
      {
        id: 'pages',
        header: 'Pages',
        accessorFn: row => row.pagesTotal
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
