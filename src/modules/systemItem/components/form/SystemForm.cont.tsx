import { yupResolver } from '@hookform/resolvers/yup'
import { memo, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { DeleteButton } from '@/components/Buttons'
import Card from '@/components/layout/Card'
import Heading from '@/components/layout/Heading'
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

  const systemImageRef = useRef<ImageGalleryRef>()

  const { submit, loadingSubmit } = useSystemSubmit(systemImageRef)

  const formMethods = useForm<SystemDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: systemDetail
  })
  formMethods.setValue
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
        <Card>
          <Heading customText="System" />
          <SystemFormComponent>
            <MemoizedGallery
              ref={systemImageRef}
              setValue={formMethods.setValue}
              config={{ itemCategory: FILE_TYPE.CATALOGUE, itemId: String(uid) }}
              className="w-full"
              hasEditRole={!disabledEdit}
            />
          </SystemFormComponent>
          <Heading customText="Physical Item">
            <DeleteButton />
          </Heading>
          {/* Item form with modal tree grid */}
        </Card>
      </FormProvider>
      <FormWarningModal />
    </form>
  )
}

export default SystemForm
