import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { Fragment, memo, useRef } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'

import Card from '@/components/layout/Card'
import Heading from '@/components/layout/Heading'
import { useFormLeaveWarning } from '@/hooks/form/useFormLeaveWarning'
import useFormNotification from '@/hooks/form/useFormNotification'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { FILE_TYPE } from '@/types/constants/files'
import { PATH } from '@/types/constants/paths'

import { useParentSystemDetail } from '../../hooks/useParentSystemDetail'
import { useSystemDetail } from '../../hooks/useSystemDetail'
import { useSystemSubmit } from '../../hooks/useSystemSubmit'
import type { SystemDetailFormType } from '../../types/form'
import Breadcrumbs from '../Breadcrumps'
import HeaderComponent from '../Header.comp'
import { SystemItemSearchButton } from '../SystemItemSearchButton'
import { PhysicalItemForm } from './PhysicalItemForm.comp'
import SystemFormComponent from './SystemForm.comp'
import { schema } from './SystemForm.schema'

const MemoizedSystemGallery = memo(ImageGallery)

const SystemForm = () => {
  const { systemDetail, uid, disabledEdit } = useSystemDetail()
  //const cataloguePermission = usePermission([ROLE.CATALOGUE_EDIT])

  const { parentUid, parentPath } = useParentSystemDetail()

  const systemImageRef = useRef<ImageGalleryRef>()

  const { submit, loadingSubmit } = useSystemSubmit(systemImageRef)

  const formMethods = useForm<SystemDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: systemDetail
  })

  const { control, formState, handleSubmit } = formMethods
  const physicalItem = useWatch({ control, name: 'physicalItem' })

  const onSubmit = (data: any) => {
    // extract from data hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = data
    submit({ ...rest, parentUid })
  }
  useFormNotification<SystemDetailFormType>({ control })
  const FormWarningModal = useFormLeaveWarning({ formState })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        <HeaderComponent loading={loadingSubmit} />
        <Breadcrumbs parentPath={parentPath || systemDetail?.parentPath} />
        <Card>
          <Heading customText="System">
            <SystemItemSearchButton />
          </Heading>
          <SystemFormComponent>
            <MemoizedSystemGallery
              ref={systemImageRef}
              setValue={formMethods.setValue}
              config={{ itemCategory: FILE_TYPE.SYSTEM, itemId: String(uid) }}
              className="w-full"
              hasEditRole={!disabledEdit}
            />
          </SystemFormComponent>
          {physicalItem && (
            <Fragment>
              <Heading customText="Physical Item">
                <Link href={PATH.CATALOGUE_ITEM + '/' + physicalItem.catalogueItem.uid} target={'_blank'}>
                  View
                </Link>
              </Heading>
              <PhysicalItemForm>
                <MemoizedSystemGallery
                  ref={systemImageRef}
                  setValue={formMethods.setValue}
                  config={{
                    itemCategory: FILE_TYPE.CATALOGUE,
                    itemId: physicalItem?.catalogueItem?.uid
                  }}
                  className="w-full"
                  hasEditRole={false}
                />
              </PhysicalItemForm>
            </Fragment>
          )}
        </Card>
      </FormProvider>
      <FormWarningModal />
      <DevTool control={control} />
    </form>
  )
}

export default SystemForm
