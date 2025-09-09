import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { memo, useRef } from 'react'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { ROLE } from '@/types/constants/roles'
import { SystemLevel } from '@/types/gql/graphql'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import { useSuspenseSystemDetail } from '@/modules/systemItem/hooks/useSuspenseSystemDetail'
import { useSystemSheetUpdate } from '@/modules/shared/system/system-edit/hooks/useSystemSheetUpdate'
import { SystemDetailSection } from './sections/system-detail.section'
import { PhysicalItemSheetSection } from './sections/PhysicalItemSheetSection.comp'
import { SystemHierarchy } from '../../system-create/components/SystemHierarchy.comp'
import { systemCreateSchema } from '../../system-create/schema'
import { ItemPropertiesSection } from '../../device-info-overlay/components/sections/ItemPropertiesSection.comp'
import { OrderInformationSection } from '../../device-info-overlay/components/sections/OrderInformationSection.comp'
import { SparePartsCoverageSection } from '../../device-info-overlay/components/sections/SparePartsCoverageSection.comp'
import { SubsystemsSection } from '../../device-info-overlay/components/sections/SubsystemsSection.comp'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'

const MemoizedImageGallery = memo(ImageGallery)

export const SystemEditForm = ({ uid }: { uid: string }) => {
  const { systemDetail, physicalItem, catalogueItem } = useSuspenseSystemDetail(
    { uid }
  )
  const parentPath = systemDetail?.parentPath || []
  const systemImageRef = useRef<ImageGalleryRef | undefined>(undefined)
  const serviceItems = physicalItem?.serviceItemsConnection?.edges || []
  const { groupedProperties, hasOverriddenProperties, hasProperties } =
    useItemPropertiesData({
      catalogueItem: physicalItem?.catalogueItem,
      serviceItems
    })

  const formMethods = useForm<any>({
    resolver: zodResolver(systemCreateSchema),
    mode: 'onSubmit',
    defaultValues: {
      ...systemDetail,
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
        : undefined,
      location: systemDetail?.location
        ? {
            uid: systemDetail?.location?.uid,
            name:
              systemDetail?.location?.name +
              ' (' +
              systemDetail?.location?.code +
              ')',
            code: systemDetail?.location?.code
          }
        : undefined,
      systemLevel: systemDetail?.systemLevel
    }
  })

  const { updateSystem, loading } = useSystemSheetUpdate({
    uid,
    imageRef: systemImageRef,
    physicalItemUid: physicalItem?.uid
  })

  const onSubmit = (data: any) => {
    updateSystem(data, true)
  }

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} className="space-y-4">
      <SheetFormButtons
        editRole={ROLE.SYSTEM_EDIT}
        loading={loading}
        onSubmit={formMethods.handleSubmit(onSubmit)}
        isFormDirty={formMethods.formState.isDirty}
      />
      {parentPath && parentPath.length > 0 && (
        <SystemHierarchy
          parentPath={parentPath.filter(
            (p: any): p is Exclude<typeof p, null> => p !== null
          )}
          currentSystemName={systemDetail?.name || 'System'}
          currentSystemLevel={
            systemDetail?.systemLevel || ('OTHER' as SystemLevel)
          }
        />
      )}
      <MemoizedImageGallery
        ref={systemImageRef}
        setValue={formMethods.setValue}
        config={{
          itemCategory: FILE_TYPE.SYSTEM,
          itemId: uid
        }}
        className="w-full"
        hasEditRole={true}
      />
      <SystemDetailSection />
      {physicalItem && (
        <PhysicalItemSheetSection
          physicalItem={physicalItem}
          catalogueItem={catalogueItem}
        />
      )}
      {catalogueItem && physicalItem && hasProperties && (
        <ItemPropertiesSection
          groupedProperties={groupedProperties}
          hasOverriddenProperties={hasOverriddenProperties}
          hasProperties={hasProperties}
        />
      )}
      {physicalItem && (
        <OrderInformationSection
          physicalItem={physicalItem}
          serviceItems={serviceItems}
        />
      )}
      {systemDetail &&
        (systemDetail?.sparePartsFor?.length > 0 ||
          systemDetail?.sparePartsConnection?.edges?.length > 0) && (
          <SparePartsCoverageSection systemDetail={systemDetail} />
        )}
      {systemDetail && <SubsystemsSection systemDetail={systemDetail} />}
    </Form>
  )
}
