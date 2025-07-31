import { yupResolver } from '@hookform/resolvers/yup'
import { memo, useEffect, useRef, useState } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useForm } from 'react-hook-form'

import ErrorPage from '@/components/error/ErrorPage'
import { Form } from '@/components/form/Form'
import { TextArea } from '@/components/form/inputs'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
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
import { useCatalogueItem } from './hooks/useItem'
import { useItemSubmit } from './hooks/useItemSubmit'
import type { CatalogueItem, CatalogueItemDetail } from './types/responses'

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
  const [saveAndExit, setSaveAndExit] = useState(false)

  const { catalogueCategory } = useCategory(catalogueCategoryUid)

  const imageRef = useRef<ImageGalleryRef>()
  const formMethods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: { ...item }
  })
  const { reset, setValue, formState } = formMethods
  console.log('Form state:', formState)
  const { submit, loading } = useItemSubmit({
    setvalue: setValue,
    imageRef: imageRef,
    saveAndExit,
    reset
  })

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
    console.log('Submit data raw:', catalogueItem)
    
    // extract from catalogueItem hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = catalogueItem
    
    // Convert details object with UID keys back to details array for API
    const details = rest.details ? Object.values(rest.details) : []
    
    const finalData = { ...rest, details }
    console.log('Submit data processed:', finalData)
    
    setSaveAndExit(false)
    submit(finalData as CatalogueItem)
  }
  const onSubmitAndExit = (catalogueItem: CatalogueForm) => {
    console.log('SubmitAndExit data raw:', catalogueItem)
    
    // extract from catalogueItem hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = catalogueItem
    
    // Convert details object with UID keys back to details array for API
    const details = rest.details ? Object.values(rest.details) : []
    
    const finalData = { ...rest, details }
    console.log('SubmitAndExit data processed:', finalData)
    
    setSaveAndExit(true)
    submit(finalData as CatalogueItem)
  }

  return (
    <Form
      className="h-screen overflow-auto"
      formMethods={formMethods}
      enableLeaveWarning={true}
    >
      <HeaderWithButtons
        loading={loading}
        editRole={ROLE.CATALOGUE_EDIT}
        onSubmit={formMethods.handleSubmit(
          (data) => {
            console.log('handleSubmit SUCCESS:', data)
            onSubmit(data)
          },
          (errors) => {
            console.log('handleSubmit ERRORS:', errors)
          }
        )}
        onSubmitAndExit={formMethods.handleSubmit(
          (data) => {
            console.log('handleSubmitAndExit SUCCESS:', data)
            onSubmitAndExit(data)
          },
          (errors) => {
            console.log('handleSubmitAndExit ERRORS:', errors)
          }
        )}
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
        {uid && (
          <CatalogueStatisticsContainer 
            catalogueItemUid={uid} 
            variant="page" 
            className="mt-6"
          />
        )}
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
    </Form>
  )
}

export default CatalogueItemContainer
