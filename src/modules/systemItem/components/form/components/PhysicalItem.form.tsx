import { useFormContext, useWatch } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/Input'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import { message } from '@/i18n/src/messages'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'

import { createMessageValues } from '../../../../../utils/formatters'
import useSystemFormFields from '../SystemForm.fields'

const propertyMessage = message.systemsPage.systemDetail.form.physicalItem.general.properties

export const PhysicalItemForm = () => {
  const fields = useSystemFormFields()
  const { control } = useFormContext<any>()

  const description = useWatch({ control, name: 'item.catalogueItem.description' })

  const { systemDetail } = useSystemDetail()
  const properties = systemDetail?.item?.catalogueItem.propertiesConnection.edges

  return (
    <Grid>
      <Col sm={3} md={4}>
        <Input {...fields.partNumber} />
      </Col>
      <Col sm={3} md={4}>
        <Combobox {...fields.catalogueSupplier} />
      </Col>
      <Col sm={3} md={4}>
        <Input {...fields.eun} />
      </Col>
      {description && (
        <Col sm="full" className="flex-col">
          <p>Description:</p>
          <p>{description}</p>
        </Col>
      )}
      {properties && properties.length > 0 && (
        <Col sm="full" className="flex-col">
          <p>
            <FormattedMessage id={propertyMessage.title} values={createMessageValues()} />
          </p>
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

      <Col sm={3} md={4}>
        <Input {...fields.serialNumber} />
      </Col>
    </Grid>
  )
}
