import ItemPropertyTitle from 'src/components/item-property/item-property-title.comp'
import ItemPropertyValue from 'src/components/item-property/item-property-value.comp'
import { message } from 'src/i18n/src/messages'

import { SystemInfo } from '@/types/responses'

const messages = message.systemsPage.systemDetail
interface Props {
  systemInfo: SystemInfo
}

const SystemDetailSectionComponent = ({ systemInfo }: Props) => {
  return (
    <section aria-labelledby="details-heading" className="w-fit mb-4">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
        <ItemPropertyTitle title={messages.labels.importanceCode}>
          <ItemPropertyValue text={systemInfo.importanceCode} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.labels.zoneCode}>
          <ItemPropertyValue text={systemInfo.zoneCode} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.labels.systemTypeUID}>
          <ItemPropertyValue text={systemInfo.systemTypeUID} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.labels.systemCode}>
          <ItemPropertyValue text={systemInfo.systemCode} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.labels.systemAlias}>
          <ItemPropertyValue text={systemInfo.systemAlias} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.labels.locationCode}>
          <ItemPropertyValue text={systemInfo.locationCode} />
        </ItemPropertyTitle>
        <ItemPropertyTitle title={messages.labels.ownerUID}>
          <ItemPropertyValue text={systemInfo.ownerUID} />
        </ItemPropertyTitle>
      </dl>
    </section>
  )
}

export default SystemDetailSectionComponent
