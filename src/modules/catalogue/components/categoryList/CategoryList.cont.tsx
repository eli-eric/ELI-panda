import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { isMobile } from 'react-device-detect'

import type { CodebookType } from '@/hooks/fetch/useCodebook'

import { CategoryList } from './CategoryList.comp'

interface Props {
  onChange: (open: boolean) => void
  setCategoryFilter: (value: CodebookType) => void
}

export const CategoryListContainer = ({ onChange, setCategoryFilter }: Props) => (
  <Disclosure defaultOpen={!isMobile}>
    {({ open }) => (
      <div id="category-list" className="flex flex-col">
        <Disclosure.Button
          className="border-t hover:text-primary-600 dark:hover:bg-slate-600 text-sm flex items-center justify-between w-full py-[2px] px-4  shadow-sm  text-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-100"
          onClick={() => {
            onChange(!open)
          }}
        >
          <span className="">{open ? 'Hide' : 'Show'} Categories</span>
          {open ? (
            <XMarkIcon className="block h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronDownIcon className="block h-4 w-4" aria-hidden="true" />
          )}
        </Disclosure.Button>
        {/*  <div className="lg:grid hidden">
          <CategoryList />
        </div> */}
        <Disclosure.Panel className={' grid'}>
          <CategoryList setCategoryFilter={setCategoryFilter} />
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
)
