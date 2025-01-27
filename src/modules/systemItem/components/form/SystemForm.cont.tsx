import { yupResolver } from '@hookform/resolvers/yup'
import type { FC, PropsWithChildren } from 'react'
import { memo, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'

import Breadcrumbs from '../Breadcrumps'
import { SystemMainForm } from './components/SystemMain.form'
import { schema } from './SystemForm.schema'

const MemoizedSystemGallery = memo(ImageGallery)

import { useRouter } from 'next/router'

import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card, { FormCard } from '@/components/layout/Card'
import usePermission from '@/hooks/usePermission'
import { GraphModalButton } from '@/modules/shared/system/GraphModalButton'
import { ROLE } from '@/types/constants/roles'
import type { SystemLevel } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'
import { cx } from '@/utils'

import { useSystemCreate } from '../../hooks/useSystemCreate'
import { useSystemDetail } from '../../hooks/useSystemDetail'
import { useSystemParent } from '../../hooks/useSystemParent'
import { useSystemUpdate } from '../../hooks/useSystemUpdate'
import type { SystemDetailFormType } from '../../types/form'
import { getColorBySystemLevel } from '../../utils'
import { ShowHistoryButton } from '../history/ShowHistoryButton'
import { SystemItemCard } from './components/SystemItem.card'

//TODO:  split to update and create form
export const SystemForm: FC<PropsWithChildren> = ({ children }) => {
  const { systemDetail, catalogueItem } = useSystemDetail()
  const hasEditRole = usePermission([ROLE.SYSTEM_EDIT])
  const { parentPath, parentSystem } = useSystemParent()

  const {
    sparePartsConnection, // eslint-disable-line @typescript-eslint/no-unused-vars
    sparePartsCoverageSum, // eslint-disable-line @typescript-eslint/no-unused-vars
    sparePartsFor, // eslint-disable-line @typescript-eslint/no-unused-vars
    subSystems, // eslint-disable-line @typescript-eslint/no-unused-vars
    __typename, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...rest
  } = systemDetail || {}

  const router = useRouter()
  const uid = router.query.uid as string | undefined

  const systemImageRef = useRef<ImageGalleryRef>()

  const { updateSystem, loading } = useSystemUpdate(
    systemImageRef,
    systemDetail?.physicalItem?.uid
  )
  const { createSystem, loading: createLoading } =
    useSystemCreate(systemImageRef)

  const formMethods = useForm<any>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      ...rest,
      responsible:
        systemDetail?.responsible && systemDetail?.responsible?.fullName
          ? {
              uid: systemDetail?.responsible?.uid,
              name: systemDetail?.responsible?.fullName
            }
          : undefined,
      zone: systemDetail?.zone
        ? {
            uid: systemDetail?.zone?.uid,
            name: systemDetail?.zone?.name as string
          }
        : undefined
    }
  })

  // set default values for responsible, zone and location
  useEffect(() => {
    if (parentSystem) {
      parentSystem.responsible &&
        formMethods.setValue('responsible', {
          uid: parentSystem.responsible?.uid,
          name: parentSystem.responsible?.fullName
        })
      parentSystem.zone &&
        formMethods.setValue('zone', {
          uid: parentSystem.zone?.uid,
          name: parentSystem.zone?.name as string
        })
      parentSystem.location &&
        formMethods.setValue('location', {
          uid: parentSystem.location?.uid,
          name: parentSystem.location?.name as string
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentSystem])

  const systemLevel = formMethods.watch('systemLevel')
  const onSubmit = (data: SystemDetailFormType) => {
    // extract from data hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = data
    if (uid) {
      updateSystem(rest, false)
    }
    if (!uid) {
      createSystem(rest, false)
    }
  }

  const onSubmitAndExit = (data: SystemDetailFormType) => {
    // extract from data hasImageGalleryChanges
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hasImageGalleryChanges, ...rest } = data
    if (uid) {
      updateSystem(rest, true)
    }
    if (!uid) {
      createSystem(rest, true)
    }
  }

  return (
    <Form
      className="relative"
      formMethods={formMethods}
      enableLeaveWarning={true}
    >
      <HeaderWithButtons
        loading={loading || createLoading}
        editRole={ROLE.SYSTEM_EDIT}
        onSubmit={formMethods.handleSubmit(onSubmit)}
        onSubmitAndExit={formMethods.handleSubmit(onSubmitAndExit)}
        customElement={
          <div className="flex gap-2">
            <GraphModalButton uid={uid} />
            <ShowHistoryButton />
          </div>
        }
      />
      <Card>
        <Breadcrumbs
          parentPath={
            (systemDetail?.parentPath as CodebookType[]) || parentPath
          }
        />
      </Card>
      <FormCard
        className={cx(
          'shadow-md rounded-lg border',
          getColorBySystemLevel(systemLevel as SystemLevel)
        )}
      >
        <SystemMainForm>
          <MemoizedSystemGallery
            ref={systemImageRef}
            setValue={formMethods.setValue}
            config={{
              itemCategory: FILE_TYPE.SYSTEM,
              itemId: String(uid),
              additionalParams: {
                itemCategory: FILE_TYPE.CATALOGUE,
                itemId: catalogueItem?.uid
              }
            }}
            className="w-full"
            hasEditRole={hasEditRole}
          />
        </SystemMainForm>
        {uid && <SystemItemCard />}
      </FormCard>
      {children}
    </Form>
  )
}
