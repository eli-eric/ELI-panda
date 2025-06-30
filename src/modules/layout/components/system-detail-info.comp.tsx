import { type FC } from 'react'

import ProgressBarComponent from '@/components/progress-bar.comp'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'

import { CatalogueItemSection } from './sections/CatalogueItemSection.comp'
import { ItemPropertiesSection } from './sections/ItemPropertiesSection.comp'
import { OrderInformationSection } from './sections/OrderInformationSection.comp'
import { PhysicalItemSection } from './sections/PhysicalItemSection.comp'
import { ServiceItemsSection } from './sections/ServiceItemsSection.comp'
import { SparePartsCoverageSection } from './sections/SparePartsCoverageSection.comp'
import { SubsystemsSection } from './sections/SubsystemsSection.comp'
import { SystemHierarchySection } from './sections/SystemHierarchySection.comp'
import { SystemInformationSection } from './sections/SystemInformationSection.comp'

type Props = {
  alias?: string
}

export const SystemDetailInfo: FC<Props> = ({ alias }) => {
  const { loading, error, systemDetail, physicalItem, catalogueItem } =
    useSystemDetail({
      alias
    })

  const serviceItems = physicalItem?.serviceItemsConnection?.edges || []

  // Use the custom hook for processing properties data
  const { groupedProperties, hasOverriddenProperties, hasProperties } =
    useItemPropertiesData({
      catalogueItem: physicalItem?.catalogueItem,
      serviceItems
    })

  if (loading) {
    return <ProgressBarComponent />
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 dark:text-red-400">
          Failed to load system information
        </p>
      </div>
    )
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
                    itemId: catalogueItem.uid
                  }
                : undefined
            }}
            hasEditRole={false}
            allowMultipleImages={true}
            disabled={true}
          />
        </div>
      )}

      {/* System Information */}
      {systemDetail && <SystemInformationSection systemDetail={systemDetail} />}

      {/* Physical Item Information */}
      {physicalItem && <PhysicalItemSection physicalItem={physicalItem} />}

      {/* Catalogue Item Information */}
      {catalogueItem?.uid && (
        <CatalogueItemSection catalogueItem={catalogueItem} />
      )}

      {/* Item Properties */}
      {catalogueItem && physicalItem && hasProperties && (
        <ItemPropertiesSection
          groupedProperties={groupedProperties}
          hasOverriddenProperties={hasOverriddenProperties}
          hasProperties={hasProperties}
        />
      )}

      {/* Service Items */}
      {serviceItems.length > 0 && (
        <ServiceItemsSection serviceItems={serviceItems} />
      )}

      {/* System Hierarchy */}
      {systemDetail && <SystemHierarchySection systemDetail={systemDetail} />}

      {/* Order Information */}
      {physicalItem && <OrderInformationSection physicalItem={physicalItem} />}

      {/* Spare Parts Coverage */}
      {systemDetail && (
        <SparePartsCoverageSection systemDetail={systemDetail} />
      )}

      {/* Subsystems */}
      {systemDetail && <SubsystemsSection systemDetail={systemDetail} />}
    </div>
  )
}
