import { ListCollapse } from 'lucide-react'

import { Col, Grid } from '@/components/grid/Grid'
import { Disclosure } from '@/components/ui'

import { ItemProperty } from './ItemProperty'

interface ItemPropertiesProps {
  properties: any[] | null | undefined
}

export const ItemProperties = ({ properties }: ItemPropertiesProps) => {
  if (!properties || properties.length === 0) {
    return null
  }

  const title = (
    <div className="flex items-center gap-2">
      <ListCollapse className="h-4 w-4 text-muted-foreground" />
      <span>Physical Item Properties</span>
    </div>
  )

  return (
    <Disclosure
      title={title}
      defaultOpen={false}
      className="w-full border rounded-lg"
      buttonClassName="p-2 text-sm font-semibold"
      panelClassName="p-2 space-y-2 shadow-md rounded-lg"
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
