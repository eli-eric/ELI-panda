import ItemPropertyTitle from 'components/item-property/item-property-title.comp'
import ItemPropertyValue from 'components/item-property/item-property-value.comp'
import { message } from 'i18n/src/messages'
import { SystemInfo } from 'types/responses'

const messages = message.systemsPage.systemDetail
interface Props {
  systemInfo: SystemInfo
}

const SystemDetailSectionComponent = ({ systemInfo }: Props) => {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
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
          <ItemPropertyTitle title={messages.labels.eun}>
            <ItemPropertyValue text={systemInfo.eun} />
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.labels.serialNumber}>
            <ItemPropertyValue text={systemInfo.serialNumber} />
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.labels.batchNumber}>
            <ItemPropertyValue text={systemInfo.batchNumber} />
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.labels.itemUsageCategoryCode}>
            <ItemPropertyValue text={systemInfo.itemUsageCategoryCode} />
          </ItemPropertyTitle>
          <ItemPropertyTitle title={messages.labels.estimatedLifeTime}>
            <ItemPropertyValue text={systemInfo.estimatedLifeTime.toString()} />
          </ItemPropertyTitle>
        </dl>
      </div>
    </section>
  )
}

export default SystemDetailSectionComponent
