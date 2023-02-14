import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { ENDPOINTS } from '@/types/constants/endpoints'

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
  const { status } = useSession()
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

export const useCatalogueItemDetailPath = (uid: string) => {
  return uid ? ENDPOINTS.catalogueItem + '/' + uid : null
}
