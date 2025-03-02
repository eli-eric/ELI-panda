import { Col, Grid } from '@/components/grid/Grid'
import { Disclosure } from '@/components/ui'
import { message } from '@/i18n/src/messages'

import { ItemProperty } from './ItemProperty'

const propertyMessage =
  message.systemsPage.systemDetail.form.physicalItem.general.properties

interface ItemPropertiesProps {
  properties: any[] | null | undefined
}

export const ItemProperties = ({ properties }: ItemPropertiesProps) => {
  if (!properties || properties.length === 0) {
    return null
  }

  return (
    <Disclosure
      title="Item Properties"
      defaultOpen={true}
      className="w-full border rounded-md"
      buttonClassName="p-3"
      panelClassName="px-3 py-3"
      transparentButton={true}
    >
      <Grid className="w-full">
        {properties.map((property, index) => (
          <Col key={property.property.uid} sm={3} md={3}>
            <ItemProperty
              key={property.property.uid}
              detail={property}
              index={index}
            />
          </Col>
        ))}
      </Grid>
    </Disclosure>
  )
}
