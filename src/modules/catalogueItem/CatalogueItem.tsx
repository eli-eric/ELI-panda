import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormProvider } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import ErrorPage from '@/components/error/ErrorPage'
import { TextArea } from '@/components/form/Input'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import useSubmit from '@/hooks/fetch/useSubmit'
import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'
import useImageGallery from '@/hooks/useImageGallery'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/types/constants/files'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import DefaultItemForm from './components/form/DefaultItemForm'
import Groups from './components/form/Groups'
import { schema } from './components/form/ItemForm.schema'
import ItemHeader from './components/header/Header.comp'
import type { CatalogueItemDetail } from './types/responses'
import type { CatalogueItem } from './types/responses'

type CatalogueItemWithGalleryWatch = CatalogueItem & {
  hasImageGalleryChanges: boolean
}

const ItemContainer = () => {
  const router = useRouter()
  const { query, push } = router
  const queryUID = query.uid as string | undefined

  const disabledEdit = !usePermission([ROLE.CATALOGUE_EDIT])

  const { catalogueItem } = useEndpoint({ uid: queryUID })

  const { response: item } = useFetch<CatalogueItem>({
    url: () => (queryUID ? catalogueItem : null),
    config: { suspense: false },
    useMockFetcher: false
  })

  const formMethods = useForm<CatalogueItemWithGalleryWatch>({
    resolver: yupResolver(schema),
    defaultValues: item
  })

  const { reset, setValue, control, formState } = formMethods

  useEffect(() => {
    item && reset(item)
  }, [item, reset])

  useFormNotification<CatalogueItemWithGalleryWatch>({ control })

  const {
    discard,
    hasChanges,
    submit: saveImages,
    Gallery: ImageGallery
  } = useImageGallery({
    itemCategory: FILE_TYPE.CATALOGUE,
    itemId: String(queryUID)
  })

  const FormWarningModal = useFormLeaveWarning<CatalogueItemWithGalleryWatch>({
    formState
  })

  useEffect(() => {
    setValue('hasImageGalleryChanges', hasChanges, { shouldDirty: hasChanges })
  }, [hasChanges, setValue])

  const { submit, loading } = useSubmit({
    endpoint: catalogueItem,
    method: queryUID ? 'put' : 'post',
    mutateList: [catalogueItem],
    onSuccess: async uid => {
      await saveImages(String(uid))
      toast.success('Item saved')
      if (!queryUID) push(PATH.CATALOGUE_ITEM + '/' + uid)
    },
    onError: () => {
      toast.error('Error saving item')
      discard()
    }
  })

  const onSubmit = (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...cleanData } = data
    submit(cleanData)
  }

  const { catalogueCategoryProperties } = useEndpoint({ uid: queryUID ?? '' })

  const { response: itemDetail } = useFetch<CatalogueItemDetail[]>({
    url: queryUID && catalogueCategoryProperties,
    onError: () => {
      toast.error('Failed to load group details')
    },
    useMockFetcher: false
  })
  console.log(queryUID)
  console.log(item)
  console.log(itemDetail)

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <ItemHeader disabledEdit={false} loading={loading} />
        <Card className="flex flex-col justify-between pb-5">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
            <div className="relative h-full">
              <ImageGallery className="lg:absolute lg:inset-0 pt-6 pl-6" hasEditRole={true} />
            </div>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-2">
              <DefaultItemForm />
            </div>
          </div>
          <TextArea name="description" label={'Description'} rounded={'rounded-md'} className={'px-4 py-5 sm:px-6'} />
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <Groups item={item} itemDetail={itemDetail} />
            </Suspense>
          </ErrorBoundary>
          <FormWarningModal />
          {queryUID && (
            <ErrorBoundary fallback={<ErrorPage />}>
              <Suspense fallback={<ProgressBarComponent />}>
                <FileManager itemType={FILE_TYPE.CATALOGUE} uid={queryUID} hasEditRole={!disabledEdit} />
              </Suspense>
            </ErrorBoundary>
          )}
        </Card>
      </form>
      <DevTool control={formMethods.control} />
    </FormProvider>
  )
}

export default ItemContainer
