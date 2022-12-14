import ItemProperty from 'core/components/modules/shared/item-property.comp'
import ProgressBarComponent from 'core/components/ui/progress-bar.comp'
import { message } from 'core/i18n/src/messages'
import { ItemInfo } from 'core/types/responses'

const messages = message.systemsPage.itemDetail
interface Props {
  itemInfo?: ItemInfo
}

const ItemInfoComponent = ({ itemInfo }: Props) => {
  return (
    <div className="bg-white pb-10">
      {itemInfo ? (
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 h-full overflow-auto">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <section>
                <div className="px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <ItemProperty text={itemInfo.eun} title={messages.eun} />
                    <ItemProperty text={itemInfo.serialNumber} title={messages.serialNumber} />
                    <ItemProperty text={itemInfo.batchNumber} title={messages.batchNumber} />
                    <ItemProperty text={itemInfo.assetNumber} title={messages.assetNumber} />
                    <ItemProperty text={itemInfo.itemUsageCategory} title={messages.itemUsageCategory} />
                    <ItemProperty text={itemInfo.activated.toString()} title={messages.activated} />
                    <ItemProperty text={itemInfo.estimatedLifetime} title={messages.estimatedLifetime} />
                    <ItemProperty text={itemInfo.obsolete.toString()} title={messages.obsolete} />
                    <ItemProperty text={itemInfo.createdBy} title={messages.createdBy} />
                    <ItemProperty text={itemInfo.note} title={messages.note} />
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
export default ItemInfoComponent
