import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'
import { SystemTreeItem } from 'core/types/responses'
import { Dispatch, Fragment, SetStateAction, useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface DisclosureComponentProps {
  item: SystemTreeItem
  setSearchSystem: Dispatch<SetStateAction<string | undefined>>
  openTree?: boolean
  selectedSystem?: SystemTreeItem
}

const DisclosureComponent = ({ item, setSearchSystem, openTree, selectedSystem }: DisclosureComponentProps) => {
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
              setSearchSystem(item.name)
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
                    <DisclosureComponent
                      item={subItem}
                      setSearchSystem={setSearchSystem}
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
  setSearchSystem: Dispatch<SetStateAction<string | undefined>>
  openTree?: boolean
  selectedSystem?: SystemTreeItem
}

export default function SystemTreeComponent({ systemsList, setSearchSystem, openTree, selectedSystem }: Props) {
  return (
    <div className="flex flex-col  min-w-[256px]">
      <div className=" overflow-y-auto h-[100vh] border-r bg-white pt-5">
        <div className="mt-5 flex flex-1 flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {' '}
            {systemsList.map(item => (
              <DisclosureComponent
                key={item.name}
                item={item}
                setSearchSystem={setSearchSystem}
                openTree={openTree}
                selectedSystem={selectedSystem}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
