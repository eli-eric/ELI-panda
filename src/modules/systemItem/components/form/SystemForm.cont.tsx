import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { memo, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { FILE_TYPE } from '@/types/constants/files'

import { useParentSystemDetail } from '../../hooks/useParentSystemDetail'
import { useSystemDetail } from '../../hooks/useSystemDetail'
import { useSystemSubmit } from '../../hooks/useSystemSubmit'
import Breadcrumbs from '../Breadcrumps'
import HeaderComponent from '../Header.comp'
import { SystemMainForm } from './components/SystemMain.form'
import { schema } from './SystemForm.schema'

const MemoizedSystemGallery = memo(ImageGallery)

import Card from '@/components/layout/Card'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { classNames } from '@/utils'

import { SystemItemCard } from './components/SystemItem.card'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const FormCard = ({ children, className }: CardProps) => (
  <div className={classNames('mx-auto max-w-7xl', className)}>{children}</div>
)

export const SystemForm = () => {
  const { systemDetail, uid, disabledEdit } = useSystemDetail()
  //const cataloguePermission = usePermission([ROLE.CATALOGUE_EDIT])

  const { parentUid, parentPath } = useParentSystemDetail()

  const systemImageRef = useRef<ImageGalleryRef>()

  const { submit, loadingSubmit } = useSystemSubmit(systemImageRef)

  //TODO: typing
  const formMethods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: systemDetail
  })

  const onSubmit = (data: any) => {
    // extract from data hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = data
    submit({ ...rest, parentUid })
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} enableLeaveWarning={true}>
      <HeaderComponent loading={loadingSubmit} />
      <Card>
        <Breadcrumbs parentPath={parentPath || (systemDetail?.parentPath as CodebookType[])} />
      </Card>
      <FormCard className="bg-sky-100 shadow-md rounded-lg border">
        <SystemMainForm>
          <MemoizedSystemGallery
            ref={systemImageRef}
            setValue={formMethods.setValue}
            config={{ itemCategory: FILE_TYPE.SYSTEM, itemId: String(uid) }}
            className="w-full"
            hasEditRole={!disabledEdit}
          />
        </SystemMainForm>
        <SystemItemCard />
      </FormCard>
      <DevTool control={formMethods.control} />
    </Form>
  )
}
