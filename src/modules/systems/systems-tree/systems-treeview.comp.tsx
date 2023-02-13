import { Disclosure } from '@headlessui/react'
import { Fragment } from 'react'
import { SystemTreeItem } from 'src/types/responses'

import SystemTreeItemComponent from './system-tree-item.comp'
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
              {item.children.map(subItem => (
                <div key={subItem.name} className="pl-3 pt-1">
                  <DisclosureComponent item={subItem} />
                </div>
              ))}
            </Disclosure.Panel>
          )}
        </Fragment>
      )}
    </Disclosure>
  )
}

interface Props {
  tree: Array<SystemTreeItem>
}

export default function SystemTreeComponent({ tree }: Props) {
  return (
    <div className="flex flex-col  min-w-[256px]">
      <div className="overflow-y-auto h-[100vh] border-r bg-white pt-5">
        <div className="mt-5 flex flex-1 flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {tree.map(item => (
              <DisclosureComponent key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
