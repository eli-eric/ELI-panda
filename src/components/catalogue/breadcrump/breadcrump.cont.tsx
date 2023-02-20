import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { PATH } from '@/types/constants/paths'

import BreadcrumpItemComponent from './breadcrump-item.comp'
import BreadcrumbListComponent from './breadcrump-list.comp'

const BreadcrumbContainer = () => {
  const router = useRouter()

  const handleClick = (path: string) => {
    router.replace(path, undefined, { shallow: false })
  }

  const navigationList = useMemo(() => {
    if (router.query.slug) {
      const { slug } = router.query
      let link = PATH.CATALOGUE as string
      if (slug && typeof slug === 'object') {
        return slug.map((slug, i) => {
          link += `/${slug}`
          return <BreadcrumpItemComponent key={i} name={slug} link={link} />
        })
      }
      return
    }

    return undefined
  }, [router])

  return (
    <BreadcrumbListComponent testId="catalogue-breadcrump" navigationList={navigationList} handleClick={handleClick} />
  )
}
export default BreadcrumbContainer
