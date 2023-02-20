interface Props {
  link?: boolean
  text?: string
}

const ItemPropertyValue = ({ link, text }: Props) => {
  return (
    <dd className={`text-sm ${link ? 'text-blue-500' : 'text-gray-900'}`}>
      {link ? (
        <a
          href={text}
          target="_blank"
          rel="noreferrer"
          className="text-ellipsis"
        >
          link
        </a>
      ) : text ? (
        text
      ) : (
        'N/A'
      )}
    </dd>
  )
}

export default ItemPropertyValue
