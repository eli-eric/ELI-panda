import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { ENDPOINTS } from '@/types/constants/endpoints'

/* hooks for getting endpoitpaths for catalogue */

export const useCataloguePath = () => {
  const router = useRouter()
  const { slug } = router.query as { slug: string[] }
  const categoryPath = useMemo(() => (slug ? slug.join('/') : ''), [slug])
  return categoryPath
}

export const useCategoryPath = () => {
  const path = useCataloguePath()
  return ENDPOINTS.catalogueCategories + (path === '' ? '' : `/${path}`)
}
