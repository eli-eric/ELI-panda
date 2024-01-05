import { yupResolver } from '@hookform/resolvers/yup'
import { memo, useEffect, useRef } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import { TextArea } from '@/components/form/Input'
import Card from '@/components/layout/Card'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/types/constants/files'
import { ROLE } from '@/types/constants/roles'

import { useCategory } from '../catalogue/hooks/useCategory'
import FileManager from '../shared/fileManager/FileManager'
import { ImageGallery } from '../shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '../shared/imageManager/types'
import useCatalogueFormFields from './components/form/CatalogueForm.fields'
import DefaultItemForm from './components/form/DefaultItemForm'
import Groups from './components/form/Groups'
import { schema } from './components/form/ItemForm.schema'
import ItemHeader from './components/header/Header.comp'
import { CatalogueOrders } from './components/orders/CatalogueOrders'
import { CatalogueStatisticsContainer } from './components/statistics/CatalogueStatistics.cont'
import useItem from './hooks/useItem'
import useItemSubmit from './hooks/useItemSubmit'
import type { CatalogueItem } from './types/responses'

const MemoizedGallery = memo(ImageGallery)
const MemoizedGroups = memo(Groups)

interface CatalogueForm extends CatalogueItem {
  hasImageGalleryChanges?: boolean
}

interface CatalogueItemContainerProps {
  uid?: string
  catalogueCategoryUid?: string
}

const CatalogueItemContainer = ({ uid, catalogueCategoryUid }: CatalogueItemContainerProps) => {
  const disabledEdit = !usePermission([ROLE.CATALOGUE_EDIT])
  const { item } = useItem()
  const fields = useCatalogueFormFields()

  const { catalogueCategory } = useCategory(catalogueCategoryUid)

  const imageRef = useRef<ImageGalleryRef>()
  const formMethods = useForm<CatalogueForm>({ resolver: yupResolver(schema), defaultValues: { ...item } })
  const { reset } = formMethods
  const { submit, loading } = useItemSubmit(imageRef)

  useEffect(() => {
    if (catalogueCategory) {
      reset({
        category: {
          uid: catalogueCategory.uid,
          name: catalogueCategory.name
        }
      })
    }
  }, [catalogueCategory, reset])

  const onSubmit = (catalogueItem: CatalogueForm) => {
    // extract from catalogueItem hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = catalogueItem
    submit(rest as CatalogueItem)
  }

  return (
    <Form formMethods={formMethods} enableLeaveWarning={true} onSubmit={onSubmit}>
      <ItemHeader disabledEdit={disabledEdit} loading={loading} />
      <Card className="flex flex-col justify-between pb-5">
        <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
          <MemoizedGallery
            ref={imageRef}
            config={{ itemCategory: FILE_TYPE.CATALOGUE, itemId: String(uid) }}
            className="relative h-full max-h-56 mt-6 pl-6 "
            hasEditRole={!disabledEdit}
          />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-2">
            <DefaultItemForm />
          </div>
        </div>
        <TextArea {...fields.description} className={'px-4 py-5 sm:px-6'} />
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense>
            <MemoizedGroups />
          </Suspense>
        </ErrorBoundary>
        {uid && <CatalogueOrders />}
        {uid && <CatalogueStatisticsContainer catalogueItemUid={uid} />}
        {uid && (
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense>
              <FileManager itemType={FILE_TYPE.CATALOGUE} uid={uid} hasEditRole={!disabledEdit} />
            </Suspense>
          </ErrorBoundary>
        )}
      </Card>
    </Form>
  )
}

export default CatalogueItemContainer
