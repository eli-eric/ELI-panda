import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'
import { PATHS } from 'core/types/constants/paths'
import { SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'

import SystemActionIconsComponent from './action-icons/system-action-icons.comp'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  open: boolean
  item: SystemTreeItem
}

const SystemTreeItemComponent = ({ open, item }: Props) => {
  const router = useRouter()
  const selectSystemItemHandler = () => {
    router.push({ pathname: PATHS.SYSTEMS_OVERVIEW + '/' + item.uid })
  }

  return (
    <div
      className={classNames(
        ' text-gray-500 hover:text-gray-900 hover:bg-gray-100 ',
        'rounded-md group w-full flex items-center pl-2 pr-1 text-left text-sm font-medium ',
        (router.query.slug ? router.query.slug[0] === item.uid : false)
          ? 'outline-none ring-2 rounded-md  ring-primary-500'
          : ''
      )}
    >
      <div className="w-full">
        <div className="flex justify-between">
          <Disclosure.Button className="flex w-full" onClick={selectSystemItemHandler}>
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
          </Disclosure.Button>
          <SystemActionIconsComponent />
        </div>
      </div>
    </div>
  )
}

export default SystemTreeItemComponent
