import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { SheetFormButtons } from '@/components/sheet-form-buttons'
import { useFormDirtyProtection } from '@/hooks/useFormDirtyProtection'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'
import {
    SystemEditRestrictionBanner,
    useSystemEditPermission,
} from '@/modules/shared/system/edit-permission'
import { useSystemSheetUpdate } from '@/modules/shared/system/system-edit/hooks/useSystemSheetUpdate'
import { useSuspenseSystemDetail } from '@/modules/systemItem/hooks/useSuspenseSystemDetail'
import { useModalFormStateStore } from '@/store/useModalFormStateStore'
import { ROLE } from '@/types/constants/roles'
import { SystemLevel } from '@/types/gql/graphql'

import { ItemPropertiesSection } from '../../device-info-overlay/components/sections/ItemPropertiesSection.comp'
import { OrderInformationSection } from '../../device-info-overlay/components/sections/OrderInformationSection.comp'
import { SparePartsCoverageSection } from '../../device-info-overlay/components/sections/SparePartsCoverageSection.comp'
import { SubsystemsSection } from '../../device-info-overlay/components/sections/SubsystemsSection.comp'
import { SystemHierarchy } from '../../system-create/components/SystemHierarchy.comp'
import { systemUpdateSchema } from '../../system-create/schema'
import { PhysicalItemSection } from './sections/PhysicalItemSection.comp'
import { SystemDetailSection } from './sections/system-detail.section'

const MemoizedImageGallery = memo(ImageGallery)

export const SystemEditForm = ({ uid, onClose }: { uid: string; onClose?: () => void }) => {
    const { systemDetail, physicalItem, catalogueItem, refetch } = useSuspenseSystemDetail({ uid })
    const parentPath = systemDetail?.parentPath || []
    const systemImageRef = useRef<ImageGalleryRef | undefined>(undefined)
    const serviceItems = physicalItem?.serviceItemsConnection?.edges || []
    const { groupedProperties, hasOverriddenProperties, hasProperties } = useItemPropertiesData({
        catalogueItem: physicalItem?.catalogueItem,
        serviceItems,
    })

    const defaultValues = {
        ...systemDetail,
        physicalItem: physicalItem
            ? {
                  ...physicalItem,
                  conditionStatus: physicalItem.conditionStatus,
                  itemUsage: physicalItem.itemUsage,
                  notes: physicalItem.notes,
                  serialNumber: physicalItem.serialNumber,
              }
            : undefined,
        responsible:
            systemDetail?.responsible && systemDetail?.responsible?.fullName
                ? {
                      uid: systemDetail?.responsible?.uid,
                      name: systemDetail?.responsible?.fullName,
                  }
                : undefined,
        zone: systemDetail?.zone
            ? {
                  uid: systemDetail?.zone?.uid,
                  name: systemDetail?.zone?.name as string,
              }
            : undefined,
        location: systemDetail?.location
            ? {
                  uid: systemDetail?.location?.uid,
                  name: systemDetail?.location?.name + ' (' + systemDetail?.location?.code + ')',
                  code: systemDetail?.location?.code,
              }
            : undefined,
        systemLevel: systemDetail?.systemLevel || SystemLevel.SubsystemsAndParts,
    }

    const formMethods = useForm<any>({
        resolver: zodResolver(systemUpdateSchema),
        mode: 'onSubmit',
        defaultValues,
    })

    const { updateSystem, loading } = useSystemSheetUpdate({
        uid,
        imageRef: systemImageRef,
        physicalItemUid: physicalItem?.uid,
    })

    const {
        canEdit,
        status: editStatus,
        responsibles,
        refetch: refetchPermission,
    } = useSystemEditPermission(uid)

    const { withDirtyProtection } = useFormDirtyProtection(formMethods)
    const { setIsDirty, reset } = useModalFormStateStore()

    // Sync form dirty state with global modal store
    useEffect(() => {
        setIsDirty(formMethods.formState.isDirty)
        return reset
    }, [reset, formMethods.formState.isDirty, setIsDirty])

    return (
        <Form formMethods={formMethods} className="space-y-4">
            <SheetFormButtons
                editRole={ROLE.SYSTEM_EDIT}
                canEdit={canEdit}
                loading={loading}
                onSubmit={formMethods.handleSubmit(updateSystem)}
                onExit={onClose}
                isFormDirty={formMethods.formState.isDirty}
                saveLabel="Save System"
                loadingText="Saving system..."
            />
            <SystemEditRestrictionBanner
                status={editStatus}
                responsibles={responsibles}
                refetch={refetchPermission}
            />
            <MemoizedImageGallery
                ref={systemImageRef}
                setValue={formMethods.setValue}
                config={{
                    itemCategory: FILE_TYPE.SYSTEM,
                    itemId: uid,
                    additionalParams: catalogueItem?.uid
                        ? {
                              itemCategory: FILE_TYPE.CATALOGUE,
                              itemId: catalogueItem?.uid,
                          }
                        : undefined,
                }}
                className="w-full"
            />
            {parentPath && parentPath.length > 0 && (
                <SystemHierarchy
                    parentPath={parentPath.filter(
                        (p: any): p is Exclude<typeof p, null> => p !== null,
                    )}
                    currentSystemName={systemDetail?.name || 'System'}
                    currentSystemLevel={systemDetail?.systemLevel || ('OTHER' as SystemLevel)}
                    withDirtyProtection={withDirtyProtection}
                />
            )}
            <SystemDetailSection uid={uid} canEdit={canEdit} />
            {physicalItem && (
                <PhysicalItemSection
                    physicalItem={physicalItem}
                    catalogueItem={catalogueItem}
                    canEdit={canEdit}
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
                <OrderInformationSection physicalItem={physicalItem} serviceItems={serviceItems} />
            )}
            {/* Spare assignment is intentionally NOT gated by canEdit — it is a
                distinct workflow (own feature flag `enableSparePartsAssignment`, and
                the assign write is REST, backend-403-guarded), allowed regardless of
                per-system edit responsibility. */}
            {systemDetail &&
                (systemDetail?.sparePartsFor?.length > 0 ||
                    systemDetail?.sparePartsConnection?.edges?.length > 0) && (
                    <SparePartsCoverageSection
                        systemDetail={systemDetail}
                        withDirtyProtection={withDirtyProtection}
                        onSpareAssigned={refetch}
                    />
                )}
            {systemDetail && (
                <SubsystemsSection
                    systemDetail={systemDetail}
                    withDirtyProtection={withDirtyProtection}
                />
            )}
        </Form>
    )
}
