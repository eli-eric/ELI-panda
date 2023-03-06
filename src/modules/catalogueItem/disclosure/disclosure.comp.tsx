import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

import { classNames } from '@/features'
import { CatalogueItem } from '@/types/responses'

interface Props {
  groups: string[]
  item?: CatalogueItem
}

const DisclosureComponent = ({ groups, item }: Props) => (
  <Fragment>
    {item?.details && (
      <div className="divide-y divide-gray-200 border-t">
        {groups.map(group => (
          <Disclosure as="div" key={group}>
            {({ open }) => (
              <>
                <h3>
                  <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                    <span
                      className={classNames(
                        open ? 'text-primary-600' : 'text-gray-900',
                        'text-sm font-medium'
                      )}
                    >
                      {group}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon
                          className="block h-6 w-6 text-primary-400 group-hover:text-primary-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <PlusIcon
                          className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                  {item?.details && (
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        {item?.details.map(detail => {
                          if (detail.propertyGroup !== group) {
                            return
                          }
                          return (
                            <div
                              key={detail.propertyName}
                              className="sm:col-span-1"
                            >
                              <dt className="text-sm font-medium text-gray-400">
                                {detail.propertyName}
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {(detail.value === '' || detail.value === null
                                  ? 'N/A'
                                  : detail.value) +
                                  (detail.propertyUnit !== null
                                    ? ` ${detail.propertyUnit}`
                                    : '')}
                              </dd>
                            </div>
                          )
                        })}
                      </dl>
                    </div>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    )}
  </Fragment>
)

export default DisclosureComponent
