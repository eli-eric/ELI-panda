import { FormattedMessage } from 'react-intl'

interface ItemPropertyProps {
  title: string
  text?: string
  link?: boolean
  edit?: boolean
  formFieldName?: string
}

const ItemProperty = ({ title, text, link, edit = false, formFieldName }: ItemPropertyProps) => {
  return (
    <div className="sm:col-span-1">
      <dt className="text-sm font-medium text-gray-400">
        <FormattedMessage id={title} />
      </dt>

      <dd className={`mt-1 text-sm ${link ? 'text-blue-500' : 'text-gray-900'}`}>
        {link ? (
          <a href={text} target="_blank" rel="noreferrer">
            {text ? text : 'N/A'}
          </a>
        ) : (
          text
        )}
      </dd>
    </div>
  )
}

export default ItemProperty
