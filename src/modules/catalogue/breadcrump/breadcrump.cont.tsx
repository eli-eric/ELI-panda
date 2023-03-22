import { useRouter } from 'next/router'
import { useMemo } from 'react'

import BreadcrumpItem from '@/components/Breadcrump/Breadcrump.item'
import { PATH } from '@/types/constants/paths'

import BreadcrumbListComponent from './breadcrump-list.comp'

const CatalogueBreadcrumbContainer = () => {
  const router = useRouter()

  const navigationList = useMemo(() => {
    if (router.query.slug) {
      const { slug } = router.query
      let link = PATH.CATALOGUE as string
      if (slug && typeof slug === 'object') {
        return slug.map((slug, i) => {
          link += `/${slug}`
          return <BreadcrumpItem key={i} name={slug} link={link} />
        })
      }
      return
    }

    return undefined
  }, [router])

  return <BreadcrumbListComponent testId="breadcrump" navigationList={navigationList} />
}
export default CatalogueBreadcrumbContainer
