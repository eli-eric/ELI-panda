import { FormattedMessage } from 'react-intl'

interface Props {
  title: string
  children: React.ReactNode
}

const ItemPropertyTitle = ({ title, children }: Props) => {
  return (
    <div className="flex gap-x-4 text-sm font-medium text-gray-400">
      <dt className="">
        <FormattedMessage id={title} />
      </dt>
      {children}
    </div>
  )
}

export default ItemPropertyTitle
