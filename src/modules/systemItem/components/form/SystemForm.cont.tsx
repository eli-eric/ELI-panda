import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'
import useImageGallery from '@/hooks/useImageGallery'
import { FILE_TYPE } from '@/types/constants/files'
import { PATH } from '@/types/constants/paths'

import useSystemDetail from '../../hooks/useSystemDetail'
import { useSystemSubmit } from '../../hooks/useSystemSubmit'
import type { SystemDetailFormType } from '../../types/form'
import Breadcrumbs from '../Breadcrumps'
import HeaderComponent from '../Header.comp'
import SystemFormComponent from './SystemForm.comp'
import { schema } from './SystemForm.schema'

const SystemForm = () => {
  const { systemDetail, uid } = useSystemDetail()
  const router = useRouter()

  const {
    discard,
    hasChanges,
    submit: saveImages,
    renderGallery
  } = useImageGallery({
    itemCategory: FILE_TYPE.CATALOGUE,
    itemId: String(uid)
  })

  const saveImageAndRedirect = async (uid: string) => {
    await saveImages(uid)
    router.push(uid ? PATH.SYSTEM + '/' + uid : PATH.SYSTEMS)
  }

  const { submit, loadingSubmit } = useSystemSubmit({ onError: discard, onSuccess: saveImageAndRedirect })
  const formMethods = useForm<SystemDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...systemDetail
    }
  })

  const { setValue } = formMethods
  useEffect(() => {
    setValue('hasImageGalleryChanges', hasChanges, { shouldDirty: hasChanges })
  }, [hasChanges, setValue])

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
          <SystemFormComponent renderGallery={renderGallery} />
        </div>
      </FormProvider>
      <FormWarningModal />
    </form>
  )
}

export default SystemForm
