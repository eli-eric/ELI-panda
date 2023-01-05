import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'
import { SystemTreeItem } from 'core/types/responses'
import { Fragment, useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface DisclosureComponentProps {
  item: SystemTreeItem
  setSelectedSystem: (systemName: string) => void
  openTree?: boolean
  selectedSystem?: SystemTreeItem
}

const DisclosureComponent = ({ item, setSelectedSystem, openTree, selectedSystem }: DisclosureComponentProps) => {
  useEffect(() => {
    console.log('disclousure', openTree)
  }, [openTree])
  return (
    <Disclosure as="div" key={item.name} className="space-y-" defaultOpen={openTree}>
      {({ open }) => (
        <Fragment>
          <div
            className={classNames(
              ' text-gray-500 hover:text-gray-900 hover:bg-gray-100 ',
              'rounded-md group w-full flex items-center pl-2 pr-1 text-left text-sm font-medium ',
              selectedSystem?.uid === item.uid ? 'outline-none ring-2  ring-primary-500' : ''
            )}
            onClick={() => {
              setSelectedSystem(item.name)
            }}
          >
            <span className="flex-auto cursor-pointer">{item.name}</span>
            <Disclosure.Button>
              {item.children ? (
                open ? (
                  <ChevronUpIcon className="h-5 w-5 " />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )
              ) : (
                <PuzzlePieceIcon className="h-5 w-5" />
              )}
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
                    <DisclosureComponent
                      item={subItem}
                      setSelectedSystem={setSelectedSystem}
                      openTree={openTree}
                      selectedSystem={selectedSystem}
                    />
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
  setSelectedSystem: (systemName: string) => void
  openTree?: boolean
  selectedSystem?: SystemTreeItem
}

export default function SystemTreeComponent({ systemsList, setSelectedSystem, openTree, selectedSystem }: Props) {
  return (
    <Fragment>
      {systemsList.map(item => (
        <DisclosureComponent
          key={item.name}
          item={item}
          setSelectedSystem={setSelectedSystem}
          openTree={openTree}
          selectedSystem={selectedSystem}
        />
      ))}
    </Fragment>
  )
}
