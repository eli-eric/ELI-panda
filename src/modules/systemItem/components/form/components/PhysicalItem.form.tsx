import Link from 'next/link'
import { FormattedMessage } from 'react-intl'

import { LinkDecorator } from '@/components/decorators'
import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import { Paragraph } from '@/components/layout/Paragraph'
import { message } from '@/i18n/src/messages'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { PATH } from '@/types/constants/paths'

import { createMessageValues } from '../../../../../utils/formatters'
import useSystemFormFields from '../SystemForm.fields'

const propertyMessage = message.systemsPage.systemDetail.form.physicalItem.general.properties

export const PhysicalItemForm = () => {
  const fields = useSystemFormFields()
  const { systemDetail } = useSystemDetail()
  const properties = systemDetail?.physicalItem?.catalogueItem.propertiesConnection.edges
  const description = systemDetail?.physicalItem?.catalogueItem.description

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
          <FormattedMessage id={propertyMessage.title} values={createMessageValues({ title: 'Description' })} />
          <Paragraph>{description}</Paragraph>
        </Col>
      )}
      {properties && properties.length > 0 && (
        <Col sm="full" className="flex-col">
          <FormattedMessage id={propertyMessage.title} values={createMessageValues({ title: 'Properties' })} />
          <ul className="flex space-x-4">
            {properties.map(edge => (
              <li key={edge.node.uid} className="flex">
                <FormattedMessage
                  id={propertyMessage.property}
                  values={createMessageValues({ name: edge.node.name, value: edge.value, unit: edge.node.unit?.name })}
                />
              </li>
            ))}
          </ul>
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
          <Link href={PATH.ORDER + '/' + systemDetail.physicalItem.order.uid} target={'_blank'}>
            <LinkDecorator>{systemDetail.physicalItem.order.name}</LinkDecorator>
          </Link>
        </Col>
      )}
    </Grid>
  )
}
