import { Fragment } from 'react'

import ItemDetailComponent from '@/components/item-detail/ItemDetail.comp'
import ItemPropertyTitle from '@/components/item-property/item-property-title.comp'
import ItemPropertyValue from '@/components/item-property/item-property-value.comp'

import { System } from '../../types'

const DISPLAY = [
  'importanceCode',
  'zoneCode',
  'systemTypeUID',
  'systemAlias',
  'locationCode',
  'ownerUID'
]

const SystemDetailSection = ({ data }: { data: System }) => {
  const rows = Object.entries(data).filter(([title]) => DISPLAY.includes(title))

  return (
    <Fragment>
      <ItemDetailComponent
        title={data.name}
        images={[data.image || '']}
        decription={data.description}
      >
        {rows.map(([title, value], idx) => (
          <ItemPropertyTitle key={idx} title={title}>
            <ItemPropertyValue text={value as string} />
          </ItemPropertyTitle>
        ))}
      </ItemDetailComponent>
    </Fragment>
  )
}

export default SystemDetailSection
