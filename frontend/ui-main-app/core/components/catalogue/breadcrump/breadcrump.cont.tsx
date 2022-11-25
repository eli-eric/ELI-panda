import { PATHS } from 'core/types/constants/paths'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import BreadcrumpItemComponent from './breadcrump-item.comp'
import BreadcrumbListComponent from './breadcrump-list.comp'

const BreadcrumbContainer = () => {
  const router = useRouter()

  const navigationList = useMemo(() => {
    if (router.query.slug) {
      const { slug, search } = router.query
      let link = PATHS.CATALOGUE as string
      if (slug && typeof slug === 'object') {
        return slug.map((slug, i) => {
          link += `/${slug}`
          return (
            <BreadcrumpItemComponent
              key={i}
              name={slug}
              link={link + (search ? `?search=${search}` : '')}
            />
          )
        })
      }
      return
    }

    return undefined
  }, [router])

  return <BreadcrumbListComponent navigationList={navigationList} />
}
export default BreadcrumbContainer
