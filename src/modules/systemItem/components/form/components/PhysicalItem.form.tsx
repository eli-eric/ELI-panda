import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormattedMessage } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import { Paragraph } from '@/components/layout/Paragraph'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { ItemPropertiesViewer } from '@/components/ui'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import FileManager from '@/modules/shared/fileManager/FileManager'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { useItemProperties } from '@/modules/systemItem/hooks/useItemProperties'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { ROLE } from '@/types/constants/roles'

import { createMessageValues } from '../../../../../utils/formatters'
import useSystemFormFields from '../SystemForm.fields'
import { ItemProperties } from './ItemProperties'
import { OrderInformation } from './orderInfo/OrderInformation'

const propertyMessage =
  message.systemsPage.systemDetail.form.physicalItem.general.properties

export const PhysicalItemForm = ({ uid }: { uid: string }) => {
  const fields = useSystemFormFields()

  const { catalogueItem, physicalItem, systemDetail } = useSystemDetail()

  const { data: properties } = useItemProperties(uid)

  const description = catalogueItem?.description
  const canEdit = usePermission([ROLE.SYSTEM_EDIT])

  return (
    <Grid>
      <Col sm={3} md={3}>
        <Input {...fields.partNumber} />
      </Col>
      <Col sm={3} md={3}>
        <Combobox {...fields.catalogueSupplier} />
      </Col>
      <Col sm={3} md={3}>
        <Input {...fields.eun} />
      </Col>
      <Col sm={3} md={3}>
        <Input {...fields.serialNumber} />
      </Col>
      {description && (
        <Col sm="full" className="flex-col">
          <FormattedMessage
            id={propertyMessage.title}
            values={createMessageValues({ title: 'Description' })}
          />
          <Paragraph>{description}</Paragraph>
        </Col>
      )}
      <Col sm="full" className="w-full">
        <ItemPropertiesViewer
          catalogueItem={physicalItem?.catalogueItem}
          serviceItems={physicalItem?.serviceItemsConnection.edges}
        />
      </Col>
      <Col sm="full" className="w-full">
        <ItemProperties properties={properties} />
      </Col>
      <Col sm={3} md={4}>
        <Listbox {...fields.itemUsage} />
      </Col>
      <Col sm={3} md={4}>
        <Listbox {...fields.procurementStatus} />
      </Col>
      <Col sm={3} md={4}>
        <Listbox {...fields.itemConditionStatus} />
      </Col>
      <Col sm="full">
        <TextArea {...fields.itemNotes} />
      </Col>
      <Col sm="full" className="w-full">
        {systemDetail?.physicalItem && (
          <OrderInformation physicalItem={systemDetail.physicalItem} />
        )}
      </Col>

      <Col sm="full" className="flex-col">
        <ErrorBoundary fallback={<ErrorPage />}>
          <Suspense fallback={<ProgressBarComponent />}>
            <FileManager
              itemType={FILE_TYPE.ITEM}
              uid={uid}
              hasEditRole={canEdit}
            />
          </Suspense>
        </ErrorBoundary>
      </Col>
    </Grid>
  )
}
