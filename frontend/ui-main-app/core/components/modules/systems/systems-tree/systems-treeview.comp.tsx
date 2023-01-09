import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'
import { SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface DisclosureComponentProps {
  item: SystemTreeItem
  setSelectedSystem: (item: SystemTreeItem) => void
}

const DisclosureComponent = ({ item, setSelectedSystem }: DisclosureComponentProps) => {
  const router = useRouter()

  return (
    <Disclosure as="div" key={item.name} className="space-y-">
      {({ open }) => (
        <Fragment>
          <div
            className={classNames(
              ' text-gray-500 hover:text-gray-900 hover:bg-gray-100 ',
              'rounded-md group w-full flex items-center pl-2 pr-1 text-left text-sm font-medium ',
              router.query.uid === item.uid ? 'outline-none ring-2  ring-primary-500' : ''
            )}
            onClick={() => {
              setSelectedSystem(item)
            }}
          >
            <Disclosure.Button className="w-full">
              <div className="flex justify-between">
                <span>{item.name}</span>
                {item.children ? (
                  open ? (
                    <ChevronUpIcon className="h-5 w-5 " />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )
                ) : (
                  <PuzzlePieceIcon className="h-5 w-5" />
                )}
              </div>
            </Disclosure.Button>
          </div>
          {item.children && (
            <Disclosure.Panel className="space-y-1 ">
              <ul>
                {item.children.map(subItem => (
                  <li
                    key={subItem.name}
                    className="list-item group w-full items-center pl-3 pr-1 pt-1 text-sm font-mediu "
                  >
                    <DisclosureComponent item={subItem} setSelectedSystem={setSelectedSystem} />
                  </li>
                ))}
              </ul>
            </Disclosure.Panel>
          )}
        </Fragment>
      )}
    </Disclosure>
  )
}

interface Props {
  systemsList: Array<SystemTreeItem>
  setSelectedSystem: (item: SystemTreeItem) => void
}

export default function SystemTreeComponent({ systemsList, setSelectedSystem }: Props) {
  return (
    <Fragment>
      {systemsList.map(item => (
        <DisclosureComponent key={item.name} item={item} setSelectedSystem={setSelectedSystem} />
      ))}
    </Fragment>
  )
}
