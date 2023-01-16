import ItemProperty from 'core/components/modules/shared/item-property.comp'
import ProgressBarComponent from 'core/components/ui/progress-bar.comp'
import { message } from 'core/i18n/src/messages'
import { SystemInfo } from 'core/types/responses'

const messages = message.systemsPage.systemDetail
interface Props {
  systemInfo?: SystemInfo
}

const SystemInfoComponent = ({ systemInfo }: Props) => {
  return (
    <div className="bg-white pb-10">
      {systemInfo ? (
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 h-full overflow-auto">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{systemInfo.name}</h1>
              <h3 className="sr-only">Description</h3>
              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{
                  __html:
                    systemInfo.description === '' ||
                    systemInfo.description === null ||
                    systemInfo.description === undefined
                      ? 'No description'
                      : systemInfo.description
                }}
              />
              <section aria-labelledby="details-heading" className="mt-12">
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <ItemProperty text={systemInfo.importanceCode} title={messages.importance} />
                    <ItemProperty text={systemInfo.zoneCode} title={messages.zoneCode} />
                    <ItemProperty text={systemInfo.systemTypeUID} title={messages.systemTypeUid} />
                    <ItemProperty text={systemInfo.systemCode} title={messages.systemCode} />
                    <ItemProperty text={systemInfo.systemAlias} title={messages.systemAlias} />
                    <ItemProperty text={systemInfo.locationCode} title={messages.locationCode} />
                    <ItemProperty text={systemInfo.ownerUID} title={messages.ownerUID} />
                    <ItemProperty text={systemInfo.eun} title={messages.eun} />
                    <ItemProperty text={systemInfo.serialNumber} title={messages.serialNumber} />
                    <ItemProperty text={systemInfo.batchNumber} title={messages.batchNumber} />
                    <ItemProperty text={systemInfo.itemUsageCategoryCode} title={messages.itemUsageCategoryCode} />
                    <ItemProperty text={systemInfo.estimatedLifeTime.toString()} title={messages.estimatedLifeTime} />
                  </dl>
                </div>
              </section>
            </div>
          </div>
        </main>
      ) : (
        <ProgressBarComponent />
      )}
    </div>
  )
}
export default SystemInfoComponent
