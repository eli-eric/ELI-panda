import { DevTool } from '@hookform/devtools'
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
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ROLE } from '@/types/constants/roles'

import { useCategory } from '../catalogue/hooks/useCategory'
import FileManager from '../shared/fileManager/FileManager'
import { ImageGallery } from '../shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '../shared/imageManager/types'
import useCatalogueFormFields from './components/form/CatalogueForm.fields'
import DefaultItemForm from './components/form/DefaultItemForm'
import Groups from './components/form/Groups'
import { schema } from './components/form/ItemForm.schema'
import { CatalogueOrders } from './components/orders/CatalogueOrders'
import { RelatedItemsContainer } from './components/related-items/RelatedItems.cont'
import { CatalogueStatisticsContainer } from './components/statistics/CatalogueStatistics.cont'
import useItemSubmit from './hooks/useItemSubmit'
import type { CatalogueItem } from './types/responses'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import { useCatalogueItem } from './hooks/useItem'

const MemoizedGallery = memo(ImageGallery)

interface CatalogueForm extends CatalogueItem {
  hasImageGalleryChanges?: boolean
}

interface CatalogueItemContainerProps {
  uid?: string
  catalogueCategoryUid?: string
}

const CatalogueItemContainer = ({
  uid,
  catalogueCategoryUid
}: CatalogueItemContainerProps) => {
  const disabledEdit = !usePermission([ROLE.CATALOGUE_EDIT])
  const { item } = useCatalogueItem()
  const fields = useCatalogueFormFields()

  const { catalogueCategory } = useCategory(catalogueCategoryUid)

  const imageRef = useRef<ImageGalleryRef>()
  const formMethods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: { ...item }
  })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogueCategory])

  const onSubmit = (catalogueItem: CatalogueForm) => {
    // extract from catalogueItem hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = catalogueItem
    submit(rest as CatalogueItem)
  }
  const onSubmitAndExit = (catalogueItem: CatalogueForm) => {
    // extract from catalogueItem hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = catalogueItem
    submit(rest as CatalogueItem, { saveAndExit: true })
  }

  return (
    <Form
      className="h-screen"
      formMethods={formMethods}
      enableLeaveWarning={true}
    >
      <HeaderWithButtons
        loading={loading}
        editRole={ROLE.CATALOGUE_EDIT}
        onSubmit={formMethods.handleSubmit(onSubmit)}
        onSubmitAndExit={formMethods.handleSubmit(onSubmitAndExit)}
      />
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
        <Groups />
        {uid && <RelatedItemsContainer />}
        {uid && <CatalogueOrders />}
        {uid && <CatalogueStatisticsContainer catalogueItemUid={uid} />}
        {uid && (
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense>
              <FileManager
                itemType={FILE_TYPE.CATALOGUE}
                uid={uid}
                hasEditRole={!disabledEdit}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </Card>
      <DevTool control={formMethods.control} placement="bottom-right" />
    </Form>
  )
}

export default CatalogueItemContainer
