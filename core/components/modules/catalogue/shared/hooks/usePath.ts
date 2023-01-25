import { ENDPOINTS } from 'core/types/constants/endpoints'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

/* hooks for getting endpoitpaths for catalogue */

const usePath = () => {
  const router = useRouter()
  const { slug } = router.query

  const categoryPath = useMemo(() => {
    if (!slug) return ''
    if (slug && typeof slug === 'object') {
      let path = ''
      slug.forEach(slug => {
        path += (path !== '' ? '/' : '') + slug
      })
      return path
    }
  }, [slug])

  return categoryPath
}

export const useCategoryPath = () => {
  const path = usePath()
  return ENDPOINTS.catalogueCategories + (path === '' ? '' : `/${path}`)
}

export const useCatalogueItemsPath = (pageSize: number, page: number) => {
  const router = useRouter()
  const { search } = router.query
  const categoryPath = usePath()

  const searchQuery = useMemo(() => {
    if (search && typeof search === 'string') {
      return `&search=${search}`
    }
    if (!search || search === undefined) return ''
  }, [search])

  return ENDPOINTS.catalogueItems + `?pageSize=${pageSize}&page=${page}&categoryPath=${categoryPath}` + searchQuery
}

export const useCatalogueItemDetailPath = (uid?: string | undefined) => {
  const router = useRouter()
  return ENDPOINTS.catalogueItem + '/' + (uid ? uid : router.query.uid)
}
