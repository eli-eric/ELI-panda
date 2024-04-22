import Link from 'next/link'
import { Suspense, useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { LinkDecorator } from '@/components/decorators'
import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import { Paragraph } from '@/components/layout/Paragraph'
import { message } from '@/i18n/src/messages'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { PATH } from '@/types/constants/paths'

import { createMessageValues } from '../../../../../utils/formatters'
import useSystemFormFields from '../SystemForm.fields'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorPage from '@/components/error/ErrorPage'
import ProgressBarComponent from '@/components/progress-bar.comp'
import FileManager from '@/modules/shared/fileManager/FileManager'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
import { useItemProperties } from '@/modules/systemItem/hooks/useItemProperties'
import { ItemProperty } from './ItemProperty'

const propertyMessage =
  message.systemsPage.systemDetail.form.physicalItem.general.properties

export const PhysicalItemForm = ({ uid }: { uid: string }) => {
  const fields = useSystemFormFields()
  const { systemDetail } = useContext(SystemDetailContext)

  const { data: properties } = useItemProperties(uid)

  const catalogueItemProperties =
    systemDetail?.physicalItem?.catalogueItem?.propertiesConnection?.edges

  const description = systemDetail?.physicalItem?.catalogueItem.description
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
      {catalogueItemProperties && catalogueItemProperties.length > 0 && (
        <Col sm="full" className="flex-col">
          <FormattedMessage
            id={propertyMessage.title}
            values={createMessageValues({ title: 'Catalgoue Properties' })}
          />
          <ul className="grid grid-cols-4 lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-3 ">
            {catalogueItemProperties.map(edge => (
              <li key={edge.node.uid} className="flex col-span-3">
                <FormattedMessage
                  id={propertyMessage.property}
                  values={createMessageValues({
                    name: edge.node.name,
                    value: edge.value,
                    unit: edge.node.unit?.name
                  })}
                />
              </li>
            ))}
          </ul>
        </Col>
      )}
      {properties && properties.length > 0 && (
        <Col sm="full" className="flex-col">
          <FormattedMessage
            id={propertyMessage.title}
            values={createMessageValues({ title: 'Item Properties' })}
          />
          {properties.map((property, index) => (
            <ItemProperty
              key={property.property.uid}
              detail={property}
              index={index}
            />
          ))}
        </Col>
      )}

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
      {systemDetail?.physicalItem?.order && (
        <Col sm="full" className="flex-col">
          <FormattedMessage
            id={propertyMessage.title}
            values={createMessageValues({ title: 'Item Order Information' })}
          />
          <Link
            href={PATH.ORDER + '/' + systemDetail.physicalItem.order.uid}
            target={'_blank'}
          >
            <LinkDecorator>
              {systemDetail.physicalItem.order.name}
            </LinkDecorator>
          </Link>
        </Col>
      )}
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
