import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'

import type { NavBarLinkType } from '@/types/constants/paths'

import { NavBarLinkWrapper } from './NavBarLinkWrapper'

interface Props {
  name: string
  links: NavBarLinkType[]
  open?: boolean
}

export const NavBarMultiLink = ({ name, links, open }: Props) => {
  const session = useSession()
  const router = useRouter()
  const userRoles = session.data?.user.roles

  return (
    <Menu>
      <Menu.Button>
        <NavBarLinkWrapper
          href={links[0].path}
          open={open}
          className={classNames(
            open
              ? 'relative block w-full text-left border-l-4 py-2 pl-3 pr-4 text-base hover:bg-gray-50'
              : 'relative inline-flex items-center border-b-2 px-1 pt-1 text-sm'
          )}
        >
          {name}
        </NavBarLinkWrapper>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            !open &&
              'absolute z-50 left-0 top-[58px] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          )}
        >
          {links.map((link, index) => {
            if (userRoles?.includes(link.role)) {
              return (
                <Fragment key={index}>
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <Link
                        href={link.path}
                        className={classNames(
                          'w-full text-left text-sm text-gray-700 block border-l-4 py-2 pl-3 pr-4 hover:bg-gray-50',
                          router.asPath.startsWith(link.path)
                            ? 'text-gray-900 border-primary-500'
                            : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 border-transparent',
                          active ? 'bg-gray-100' : ''
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                  </Menu.Item>
                </Fragment>
              )
            }
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
