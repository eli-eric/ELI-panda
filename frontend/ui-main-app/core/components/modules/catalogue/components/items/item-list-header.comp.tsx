const ItemListHeaderComponent = () => {
  return (
    <thead className="bg-gray-50 ">
      <tr>
        <th
          scope="col"
          className="sticky top-0 z-9 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
        >
          Name
        </th>
        <th
          scope="col"
          className="sticky top-0 z-9 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
        >
          Description
        </th>

        <th
          scope="col"
          className="sticky top-0 z-9 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
        >
          Category Name
        </th>
        <th
          scope="col"
          className="sticky top-0 z-9 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
        >
          Manufacturer
        </th>
        <th
          scope="col"
          className="sticky top-0 z-9 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
        >
          Manufacturer number
        </th>

        <th
          scope="col"
          className="sticky top-0 z-9 hidden border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
        >
          Manufacturer Url
        </th>
      </tr>
    </thead>
  )
}

export default ItemListHeaderComponent
