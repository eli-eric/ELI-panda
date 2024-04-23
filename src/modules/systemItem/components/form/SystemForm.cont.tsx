import { DevTool } from '@hookform/devtools'
import { yupResolver } from '@hookform/resolvers/yup'
import { memo, useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'

import { useParentSystemDetail } from '../../hooks/useParentSystemDetail'
import Breadcrumbs from '../Breadcrumps'
import { SystemMainForm } from './components/SystemMain.form'
import { schema } from './SystemForm.schema'

const MemoizedSystemGallery = memo(ImageGallery)

import { useRouter } from 'next/router'

import CheckBox from '@/components/form/CheckBox'
import { Input } from '@/components/form/Input'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import usePermission from '@/hooks/usePermission'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { ROLE } from '@/types/constants/roles'
import type { SystemLevel } from '@/types/gql/graphql'
import { classNames } from '@/utils'

import { useSystemCreate } from '../../hooks/useSystemCreate'
import { useSystemUpdate } from '../../hooks/useSystemUpdate'
import type { SystemDetailFormType } from '../../types/form'
import { getColorBySystemLevel } from '../../utils'
import { SystemItemCard } from './components/SystemItem.card'
import useSystemEditFormFields from './SystemForm.fields'
import { AssignPhysicalItem } from '../AssignPhysicalItem'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'

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
  const fields = useSystemEditFormFields()

  const router = useRouter()
  const uid = router.query.uid as string | undefined

  const { parentPath } = useParentSystemDetail()
  const systemImageRef = useRef<ImageGalleryRef>()

  const { updateSystem, loading } = useSystemUpdate(
    systemImageRef,
    systemDetail?.physicalItem?.uid
  )
  const { createSystem, loading: createLoading } =
    useSystemCreate(systemImageRef)

  const formMethods = useForm<SystemDetailFormType>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      ...(systemDetail as SystemDetailFormType),
      responsible: systemDetail?.responsible
        ? {
            uid: systemDetail?.responsible?.uid,
            name: systemDetail?.responsible?.fullName as string
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

  const systemLevel = formMethods.watch('systemLevel')

  const physicalItem = formMethods.watch('physicalItem')

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
      />
      <Card>
        <Breadcrumbs
          parentPath={
            parentPath || (systemDetail?.parentPath as CodebookType[])
          }
        />
      </Card>
      <FormCard
        className={classNames(
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
                itemId: systemDetail?.physicalItem?.catalogueItem?.uid
              }
            }}
            className="w-full"
            hasEditRole={hasEditRole}
          />
        </SystemMainForm>
        {physicalItem && <SystemItemCard />}
        <Card className="border-t border-gray-400">
          <Grid>
            <Col sm={1} md={3} lg={2}>
              <Input
                step={1}
                type="number"
                defaultValue={''}
                {...fields.minimalSpareParstCount}
              />
            </Col>
            <Col sm={1} md={1} lg={2}>
              <CheckBox
                {...fields.isCritical}
                label="Is critical"
                className="items-end pb-2"
              />
            </Col>
            <Col sm={1} md={2} lg={8} className="flex justify-end">
              {!systemDetail?.physicalItem && uid && <AssignPhysicalItem />}
            </Col>
          </Grid>
        </Card>
      </FormCard>
      <DevTool control={formMethods.control} />
    </Form>
  )
}
