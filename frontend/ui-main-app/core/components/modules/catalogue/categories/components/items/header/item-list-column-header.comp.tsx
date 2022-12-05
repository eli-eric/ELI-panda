interface Props {
  title: string
}

const ItemListColumnHeaderComponent = ({ title }: Props) => {
  return (
    <th
      scope="col"
      className="whitespace-nowrap sticky top-0 z-9 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
    >
      {title}
    </th>
  )
}

export default ItemListColumnHeaderComponent
