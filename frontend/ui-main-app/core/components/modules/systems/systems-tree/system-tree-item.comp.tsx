import { Disclosure } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  PlusIcon,
  PuzzlePieceIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  open: boolean
  item: SystemTreeItem
}

const SystemTreeItemComponent = ({ open, item }: Props) => {
  const router = useRouter()
  const selectTreeViewItem = () => {
    router.push({ query: { uid: item.uid } })
  }
  return (
    <div
      className={classNames(
        ' text-gray-500 hover:text-gray-900 hover:bg-gray-100 ',
        'rounded-md group w-full flex items-center pl-2 pr-1 text-left text-sm font-medium ',
        router.query.uid === item.uid ? 'outline-none ring-2 rounded-md  ring-primary-500' : ''
      )}
      onClick={() => {
        selectTreeViewItem()
      }}
    >
      <Disclosure.Button className="w-full">
        <div className="flex justify-between">
          <div className={classNames('flex')}>
            <div className="mr-2">
              {item.children ? (
                open ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )
              ) : (
                <PuzzlePieceIcon className="h-5 w-5 tect" />
              )}
            </div>

            <span>{item.name}</span>
          </div>
          <div className="flex">
            <PencilSquareIcon className="h-5 w-5" />
            <TrashIcon className="h-5 w-5" />
            <PlusIcon className="h-5 w-5" />
          </div>
        </div>
      </Disclosure.Button>
    </div>
  )
}

export default SystemTreeItemComponent
