import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import React, { Fragment, useMemo } from 'react'

import { DarkModeSwitch } from '@/components/DarkModeSwitch'
import usePermission from '@/hooks/usePermission'
import { PATH, SUPPORT } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import { classNames } from '@/utils'

interface MenuLinkDecoratorProps {
  children: React.ReactNode
  active: boolean
}
type MenuLinkProps = MenuLinkDecoratorProps & { href: string }

const MenuLinkDecorator = ({ children, active }: MenuLinkDecoratorProps) => (
  <div
    className={classNames(
      'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700',
      active ? 'bg-gray-100 dark:bg-gray-700' : ''
    )}
  >
    {children}
  </div>
)

const MenuLink = ({ href, children, active }: MenuLinkProps) => (
  <Link href={href}>
    <MenuLinkDecorator active={active}>{children}</MenuLinkDecorator>
  </Link>
)

export const UserMenu = () => {
  const user = useSession().data?.user
  const fullName = user?.fullName
  const adminPermissions = usePermission([ROLE.ADMIN])
  const inicials = useMemo(() => {
    if (!fullName) return ''
    const split = fullName.split(' ')
    const firstLetter = split[0].substring(0, 1)
    const secondLetter = split[1].substring(0, 1)
    return firstLetter + secondLetter
  }, [fullName])

  const signOutHandler = () => {
    signOut({ callbackUrl: PATH.ROOT })
  }

  return (
    <Fragment>
      <div data-testid="layout-profile" className="ml-6 flex items-center">
        <div className="flex items-center">
          <div className="lg:mr-10 mr-3 mt-1 lg:mt-1 lg:items-center lg:justify-center">
            <DarkModeSwitch />
          </div>
          <Link href={SUPPORT} legacyBehavior>
            <a target={'_blank'} rel="noreferrer">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 mr-2">
                <span className="font-medium leading-none text-white">?</span>
              </span>
            </a>
          </Link>
        </div>
        <Menu as="div" className="relative">
          <Menu.Button className="flex rounded-full bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <span className="sr-only">Open user menu</span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
              <span className="font-medium leading-none text-white">{inicials}</span>
            </span>
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
            <Menu.Items className=" absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <MenuLink href={PATH.PROFILE_GENERAL} active={active}>
                    Your Profile
                  </MenuLink>
                )}
              </Menu.Item>
              {adminPermissions && (
                <Menu.Item>
                  {({ active }) => (
                    <MenuLink href={PATH.ADMIN} active={active}>
                      Administration
                    </MenuLink>
                  )}
                </Menu.Item>
              )}
              <Menu.Item>
                {({ active }) => (
                  <MenuLinkDecorator active={active}>
                    <button onClick={signOutHandler}>Sign out</button>
                  </MenuLinkDecorator>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </Fragment>
  )
}
