import { DevTool } from '@hookform/devtools'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormProvider } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import ErrorPage from '@/components/error/ErrorPage'
import { TextArea } from '@/components/form/Input'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import useImageGallery from '@/hooks/useImageGallery'
import { FILE_TYPE } from '@/types/constants/files'

import DefaultItemForm from './components/form/DefaultItemForm'
import Groups from './components/form/Groups'
import ItemHeader from './components/header/Header.comp'
import useItemForm from './hooks/useItemForm'
import useItemSubmit from './hooks/useItemSubmit'

const ItemContainer = () => {
  const { FormWarningModal, ...formMethods } = useItemForm()
  const { query, push, pathname } = useRouter()
  const {
    hasChanges,
    submit: saveImages,
    Gallery: ImageGallery
  } = useImageGallery({
    itemCategory: FILE_TYPE.CATALOGUE,
    itemId: String(query.uid)
  })

  const saveImageAndRedirect = async (uid: string) => {
    const status = await saveImages(uid)

    const { failedUploads, failedDeletions } = status
    const totalFailures = failedUploads.length + failedDeletions.length
    if (totalFailures > 0)
      toast.error(`Failed to process ${totalFailures} ${totalFailures === 1 ? 'image' : 'images'}.`)

    push(`${pathname}/${uid}`)
  }
  const { setValue } = formMethods
  useEffect(() => {
    setValue('hasImageGalleryChanges', hasChanges, { shouldDirty: true })
  }, [hasChanges, setValue])

  const { submit, loading } = useItemSubmit({ onSuccess: saveImageAndRedirect })

  const onSubmit = (data: any) => {
    submit(data)
  }

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
              <Groups />
            </Suspense>
          </ErrorBoundary>
          <FormWarningModal />
        </Card>
      </form>
      <DevTool control={formMethods.control} />
    </FormProvider>
  )
}

export default ItemContainer
