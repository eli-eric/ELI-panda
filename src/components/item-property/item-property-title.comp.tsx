import { FormattedMessage } from 'react-intl'

interface Props {
  title: string
  children: React.ReactNode
}

const ItemPropertyTitle = ({ title, children }: Props) => {
  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-400">
        <FormattedMessage id={title} />
      </dt>
      {children}
    </div>
  )
}

export default ItemPropertyTitle
