import { type FC } from 'react'
import { useIntl } from 'react-intl'

import ProgressBarComponent from '@/components/progress-bar.comp'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
import { message } from '@/i18n/src/messages'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import { useSuspenseSystemDetail } from '@/modules/systemItem/hooks/useSuspenseSystemDetail'

import { ItemPropertiesSection } from './sections/ItemPropertiesSection.comp'
import { NotFound } from './sections/NotFound'
import { OrderInformationSection } from './sections/OrderInformationSection.comp'
import { PhysicalItemSection } from './sections/PhysicalItemSection.comp'
import { SparePartsCoverageSection } from './sections/SparePartsCoverageSection.comp'
import { SubsystemsSection } from './sections/SubsystemsSection.comp'
import { SystemHierarchySection } from './sections/SystemHierarchySection.comp'
import { SystemInformationSection } from './sections/SystemInformationSection.comp'

type Props = {
    alias?: string
    uid?: string
}

export const SystemDetailInfo: FC<Props> = ({ alias, uid }) => {
    const { formatMessage: fm } = useIntl()
    const { loading, error, systemDetail, physicalItem, catalogueItem } = useSuspenseSystemDetail({
        code: alias,
        uid,
    })

    const serviceItems = physicalItem?.serviceItemsConnection?.edges || []

    // Use the custom hook for processing properties data
    const { groupedProperties, hasOverriddenProperties, hasProperties } = useItemPropertiesData({
        catalogueItem: physicalItem?.catalogueItem,
        serviceItems,
    })

    if (loading) {
        return <ProgressBarComponent />
    }

    if (error) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-600 dark:text-red-400">
                    {fm({ id: message.common.systemOverlay.failedToLoad })}
                </p>
            </div>
        )
    }

    // Check if no system was found (not loading, no error, but no systemDetail)
    if (!systemDetail) {
        return <NotFound code={alias || 'Unknown System Code'} />
    }

    return (
        <div className="space-y-4">
            {/* Image Gallery */}
            {systemDetail?.uid && (
                <div className="mb-4">
                    <ImageGallery
                        config={{
                            itemCategory: FILE_TYPE.SYSTEM,
                            itemId: systemDetail.uid,
                            fileCategory: 'image',
                            additionalParams: catalogueItem?.uid
                                ? {
                                      itemCategory: FILE_TYPE.CATALOGUE,
                                      itemId: catalogueItem.uid,
                                  }
                                : undefined,
                        }}
                        hasEditRole={false}
                        allowMultipleImages={true}
                        disabled={true}
                    />
                </div>
            )}

            {/* System Hierarchy */}
            {systemDetail && <SystemHierarchySection systemDetail={systemDetail} />}
            {/* System Information */}
            {systemDetail && <SystemInformationSection systemDetail={systemDetail} />}

            {/* Physical Item Information */}
            {physicalItem && (
                <PhysicalItemSection physicalItem={physicalItem} catalogueItem={catalogueItem} />
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

            {systemDetail &&
                (systemDetail?.sparePartsFor.length > 0 ||
                    systemDetail.sparePartsConnection.edges.length > 0) && (
                    <SparePartsCoverageSection systemDetail={systemDetail} />
                )}

            {/* Subsystems */}
            {systemDetail && <SubsystemsSection systemDetail={systemDetail} />}
        </div>
    )
}
