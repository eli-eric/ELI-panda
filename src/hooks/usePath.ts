import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { ENDPOINTS } from '@/types/constants/endpoints'

/* hooks for getting endpoitpaths for catalogue */

export const useCataloguePath = () => {
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
  const path = useCataloguePath()
  return ENDPOINTS.catalogueCategories + (path === '' ? '' : `/${path}`)
}

export const useCatalogueItemsPath = (pageSize: number, page: number) => {
  const router = useRouter()
  const { search } = router.query
  const categoryPath = useCataloguePath()

  const searchQuery = useMemo(() => {
    console.log(router.query)
    if (search && typeof search === 'string') {
      return `&search=${search}`
    }
    if (!search || search === undefined) return ''
  }, [search, router])

  return ENDPOINTS.catalogueItems + `?pageSize=${pageSize}&page=${page}&categoryPath=${categoryPath}` + searchQuery
}
