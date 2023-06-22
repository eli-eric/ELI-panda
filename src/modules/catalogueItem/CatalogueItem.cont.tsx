import { DevTool } from '@hookform/devtools'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormProvider } from 'react-hook-form'

import ErrorPage from '@/components/error/ErrorPage'
import { TextArea } from '@/components/form/Input'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import useImageGallery from '@/hooks/useImageGallery'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/types/constants/files'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import DefaultItemForm from './components/form/DefaultItemForm'
import Groups from './components/form/Groups'
import ItemHeader from './components/header/Header.comp'
import useItemForm from './hooks/useItemForm'
import useItemSubmit from './hooks/useItemSubmit'
import type { CatalogueItem } from './types/responses'

const CatalogueItemContainer = () => {
  const { query, replace, back } = useRouter()
  const queryUID = query.uid as string | undefined
  const disabledEdit = !usePermission([ROLE.CATALOGUE_EDIT])

  const {
    discard,
    hasChanges,
    submit: saveImages,
    renderGallery
  } = useImageGallery({
    itemCategory: FILE_TYPE.CATALOGUE,
    itemId: String(queryUID)
  })
  const { FormWarningModal, ...formMethods } = useItemForm({ onWarnConfirm: discard })

  const saveImageAndRedirect = async (uid: string) => {
    await saveImages(uid)
    if (queryUID) {
      back()
    } else {
      replace(PATH.CATALOGUE_ITEM + '/' + uid)
    }
  }

  const { setValue } = formMethods
  useEffect(() => {
    setValue('hasImageGalleryChanges', hasChanges, { shouldDirty: hasChanges })
  }, [hasChanges, setValue])

  const { submit, loading } = useItemSubmit({ onError: discard, onSuccess: saveImageAndRedirect })

  const onSubmit = (data: any) => {
    // extract from data hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = data
    submit(rest as CatalogueItem)
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <ItemHeader disabledEdit={false} loading={loading} />
        <Card className="flex flex-col justify-between pb-5">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
            <div className="relative h-full">
              {renderGallery({ className: 'lg:absolute lg:inset-0 pt-6 pl-6', hasEditRole: true })}
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

export default CatalogueItemContainer
