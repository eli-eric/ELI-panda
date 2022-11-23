import BreadcrumbComponent from 'core/components/catalogue/breadcrump/breadcrump.comp'
import CategoryListComponent from 'core/components/catalogue/categories/category-list.comp'
import { useFetch } from 'core/helpers/hooks/useFetch'
import { message } from 'core/i18n/src/messages'
import CataloguePathContext from 'core/store/catalogue-path.context'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useContext, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Category } from 'types/responses'

const messages = message.cataloguePage

const CatalogueSubCategory: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const router = useRouter()
  const { cataloguePath, setCataloguePath } = useContext(CataloguePathContext)
  const categoryList = useFetch<Array<Category>>(`/catalogue/categories/${cataloguePath}`)

  useEffect(() => {
    const { slug } = router.query
    if (router.query.slug) {
      const { slug } = router.query

      const slugArray: string[] = []
      for (let i = 0; i < slug.length; i++) {
        slugArray.push(slug[i])
      }
      let path = ''
      slugArray.forEach(slug => {
        path += `/${slug}`
      })
      setCataloguePath(path)
    }
  }, [router, setCataloguePath])

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>

      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
        <BreadcrumbComponent />
        {categoryList && <CategoryListComponent categoryList={categoryList} />}
      </div>
    </Fragment>
  )
}

export default CatalogueSubCategory
