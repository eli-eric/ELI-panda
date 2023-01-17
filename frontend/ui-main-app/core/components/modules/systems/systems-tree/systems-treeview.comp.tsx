import { Disclosure } from '@headlessui/react'
import { SystemTreeItem } from 'core/types/responses'
import { Fragment } from 'react'

import SystemTreeItemComponent from './system-tree-item.comp'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface DisclosureComponentProps {
  item: SystemTreeItem
}

const DisclosureComponent = ({ item }: DisclosureComponentProps) => {
  return (
    <Disclosure as="div" key={item.name} className="space-y-" defaultOpen={item.open || false}>
      {({ open }) => (
        <Fragment>
          <SystemTreeItemComponent open={open} item={item} />
          {item.children && (
            <Disclosure.Panel className="space-y-1 ">
              <ul>
                {item.children.map(subItem => (
                  <li key={subItem.name} className="list-item group w-full items-center pl-3 pt-1 text-sm font-mediu ">
                    <DisclosureComponent item={subItem} />
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
}

export default function SystemTreeComponent({ systemsList }: Props) {
  return (
    <div className="flex flex-col  min-w-[256px]">
      <div className=" overflow-y-auto h-[100vh] border-r bg-white pt-5">
        <div className="mt-5 flex flex-1 flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {systemsList.map(item => (
              <DisclosureComponent key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
