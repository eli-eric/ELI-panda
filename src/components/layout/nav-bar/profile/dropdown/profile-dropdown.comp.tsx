import { Disclosure, Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'

import DarkModeButton from '@/components/DarkModeButon'
import usePermission from '@/hooks/usePermission'
import { PATH, SUPPORT } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import { classNames } from '@/utils'

interface Props {
  open: boolean
}

//TODO: clean up this component

const ProfileDropdownComponent = ({ open }: Props) => {
  const user = useSession().data?.user
  const router = useRouter()
  const fullName = user?.fullName
  const [inicials, setInicials] = useState('')

  const adminPermissions = usePermission([ROLE.ADMIN])

  useEffect(() => {
    if (!fullName) return
    const split = fullName.split(' ')
    const firstLetter = split[0].substring(0, 1)
    const secondLetter = split[1].substring(0, 1)
    setInicials(firstLetter + secondLetter)
  }, [fullName])

  const signOutHandler = () => {
    signOut({ callbackUrl: PATH.ROOT })
  }

  return (
    <Fragment>
      {open === false ? (
        <div data-testid="layout-profile" className="hidden z-30 sm:ml-6 sm:flex sm:items-center">
          <Menu as="div" className="relative ml-3">
            <div className="flex">
              <div className="pr-6 pt-2">
                <DarkModeButton />
              </div>
              <Link href={SUPPORT} legacyBehavior>
                <a target={'_blank'} rel="noreferrer">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 mr-2">
                    <span className="font-medium leading-none text-white">?</span>
                  </span>
                </a>
              </Link>
              <Menu.Button className="flex rounded-full bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                  <span className="font-medium leading-none text-white">{inicials}</span>
                </span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        router.push(PATH.PROFILE_GENERAL)
                      }}
                      className={classNames(
                        'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700',
                        active ? 'bg-gray-100' : ''
                      )}
                    >
                      Your Profile
                    </button>
                  )}
                </Menu.Item>
                {adminPermissions && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          router.push(PATH.ADMIN)
                        }}
                        className={classNames(
                          'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700',
                          active ? 'bg-gray-100' : ''
                        )}
                      >
                        Administration
                      </button>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={signOutHandler}
                      className={classNames(
                        'w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700',
                        active ? 'bg-gray-100' : ''
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center px-4">
            <Disclosure.Button
              onClick={() => {
                router.push(PATH.PROFILE_GENERAL)
              }}
              className="flex-shrink-0 dark:hover:bg-gray-700"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                <span className="font-medium leading-none text-white">{inicials}</span>
              </span>
            </Disclosure.Button>

            <div className="ml-3">
              <div className="text-base font-medium text-gray-800 dark:text-gray-200">{fullName}</div>
              <div className="text-sm font-medium text-gray-500">{user?.email}</div>
            </div>
          </div>
          <div className="flex mt-3 space-y-1">
            <Disclosure.Button
              onClick={() => {
                router.push(PATH.PROFILE_GENERAL)
              }}
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Your Profile
            </Disclosure.Button>
          </div>

          {adminPermissions && (
            <div className="flex mt-3 space-y-1">
              <Disclosure.Button
                onClick={() => {
                  router.push(PATH.ADMIN)
                }}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Administration
              </Disclosure.Button>
            </div>
          )}
          <div className="flex mt-3 space-y-1">
            <Disclosure.Button
              onClick={signOutHandler}
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Sign out
            </Disclosure.Button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default ProfileDropdownComponent
