import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { CategoryList } from './CategoryList.comp'

interface Props {
  onChange: (open: boolean) => void
}

export const CategoryListContainer = ({ onChange }: Props) => (
  <Disclosure>
    {({ open }) => (
      <div id="category-list" className="flex flex-col">
        <Disclosure.Button
          className="lg:hidden border flex justify-between rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          onClick={() => {
            onChange(!open)
          }}
        >
          <span className="text-xs">{open ? 'Hide' : 'Show'} Categories</span>
          {open ? (
            <XMarkIcon className="block h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDownIcon className="block h-4 w-4" aria-hidden="true" />
          )}
        </Disclosure.Button>
        <div className="lg:grid hidden">
          <CategoryList />
        </div>
        <Disclosure.Panel className={'lg:hidden grid'}>
          <CategoryList />
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
)
