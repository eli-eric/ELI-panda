import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'
import { FormattedDate } from 'react-intl'

import { LinkDecorator } from '@/components/decorators'
import { ShortCell } from '@/components/table/short-cell'
import { PATH } from '@/types/constants/paths'

import type { Publication } from '../publication/types/responses'
import { ActionButtons } from './components/action-buttons.comp'

export const usePublicationColumns = () => {
  const columns = useMemo(
    (): ColumnDef<Publication, any>[] => [
      {
        id: 'mediaType',
        header: 'Media Type',
        accessorFn: row => row.mediaType,
        meta: { sticky: true },
        size: 150
      },
      {
        id: 'code',
        header: 'Code',
        accessorFn: row => row.code,
        size: 150,
        meta: {
          sticky: true
        },
        cell: ({ getValue, row: { original } }) => {
          return (
            <div className="relative w-full h-full flex items-center">
              <Link href={PATH.PUBLICATION + '/' + original.uid}>
                <LinkDecorator>
                  <div>{getValue()}</div>
                </LinkDecorator>
              </Link>
              <ActionButtons uid={original?.uid || ''} />
            </div>
          )
        }
      },
      {
        id: 'experimentalSystem',
        header: 'Experimental System',
        accessorFn: row => row.experimentalSystem
      },
      {
        id: 'userCall',
        header: 'User Call',
        accessorFn: row => row.userCall?.name
      },
      {
        id: 'userExperiment',
        header: 'User Experiment',
        accessorFn: row => row?.userExperiment?.name
      },
      {
        id: 'doi',
        header: 'DOI',
        accessorFn: row => row.doi
      },
      {
        id: 'webLink',
        header: 'Web Link',
        accessorFn: row => row.webLink,
        cell: ({ getValue }) => (
          <Link href={getValue() || ''} target="_blank">
            <LinkDecorator>Click here</LinkDecorator>
          </Link>
        )
      },
      {
        id: 'openAccessType',
        header: 'Open Access Type',
        accessorFn: row => row.openAccessType?.name
      },
      {
        id: 'title',
        header: 'Title',
        accessorFn: row => row.title
      },
      {
        id: 'allAuthors',
        header: 'Authors',
        accessorFn: row => row.allAuthors
      },
      {
        id: 'allAuthorsCount',
        header: 'Authors Count',
        accessorFn: row => row.allAuthorsCount
      },
      {
        id: 'eliAuthors',
        header: 'ELI Authors',
        accessorFn: row => row.eliAuthors
      },
      {
        id: 'eliAuthorsCount',
        header: 'ELI Authors Count',
        accessorFn: row => row.eliAuthorsCount
      },
      {
        id: 'longJournalTitle',
        header: 'Journal Title',
        accessorFn: row => row.longJournalTitle,
        size: 400
      },
      {
        id: 'volume',
        header: 'Volume',
        accessorFn: row => row.volume
      },
      {
        id: 'issue',
        header: 'Issue',
        accessorFn: row => row.issue
      },
      {
        id: 'pages',
        header: 'Pages',
        accessorFn: row => row.pages
      },
      {
        id: 'pagesCount',
        header: 'Pages Count',
        accessorFn: row => row.pagesCount
      },

      {
        id: 'citeAs',
        header: 'Cite As',
        accessorFn: row => row.citeAs
      },
      {
        id: 'impactFactor',
        header: 'Impact Factor',
        accessorFn: row => row.impactFactor
      },
      {
        id: 'quartilBasis',
        header: 'Quartil Basis',
        accessorFn: row => row.quartilBasis
      },
      {
        id: 'quartil',
        header: 'Quartil',
        accessorFn: row => row.quartil
      },
      {
        id: 'yearOfPublication',
        header: 'Year Of Publication',
        accessorFn: row => row.yearOfPublication
      },
      {
        id: 'dateOfPublication',
        header: 'Date Of Publication',
        accessorFn: row => row.dateOfPublication,
        cell: ({ getValue }) => <FormattedDate value={getValue()} />
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
        id: 'oecdFord',
        header: 'OECD Ford',
        accessorFn: row => row.oecdFord
      },
      {
        id: 'grant',
        header: 'Grant',
        accessorFn: row => row.grant
      },
      {
        id: 'wosNumber',
        header: 'WOS Number',
        accessorFn: row => row.wosNumber
      },
      {
        id: 'issn',
        header: 'ISSN',
        accessorFn: row => row.issn
      },
      {
        id: 'eissn',
        header: 'E-ISSN',
        accessorFn: row => row.eissn
      },
      {
        id: 'eidScopus',
        header: 'EID Scopus',
        accessorFn: row => row.eidScopus
      },
      {
        id: 'publishingCountry',
        header: 'Publishing Country',
        accessorFn: row => row.publishingCountry?.name
      },
      {
        id: 'language',
        header: 'Language',
        accessorFn: row => row.language
      },
      {
        id: 'note',
        header: 'Note',
        accessorFn: row => row.note
      }
    ],
    []
  )

  return columns
}
