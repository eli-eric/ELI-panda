import type { Publication } from '../types/responses'

export const formatFormData = (data: any): Publication => ({
  ...data,
  allAuthorsCount: Number(data.allAuthorsCount),
  eliAuthorsCount: Number(data.eliAuthorsCount),
  volume: data.volume ? Number(data.volume) : null,
  pagesCount: Number(data.pagesCount),
  issue: data.issue ? Number(data.issue) : null,
  impactFactor: data.impactFactor ? Number(data.impactFactor) : null,
  authorsDepartments:
    data.authorsDepartments?.map((author: any) => ({
      ...author,
      authorsCount: Number(author.authorsCount)
    })) ?? []
})

export const formatPublication = (
  publication?: Publication
): any | undefined => {
  if (!publication) {
    return undefined
  }

  return {
    ...publication,
    language: publication.language || 'English'
  }
}
