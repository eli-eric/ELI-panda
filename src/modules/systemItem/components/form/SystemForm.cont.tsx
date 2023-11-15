import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { memo, useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { FILE_TYPE } from '@/types/constants/files'

import { useParentSystemDetail } from '../../hooks/useParentSystemDetail'
import Breadcrumbs from '../Breadcrumps'
import HeaderComponent from '../Header.comp'
import { SystemMainForm } from './components/SystemMain.form'
import { schema } from './SystemForm.schema'

const MemoizedSystemGallery = memo(ImageGallery)

import { useRouter } from 'next/router'

import Card from '@/components/layout/Card'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import usePermission from '@/hooks/usePermission'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { ROLE } from '@/types/constants/roles'
import { SystemLevel } from '@/types/gql/graphql'
import { classNames } from '@/utils'

import { useSystemCreate } from '../../hooks/useSystemCreate'
import { useSystemUpdate } from '../../hooks/useSystemUpdate'
import type { SystemDetailFormType } from '../../types/form'
import { SystemItemCard } from './components/SystemItem.card'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const FormCard = ({ children, className }: CardProps) => (
  <div className={classNames('mx-auto max-w-7xl', className)}>{children}</div>
)

//TODO:  split to update and create form
export const SystemForm = () => {
  const { systemDetail } = useContext(SystemDetailContext)
  const hasEditRole = usePermission([ROLE.SYSTEM_EDIT])

  const router = useRouter()
  const uid = router.query.uid as string | undefined

  const { parentPath } = useParentSystemDetail()
  const systemImageRef = useRef<ImageGalleryRef>()

  const { updateSystem, loading } = useSystemUpdate(systemImageRef)
  const { createSystem, loading: createLoading } = useSystemCreate(systemImageRef)

  const formMethods = useForm<SystemDetailFormType>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...(systemDetail as SystemDetailFormType),
      responsible: systemDetail?.responsible
        ? { uid: systemDetail?.responsible?.uid, name: systemDetail?.responsible?.fullName as string }
        : undefined,
      zone: systemDetail?.zone ? { uid: systemDetail?.zone?.uid, name: systemDetail?.zone?.name as string } : undefined
    }
  })

  const systemLevel = formMethods.watch('systemLevel')

  const onSubmit = (data: SystemDetailFormType) => {
    // extract from data hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = data
    if (uid) {
      updateSystem(rest)
    }
    if (!uid) {
      createSystem(rest)
    }
  }

  return (
    <Form formMethods={formMethods} enableLeaveWarning={true}>
      <HeaderComponent loading={loading || createLoading} onSubmit={formMethods.handleSubmit(onSubmit)} />
      <Card>
        <Breadcrumbs parentPath={parentPath || (systemDetail?.parentPath as CodebookType[])} />
      </Card>
      <FormCard
        className={classNames(
          'shadow-md rounded-lg border',
          systemLevel === SystemLevel.KeySystems && 'bg-primary-100',
          systemLevel === SystemLevel.SubsystemsAndParts && 'bg-sky-100',
          systemLevel === SystemLevel.TechnologyUnit && 'bg-lime-100'
        )}
      >
        <SystemMainForm>
          <MemoizedSystemGallery
            ref={systemImageRef}
            setValue={formMethods.setValue}
            config={{ itemCategory: FILE_TYPE.SYSTEM, itemId: String(uid) }}
            className="w-full"
            hasEditRole={hasEditRole}
          />
        </SystemMainForm>
        {systemDetail?.physicalItem && <SystemItemCard />}
      </FormCard>
      <DevTool control={formMethods.control} />
    </Form>
  )
}
