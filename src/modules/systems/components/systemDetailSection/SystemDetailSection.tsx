import { useRouter } from 'next/router'
import { Fragment } from 'react'
import useSWR from 'swr'

import ItemDetailComponent from '@/components/item-detail/ItemDetail.comp'
import ItemProperty from '@/components/item-property/ItemProperty'
import { mockFetcher } from '@/features/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import { message } from '@/i18n/src/messages'

import { SystemDetailResponse } from '../../types/responses'

const messages = message.systemsPage.systemDetail.form

// const DISPLAY = [
//   'systemType',
//   'systemCode',
//   'systemAlias',
//   'location',
//   'owner',
//   'importance',
//   'zone',
//   'subZoneCode',
//   'criticalityClass'
// ]

const SystemDetailSection = ({ data }: { data: SystemDetailResponse }) => {
  const router = useRouter()
  const { systemImage: systemDetailImage } = useEndpoint({
    uid: router.query.uid as string
  })
  const { data: image } = useSWR(systemDetailImage, mockFetcher)
  // const rows = Object.entries(data).filter(([title]) => DISPLAY.includes(title))

  return (
    <Fragment>
      <ItemDetailComponent title={data.name} images={[image]} description={data?.description}>
        <ItemProperty title={messages.systemTypeUID.label} text={data.systemType?.name} />
        <ItemProperty title={messages.systemCode.label} text={data.systemCode} />
        <ItemProperty title={messages.systemAlias.label} text={data.systemAlias} />
        <ItemProperty title={messages.locationUID.label} text={data.location?.name} />
        <ItemProperty title={messages.ownerUID.label} text={data.owner?.name} />
        <ItemProperty title={messages.importanceUID.label} text={data.importance?.name} />
        <ItemProperty title={messages.zoneUID.label} text={data.zone?.name} />
      </ItemDetailComponent>
    </Fragment>
  )
}

export default SystemDetailSection
