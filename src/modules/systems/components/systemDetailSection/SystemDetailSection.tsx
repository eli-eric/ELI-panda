import { useRouter } from 'next/router'
import { Fragment } from 'react'
import useSWR from 'swr'

import ItemDetailComponent from '@/components/item-detail/ItemDetail.comp'
import ItemPropertyTitle from '@/components/item-property/item-property-title.comp'
import ItemPropertyValue from '@/components/item-property/item-property-value.comp'
import { useEndpoint } from '@/hooks/useEndpoint'

import { SystemDetailResponse } from '../../types/responses'

const DISPLAY = [
  'systemType',
  'systemCode',
  'systemAlias',
  'location',
  'owner',
  'importance',
  'zone',
  'subZoneCode',
  'criticalityClass'
]

const SystemDetailSection = ({ data }: { data: SystemDetailResponse }) => {
  const router = useRouter()
  const { systemDetailImage } = useEndpoint({ uid: router.query.uid as string })
  const { data: image } = useSWR(systemDetailImage)
  const rows = Object.entries(data).filter(([title]) => DISPLAY.includes(title))

  return (
    <Fragment>
      <ItemDetailComponent
        title={data.name}
        images={[image]}
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
