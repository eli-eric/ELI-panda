import { useRouter } from 'next/router'
import { Fragment } from 'react'

import ItemDetailComponent from '@/components/item-detail/ItemDetail.comp'
import ItemPropertyTitle from '@/components/item-property/item-property-title.comp'
import ItemPropertyValue from '@/components/item-property/item-property-value.comp'
import { useEndpoint } from '@/hooks/useEndpoint'

import { SystemDetailResponse } from '../../types/responses'

const DISPLAY = [
  'importanceCode',
  'zoneCode',
  'systemTypeUID',
  'systemAlias',
  'locationCode',
  'ownerUID'
]

const SystemDetailSection = ({ data }: { data: SystemDetailResponse }) => {
  const { uid } = useRouter().query
  const { systemDetailImage } = useEndpoint({ uid: uid as string })
  const rows = Object.entries(data).filter(([title]) => DISPLAY.includes(title))

  return (
    <Fragment>
      <ItemDetailComponent
        title={data.name}
        images={[systemDetailImage || '']}
        description={data?.description}
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
