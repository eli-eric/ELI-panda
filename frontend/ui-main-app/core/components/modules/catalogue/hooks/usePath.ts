import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useCategoryPath = () => {
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

export const useItemSearch = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const { search } = router.query
    if (search && typeof search === 'string') {
      setSearch(`&search=${search}`)
    }
    if (!search || search === undefined) setSearch('')
  }, [router.query])

  return search
}
