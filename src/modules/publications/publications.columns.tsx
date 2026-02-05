import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { ShortCell } from '@/components/table/short-cell'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import { MEDIA_TYPE_MAP } from '../publication/types/constants'
import type { Publication } from '../publication/types/responses'
import { TitleCell } from './components/TitleCell'

export const usePublicationColumns = () => {
  const { formatMessage: fm } = useIntl()

  const columns = useMemo(
    (): ColumnDef<Publication, any>[] => [
      {
        id: 'title',
        header: fm({ id: message.publicationsPage.columns.title }),
        accessorFn: row => row.title,
        size: 375,
        meta: { sticky: true },
        cell: TitleCell
      },
      {
        id: 'code',
        header: 'Code',
        accessorFn: row => row.code,
        size: 200
      },
      {
        id: 'mediaType',
        header: 'Media Type',
        accessorFn: row =>
          row.mediaTypeCb?.name || MEDIA_TYPE_MAP[row.mediaType || ''],
        size: 200
      },
      {
        id: 'experimentalSystem',
        header: 'Experimental System',
        accessorFn: row =>
          row.experimentalSystemCb?.name || row.experimentalSystem,
        size: 230
      },
      {
        id: 'userCall',
        header: 'User Call',
        accessorFn: row => row.userCall?.name,
        size: 200
      },
      {
        id: 'userExperiment',
        header: 'User Experiment',
        accessorFn: row => row?.userExperimentCb?.name || row.userExperiment,
        size: 200
      },
      {
        id: 'doi',
        header: 'DOI',
        accessorFn: row => row.doi,
        size: 300
      },
      {
        id: 'webLink',
        header: 'Web Link',
        accessorFn: row => row.webLink,
        cell: ({ getValue }) => (
          <Button variant="link" className="cursor-pointer" asChild>
            <Link href={getValue() || ''} target="_blank">
              {fm({ id: message.common.publications.clickHere })}
            </Link>
          </Button>
        )
      },
      {
        id: 'openAccessType',
        header: 'Open Access Type',
        accessorFn: row => row.openAccessType?.name,
        size: 200
      },
      {
        id: 'allAuthors',
        header: 'Authors',
        accessorFn: row => row.allAuthors,
        size: 300,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={30} />
        )
      },
      {
        id: 'allAuthorsCount',
        header: 'Authors Count',
        accessorFn: row => row.allAuthorsCount
      },
      {
        id: 'eliAuthors',
        header: 'ELI Authors(old)',
        accessorFn: row => row.eliAuthors,
        size: 300,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={30} />
        )
      },
      {
        id: 'eliResearchers',
        header: 'ELI Researchers',
        accessorFn: row =>
          row.eliResearchers
            ?.map(er => `${er.firstName} ${er.lastName}`)
            .join('; '),
        size: 300
      },
      {
        id: 'eliAuthorsCount',
        header: 'ELI Authors Count',
        accessorFn: row => row.eliAuthorsCount,
        size: 200
      },
      {
        id: 'longJournalTitle',
        header: 'Journal Title',
        accessorFn: row => row.longJournalTitle,
        size: 400,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={50} />
        )
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
        accessorFn: row => row.citeAs,
        size: 400,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={40} />
        )
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
        accessorFn: row => row.yearOfPublication,
        size: 200
      },
      {
        id: 'dateOfPublication',
        header: 'Date Of Publication',
        accessorFn: row => row.dateOfPublication,
        size: 200
      },
      {
        id: 'abstract',
        header: 'Abstract',
        accessorFn: row => row.abstract,
        size: 400,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={100} />
        )
      },
      {
        id: 'keywords',
        header: 'Keywords',
        accessorFn: row => row.keywords,
        size: 250,
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
        header: 'Grants',
        size: 300,
        accessorFn: row => row.grants?.map(g => g.code).join('; ') || row.grant,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={40} />
        )
      },
      {
        id: 'otherGrants',
        header: 'Other Grants',
        size: 300,
        accessorFn: row => row.otherGrants,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={40} />
        )
      },
      {
        id: 'wosNumber',
        header: 'WOS Number',
        size: 300,
        accessorFn: row => row.wosNumber,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={35} />
        )
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
        accessorFn: row => row.publishingCountry?.name,
        size: 200
      },
      {
        id: 'language',
        header: 'Language',
        accessorFn: row => row.language
      },
      {
        id: 'note',
        header: 'Note',
        accessorFn: row => row.note,
        size: 300,
        cell: ({ getValue }) => (
          <ShortCell value={getValue()} numberOfChars={30} />
        )
      }
    ],
    [fm]
  )

  return columns
}
