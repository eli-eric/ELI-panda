import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Paragraph } from '@/components/layout/Paragraph'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { DetailParameter } from '@/components/ui/detail-parameter'
import ItemPropertiesViewer from '@/components/ui/ItemPropertiesViewer'
import { Label } from '@/components/ui/label'
import usePermission from '@/hooks/usePermission'
import FileManager from '@/modules/shared/fileManager/FileManager'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { useItemProperties } from '@/modules/systemItem/hooks/useItemProperties'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { ROLE } from '@/types/constants/roles'

import useSystemFormFields from '../SystemForm.fields'
import { ItemProperties } from './ItemProperties'
import { OrderInformation } from './orderInfo/OrderInformation'

export const PhysicalItemForm = ({ uid }: { uid: string }) => {
  const fields = useSystemFormFields()

  const { catalogueItem, physicalItem, systemDetail } = useSystemDetail()

  const { data: properties } = useItemProperties(uid)

  const description = catalogueItem?.description
  const canEdit = usePermission([ROLE.SYSTEM_EDIT])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-2">
        <DetailParameter
          title="Part Number"
          value={catalogueItem?.catalogueNumber}
        />
        <DetailParameter
          title="Supplier"
          value={catalogueItem?.supplier?.name}
        />
        <DetailParameter title="EUN" value={physicalItem?.eun} />
      </div>
      {description && (
        <div className="space-y-2">
          <Label>Description</Label>
          <Paragraph>{description}</Paragraph>
        </div>
      )}
      <Input {...fields.serialNumber} />

      <ItemPropertiesViewer
        catalogueItem={physicalItem?.catalogueItem}
        serviceItems={physicalItem?.serviceItemsConnection.edges}
      />

      <ItemProperties properties={properties} />

      <Listbox {...fields.itemUsage} />
      <Listbox {...fields.itemConditionStatus} />

      <TextArea {...fields.itemNotes} />

      {systemDetail?.physicalItem && (
        <OrderInformation physicalItem={systemDetail.physicalItem} />
      )}

      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<ProgressBarComponent />}>
          <FileManager
            itemType={FILE_TYPE.ITEM}
            customTitle="Physical Item Files"
            uid={uid}
            hasEditRole={canEdit}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
