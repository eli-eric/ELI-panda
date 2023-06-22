import { useRouter } from 'next/router'
import { Fragment } from 'react'

import ItemDetailComponent from '@/components/item-detail/ItemDetail.comp'
import ItemProperty from '@/components/item-property/ItemProperty'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useImage } from '@/hooks/fetch/useImage'
import { message } from '@/i18n/src/messages'
import type { SystemDetailResponse } from '@/modules/systems-deprecated/types/responses'

const messages = message.systemsPage.systemDetail.form

const SystemDetailSection = ({ data }: { data: SystemDetailResponse }) => {
  const router = useRouter()
  const { systemImage } = useEndpoint({
    uid: router.query.uid as string
  })
  const image = useImage(systemImage)

  return (
    <Fragment>
      <ItemDetailComponent title={data.name} images={[image]} description={data?.description}>
        <ItemProperty title={messages.systemType.label} text={data.systemType?.name} />
        <ItemProperty title={messages.systemCode.label} text={data.systemCode} />
        <ItemProperty title={messages.systemAlias.label} text={data.systemAlias} />
        <ItemProperty title={messages.location.label} text={data.location?.name} />
        <ItemProperty title={messages.owner.label} text={data.owner?.name} />
        <ItemProperty title={messages.importance.label} text={data.importance?.name} />
        <ItemProperty title={messages.zone.label} text={data.zone?.name} />
      </ItemDetailComponent>
    </Fragment>
  )
}

export default SystemDetailSection
