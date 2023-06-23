import { yupResolver } from '@hookform/resolvers/yup'
import { memo, useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { FILE_TYPE } from '@/types/constants/files'

import useSystemDetail from '../../hooks/useSystemDetail'
import { useSystemSubmit } from '../../hooks/useSystemSubmit'
import type { SystemDetailFormType } from '../../types/form'
import Breadcrumbs from '../Breadcrumps'
import HeaderComponent from '../Header.comp'
import SystemFormComponent from './SystemForm.comp'
import { schema } from './SystemForm.schema'

const MemoizedGallery = memo(ImageGallery)

const SystemForm = () => {
  const { systemDetail, uid, disabledEdit } = useSystemDetail()

  const imageRef = useRef<ImageGalleryRef>()

  const { submit, loadingSubmit } = useSystemSubmit(imageRef)
  const formMethods = useForm<SystemDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...systemDetail
    }
  })
  const { setValue } = formMethods
  useEffect(() => {
    setValue('hasImageGalleryChanges', imageRef?.current?.hasChanges, { shouldDirty: imageRef?.current?.hasChanges })
  }, [imageRef, setValue])

  const { control, formState, handleSubmit } = formMethods
  const onSubmit = (data: any) => {
    // extract from data hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = data
    submit(rest)
  }
  useFormNotification<SystemDetailFormType>({ control })
  const FormWarningModal = useFormLeaveWarning({ formState })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        <HeaderComponent loading={loadingSubmit} />
        <Breadcrumbs parentPath={systemDetail?.parentPath} />
        <div className="py-6">
          <SystemFormComponent>
            <MemoizedGallery
              ref={imageRef}
              config={{ itemCategory: FILE_TYPE.CATALOGUE, itemId: String(uid) }}
              className="w-full"
              hasEditRole={!disabledEdit}
            />
          </SystemFormComponent>
        </div>
      </FormProvider>
      <FormWarningModal />
    </form>
  )
}

export default SystemForm
