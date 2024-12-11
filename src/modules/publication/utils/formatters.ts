import { convertDate } from '@/utils/formatters'

import type { PublicationForm } from '../types/form'
import type { Publication } from '../types/responses'

export const formatFormData = (data: PublicationForm): Publication => ({
  ...data,
  allAuthorsCount: Number(data.allAuthorsCount),
  eliAuthorsCount: Number(data.eliAuthorsCount),
  volume: Number(data.volume),
  pagesCount: Number(data.pagesCount),
  issue: data.issue ? Number(data.issue) : undefined,
  impactFactor: data.impactFactor ? Number(data.impactFactor) : undefined,
  dateOfPublication: convertDate(data.dateOfPublication),
  authorsDepartments: data.authorsDepartments?.map(author => ({
    ...author,
    authorsCount: Number(author.authorsCount)
  }))
})

export const formatPublication = (
  publication?: Publication
): PublicationForm | undefined =>
  publication
    ? {
        ...publication,
        allAuthorsCount: publication.allAuthorsCount.toString(),
        eliAuthorsCount: publication.eliAuthorsCount.toString(),
        volume: publication.volume.toString(),
        issue: publication.issue?.toString(),
        pagesCount: publication.pagesCount.toString(),
        impactFactor: publication.impactFactor?.toString()
      }
    : undefined
