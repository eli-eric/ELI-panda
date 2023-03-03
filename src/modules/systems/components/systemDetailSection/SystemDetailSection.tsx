import { useRouter } from 'next/router'
import { Fragment } from 'react'
import useSWR from 'swr'

import ItemDetailComponent from '@/components/item-detail/ItemDetail.comp'
import ItemPropertyTitle from '@/components/item-property/item-property-title.comp'
import ItemPropertyValue from '@/components/item-property/item-property-value.comp'
import { mockFetcher } from '@/features/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import { message } from '@/i18n/src/messages'

import { SystemDetailResponse } from '../../types/responses'

const messages = message.systemsPage.systemDetail.form

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
  const { systemImage: systemDetailImage } = useEndpoint({
    uid: router.query.uid as string
  })
  const { data: image } = useSWR(systemDetailImage, mockFetcher)
  const rows = Object.entries(data).filter(([title]) => DISPLAY.includes(title))

  return (
    <Fragment>
      <ItemDetailComponent
        title={data.name}
        images={[image]}
        description={data?.description}
      >
        <ItemPropertyTitle title={messages.systemTypeUID.label}>
          <ItemPropertyValue text={data.systemType} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.systemCode.label}>
          <ItemPropertyValue text={data.systemCode} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.systemAlias.label}>
          <ItemPropertyValue text={data.systemAlias} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.locationUID.label}>
          <ItemPropertyValue text={data.location} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.ownerUID.label}>
          <ItemPropertyValue text={data.owner} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.importanceUID.label}>
          <ItemPropertyValue text={data.importance} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.zoneUID.label}>
          <ItemPropertyValue text={data.zone} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.subZone.label}>
          <ItemPropertyValue text={data.subZoneCode} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.criticalityClassUID.label}>
          <ItemPropertyValue text={data.criticalityClass} />
        </ItemPropertyTitle>
      </ItemDetailComponent>
    </Fragment>
  )
}

export default SystemDetailSection
