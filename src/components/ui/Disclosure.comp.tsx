import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

const DisclosureComponent = ({ title, children, defaultOpen = true }: Props) => {
  return (
    <div className="divide-y divide-gray-200 border-t">
      <Disclosure as="div" defaultOpen={defaultOpen}>
        {({ open }) => (
          <Fragment>
            <h3>
              <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                <span className={classNames(open ? 'text-primary-600' : 'text-gray-900', 'text-sm font-medium')}>
                  {title}
                </span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon
                      className="block h-6 w-6 text-primary-400 group-hover:text-primary-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <PlusIcon className="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel as="div" className="pb-6">
              {children}
            </Disclosure.Panel>
          </Fragment>
        )}
      </Disclosure>
    </div>
  )
}

export default DisclosureComponent
