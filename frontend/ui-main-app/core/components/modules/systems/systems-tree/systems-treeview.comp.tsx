import { Disclosure } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
  PlusIcon,
  PuzzlePieceIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import useAxios from 'core/helpers/use-axios'
import { BASE_URL } from 'core/types/constants/common'
import { ENDPOINTS } from 'core/types/constants/endpoints'
import { SystemTreeItem } from 'core/types/responses'
import { useRouter } from 'next/router'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface DisclosureComponentProps {
  item: SystemTreeItem
  setSelectedSystemCode: Dispatch<SetStateAction<string | undefined>>
  openTree?: boolean
  selectedSystem?: SystemTreeItem
}

const DisclosureComponent = ({ item, setSelectedSystemCode, openTree, selectedSystem }: DisclosureComponentProps) => {
  const router = useRouter()
  const [axiosUrl, setaxiosUrl] = useState<string>()
  const url = BASE_URL + ENDPOINTS.systemDetail + '/' + item.uid
  const { loading } = useAxios({ url: axiosUrl ? axiosUrl : null, method: 'delete' })
  return (
    <Disclosure as="div" key={item.name} className="space-y-" defaultOpen={openTree}>
      {({ open }) => (
        <Fragment>
          <div
            className={classNames(
              ' text-gray-500 hover:text-gray-900 hover:bg-gray-100 ',
              'rounded-md group w-full flex items-center pl-2 pr-1 text-left text-sm font-medium ',
              selectedSystem?.systemCode === item.systemCode ? 'outline-none ring-2 rounded-md  ring-primary-500' : ''
            )}
            onClick={() => {
              console.log(item.systemCode)
              setSelectedSystemCode(item.systemCode)
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
                  <PencilSquareIcon
                    className="h-5 w-5"
                    onClick={() => {
                      router.push({
                        pathname: router.pathname,
                        query: { slug: router.query.slug, uid: item.uid }
                      })
                    }}
                  />
                  <TrashIcon
                    className="h-5 w-5"
                    onClick={() => {
                      setaxiosUrl(url)
                      if (loading === false) router.reload()
                    }}
                  />
                  <PlusIcon className="h-5 w-5" />
                </div>
              </div>
            </Disclosure.Button>
          </div>
          {item.children && (
            <Disclosure.Panel className="space-y-1 ">
              <ul>
                {item.children.map(subItem => (
                  <li key={subItem.name} className="list-item group w-full items-center pl-3 pt-1 text-sm font-mediu ">
                    <DisclosureComponent
                      item={subItem}
                      setSelectedSystemCode={setSelectedSystemCode}
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
  setSelectedSystemCode: Dispatch<SetStateAction<string | undefined>>
  openTree?: boolean
  selectedSystem?: SystemTreeItem
}

export default function SystemTreeComponent({ systemsList, setSelectedSystemCode, openTree, selectedSystem }: Props) {
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
                setSelectedSystemCode={setSelectedSystemCode}
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
