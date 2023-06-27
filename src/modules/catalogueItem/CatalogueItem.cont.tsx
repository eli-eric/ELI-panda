import { DevTool } from '@hookform/devtools'
import { useRouter } from 'next/router'
import { memo, useRef } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormProvider } from 'react-hook-form'

import ErrorPage from '@/components/error/ErrorPage'
import { TextArea } from '@/components/form/Input'
import Card from '@/components/layout/Card'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/types/constants/files'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import { ImageGallery } from '../shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '../shared/imageManager/types'
import DefaultItemForm from './components/form/DefaultItemForm'
import Groups from './components/form/Groups'
import ItemHeader from './components/header/Header.comp'
import useItemForm from './hooks/useItemForm'
import useItemSubmit from './hooks/useItemSubmit'
import type { CatalogueItem } from './types/responses'

const MemoizedGallery = memo(ImageGallery)
const MemoizedGroups = memo(Groups)

const CatalogueItemContainer = () => {
  const { query } = useRouter()
  const queryUID = query.uid as string | undefined
  const disabledEdit = !usePermission([ROLE.CATALOGUE_EDIT])

  const imageRef = useRef<ImageGalleryRef>()
  const { FormWarningModal, ...formMethods } = useItemForm()
  const { submit, loading } = useItemSubmit(imageRef)

  const onSubmit = (data: any) => {
    // extract from data hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = data
    submit(rest as CatalogueItem)
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <ItemHeader disabledEdit={disabledEdit} loading={loading} />
        <Card className="flex flex-col justify-between pb-5">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
            <MemoizedGallery
              ref={imageRef}
              config={{ itemCategory: FILE_TYPE.CATALOGUE, itemId: String(queryUID) }}
              className="relative h-full max-h-56 mt-6 pl-6 "
              hasEditRole={!disabledEdit}
            />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-2">
              <DefaultItemForm />
            </div>
          </div>
          <TextArea name="description" label={'Description'} rounded={'rounded-md'} className={'px-4 py-5 sm:px-6'} />
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense>
              <MemoizedGroups />
            </Suspense>
          </ErrorBoundary>
          <FormWarningModal />
          {queryUID && (
            <ErrorBoundary fallback={<ErrorPage />}>
              <Suspense>
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

export default CatalogueItemContainer
