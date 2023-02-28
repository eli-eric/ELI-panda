import { FormattedMessage } from 'react-intl'

interface Props {
  title: string
  children: React.ReactNode
  span?: '1' | '2'
}

const ItemPropertyTitle = ({ title, children, span = '1' }: Props) => (
  <div className={`sm:col-span-${span}`}>
    <dt className="text-sm font-medium text-gray-400">
      <FormattedMessage id={title} />
    </dt>
    {children}
  </div>
)

export default ItemPropertyTitle
