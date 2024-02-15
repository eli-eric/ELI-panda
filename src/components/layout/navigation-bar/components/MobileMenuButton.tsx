import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export const MobileMenuButton = ({ open }: { open: boolean }) => (
  <div className="-mr-2 flex items-center sm:hidden">
    {/* Mobile menu button */}
    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-primary-800 hover:text-gray-500 ">
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
      )}
    </Disclosure.Button>
  </div>
)
