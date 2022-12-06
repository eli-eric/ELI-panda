import { BASE_URL } from 'core/types/constants/common'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const usePath = () => {
  const [categoryPath, setCategoryPath] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    if (!router.query.slug) setCategoryPath('')
    const { slug } = router.query
    if (slug && typeof slug === 'object') {
      let path = ''
      slug.forEach(slug => {
        path += (path !== '' ? '/' : '') + slug
      })
      setCategoryPath(path)
    }
  }, [router, setCategoryPath])

  return categoryPath
}

export const useCategoryPath = () => {
  const path = usePath()

  return BASE_URL + ENDPOINTS.catalogueCategories + `/${path}`
}

export const useCatalogueItemsPath = (pageSize: number, page: number) => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')
  const categoryPath = usePath()

  useEffect(() => {
    const { search } = router.query
    if (search && typeof search === 'string') {
      setSearch(`&search=${search}`)
    }
    if (!search || search === undefined) setSearch('')
  }, [router.query])

  return (
    BASE_URL + ENDPOINTS.catalogueItems + `?pageSize=${pageSize}&page=${page}&categoryPath=${categoryPath}` + search
  )
}

export const useCatalogueItemDetailPath = () => {
  const router = useRouter()
  return BASE_URL + ENDPOINTS.catalogueItem + '/' + router.query.uid
}
