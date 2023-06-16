import { DevTool } from '@hookform/devtools'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormProvider } from 'react-hook-form'

import ErrorPage from '@/components/error/ErrorPage'
import { TextArea } from '@/components/form/Input'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'

import ImageGalleryComponent from '../../components/item-detail/ImageGallery'
import DefaultItemForm from './components/form/DefaultItemForm'
import Groups from './components/form/Groups'
import ItemHeader from './components/header/Header.comp'
import useItem from './hooks/useItem'
import useItemForm from './hooks/useItemForm'
import useItemSubmit from './hooks/useItemSubmit'

const ItemContainer = () => {
  const { FormWarningModal, ...formMethods } = useItemForm()
  const { image } = useItem()
  const { submit, loading } = useItemSubmit()

  const onSubmit = (data: any) => {
    submit(data)
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <ItemHeader disabledEdit={false} loading={loading} />
        <Card className="flex flex-col justify-between pb-5">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
            {/* //TODO: image upload will replace ImageGalleryComponent */}
            <ImageGalleryComponent images={[image]} />
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
