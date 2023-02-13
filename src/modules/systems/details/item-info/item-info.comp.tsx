import ItemPropertyTitle from 'src/components/item-property/item-property-title.comp'
import ItemPropertyValue from 'src/components/item-property/item-property-value.comp'
import ProgressBarComponent from 'src/components/ui/progress-bar.comp'
import { message } from 'src/i18n/src/messages'
import { ItemInfo } from 'src/types/responses'

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
                    <ItemPropertyTitle title={messages.eun}>
                      <ItemPropertyValue text={itemInfo.eun} />
                    </ItemPropertyTitle>
                    <ItemPropertyTitle title={messages.serialNumber}>
                      <ItemPropertyValue text={itemInfo.serialNumber} />
                    </ItemPropertyTitle>
                    <ItemPropertyTitle title={messages.batchNumber}>
                      <ItemPropertyValue text={itemInfo.batchNumber} />
                    </ItemPropertyTitle>
                    <ItemPropertyTitle title={messages.assetNumber}>
                      <ItemPropertyValue text={itemInfo.assetNumber} />
                    </ItemPropertyTitle>
                    <ItemPropertyTitle title={messages.itemUsageCategory}>
                      <ItemPropertyValue text={itemInfo.itemUsageCategory} />
                    </ItemPropertyTitle>
                    <ItemPropertyTitle title={messages.activated}>
                      <ItemPropertyValue text={itemInfo.activated.toString()} />
                    </ItemPropertyTitle>
                    <ItemPropertyTitle title={messages.estimatedLifetime}>
                      <ItemPropertyValue text={itemInfo.estimatedLifetime} />
                    </ItemPropertyTitle>
                    <ItemPropertyTitle title={messages.obsolete}>
                      <ItemPropertyValue text={itemInfo.obsolete.toString()} />
                    </ItemPropertyTitle>
                    <ItemPropertyTitle title={messages.createdBy}>
                      <ItemPropertyValue text={itemInfo.createdBy} />
                    </ItemPropertyTitle>
                    <ItemPropertyTitle title={messages.note}>
                      <ItemPropertyValue text={itemInfo.note} />
                    </ItemPropertyTitle>
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
