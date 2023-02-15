import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import FormContext from 'src/store/form.context'
import { PATH } from '@/types/constants/paths'
import { SystemTreeItem } from '@/types/responses'

import SystemActionIconsComponent from './action-icons/system-action-icons.comp'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  open: boolean
  item: SystemTreeItem
}

const SystemTreeItemComponent = ({ open, item }: Props) => {
  const { isEdit } = useContext(FormContext)
  const router = useRouter()
  const selectSystemItemHandler = () => {
    router.push({ pathname: PATH.SYSTEMS_OVERVIEW + '/' + item.uid })
  }

  return (
    <div
      className={classNames(
        ' text-gray-500 hover:text-gray-900 hover:bg-gray-100 ',
        'rounded-md group w-full flex items-center pl-2 pr-1 text-left text-sm font-medium ',
        router.query.slug === item.uid ? 'outline-none ring-2 rounded-md  ring-primary-500' : ''
      )}
    >
      <Disclosure.Button className="flex w-full" onClick={selectSystemItemHandler} disabled={isEdit}>
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex">
              <div className="mr-2">
                {item.children ? (
                  open ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )
                ) : (
                  <PuzzlePieceIcon className="h-5 w-5" />
                )}
              </div>
              <span>{item.name}</span>
            </div>
            <SystemActionIconsComponent uid={item.uid} />
          </div>
        </div>
      </Disclosure.Button>
    </div>
  )
}

export default SystemTreeItemComponent
