import { ChevronDownIcon } from '@heroicons/react/20/solid'

const ItemListHeaderComponent = () => {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
        >
          <a href="#" className="group inline-flex">
            Name
            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </a>
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          <a href="#" className="group inline-flex">
            UID
            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </a>
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          <a href="#" className="group inline-flex">
            Category Name
            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </a>
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          <a href="#" className="group inline-flex">
            Manufacturer
            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </a>
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          <a href="#" className="group inline-flex">
            Manufacturer Number
            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </a>
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          <a href="#" className="group inline-flex">
            Manufacturer Url
            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </a>
        </th>
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          <a href="#" className="group inline-flex">
            Description
            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </a>
        </th>
      </tr>
    </thead>
  )
}

export default ItemListHeaderComponent
