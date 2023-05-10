import { classNames } from '@/helpers'

interface Props {
  link?: boolean
  text?: string
}

const ItemPropertyValue = ({ link, text }: Props) => (
  <dd className={classNames('text-sm', link ? 'text-blue-500' : 'text-gray-900')}>
    {link ? (
      <a href={text} target="_blank" rel="noreferrer" className="text-ellipsis">
        link
      </a>
    ) : text ? (
      text
    ) : (
      'N/A'
    )}
  </dd>
)

export default ItemPropertyValue
