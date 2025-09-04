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
  authorsDepartments: data.authorsDepartments?.map(author => ({
    ...author,
    authorsCount: Number(author.authorsCount)
  }))
})

export const formatPublication = (
  publication?: Publication
): PublicationForm | undefined => {
  if (!publication) {
    return undefined
  }

  const formattedPublication: PublicationForm = {
    ...publication
  }
  return formattedPublication
}
