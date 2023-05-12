import ItemPropertyTitle from './item-property-title.comp'
import ItemPropertyValue from './item-property-value.comp'

const ItemProperty = ({ title, text, span }: { title: string; text?: string; link?: boolean; span?: '1' | '2' }) => (
  <ItemPropertyTitle title={title} span={span}>
    <ItemPropertyValue text={text} />
  </ItemPropertyTitle>
)

export default ItemProperty
